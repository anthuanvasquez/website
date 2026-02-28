import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { createHash } from 'crypto';
import { SYSTEM_PROMPT_EN, SYSTEM_PROMPT_ES } from '~/utils/prompts';
import { knowledgeBase } from '~/utils/knowledge';
import { containsAbusePattern } from '~/utils/abustePatterns';

interface ChatRequest {
  message: string;
  locale?: string;
  sessionToken?: string;
}

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientId(
  event: Parameters<typeof defineEventHandler>[0] extends (
    event: infer E
  ) => any
    ? E
    : never
): string {
  const ip =
    getRequestHeader(event, 'x-forwarded-for')?.split(',')[0].trim() ||
    getRequestHeader(event, 'x-real-ip') ||
    'unknown';
  const ua = getRequestHeader(event, 'user-agent') || 'unknown';
  return createHash('sha256').update(`${ip}:${ua}`).digest('hex').slice(0, 16);
}

function validateSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const secret = useRuntimeConfig().chatSessionSecret;

  if (!secret) return true;

  try {
    const [timestamp, signature] = token.split('.');
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 2 * 60 * 60 * 1000) return false;

    const expected = createHash('sha256')
      .update(`${timestamp}:${secret}`)
      .digest('hex')
      .slice(0, 16);

    return signature === expected;
  } catch {
    return false;
  }
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) return true;

  return false;
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  }

  const body = await readBody<ChatRequest>(event);
  const { message, locale = 'en', sessionToken } = body;

  if (!validateSessionToken(sessionToken)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid session token',
    });
  }

  const clientId = getClientId(event);

  if (isRateLimited(clientId)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please wait a moment.',
    });
  }

  if (!message || typeof message !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message is required',
    });
  }

  const trimmed = message.trim();

  if (trimmed.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Message cannot be empty',
    });
  }

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    throw createError({
      statusCode: 400,
      statusMessage: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
    });
  }

  if (containsAbusePattern(trimmed)) {
    const msg =
      locale === 'es'
        ? 'Solo puedo responder preguntas sobre Anthuan Vásquez y su trabajo.'
        : 'I can only answer questions about Anthuan Vásquez and his work.';
    return { success: true, response: msg, locale };
  }

  const apiKey = useRuntimeConfig().groqApiKey;
  const knowledge =
    knowledgeBase[locale as keyof typeof knowledgeBase] || knowledgeBase.en;

  if (!apiKey) {
    const lowerMessage = trimmed.toLowerCase();
    let fallbackResponse = '';

    if (/skill|technology|experience/.test(lowerMessage)) {
      fallbackResponse = knowledge.skills;
    } else if (/about|who|background/.test(lowerMessage)) {
      fallbackResponse = knowledge.about;
    } else if (/contact|reach|email/.test(lowerMessage)) {
      fallbackResponse = knowledge.contact;
    } else {
      fallbackResponse =
        locale === 'es'
          ? 'Puedes encontrar más información sobre Anthuan en su sitio web o contactarlo directamente.'
          : 'You can find more information about Anthuan on his website or contact him directly.';
    }

    return { success: true, response: fallbackResponse, locale };
  }

  const systemPrompt = locale === 'es' ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;

  try {
    const { ChatGroq } = await import('@langchain/groq');

    const chatModel = new ChatGroq({
      apiKey,
      model: 'openai/gpt-oss-120b',
      temperature: 0.5,
      maxTokens: 300,
    });

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['human', '{input}'],
    ]);

    const chain = promptTemplate.pipe(chatModel).pipe(new StringOutputParser());
    const response = await chain.invoke({ input: trimmed });

    return { success: true, response, locale };
  } catch (error) {
    console.error('Chatbot error:', error);

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process chat request',
    });
  }
});
