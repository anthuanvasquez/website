export const ABUSE_PATTERNS = [
  /ignora\s+(tus\s+)?instrucciones/i,
  /ignore\s+(your\s+)?instructions/i,
  /olvida\s+(todo|tus)/i,
  /forget\s+(everything|your)/i,
  /act\s+as\s+(if\s+you\s+are|a)/i,
  /actúa\s+como/i,
  /jailbreak/i,
  /pretend\s+you/i,
  /you\s+are\s+now/i,
  /nuevo\s+rol/i,
  /new\s+role/i,
  /system\s*:/i,
  /<\s*system\s*>/i,
  /crea\s+(una?\s+)?(app|aplicación|web|script|programa|código)/i,
  /create\s+(a\s+)?(app|application|website|script|program|code)/i,
  /escribe\s+(un?\s+)?(script|código|programa|función)/i,
  /write\s+(a\s+)?(script|code|program|function)/i,
  /genera\s+(un?\s+)?(código|script|programa)/i,
  /generate\s+(a\s+)?(code|script|program)/i,
  /ayúdame\s+con\s+(mi\s+)?(proyecto|tarea|homework)/i,
  /help\s+me\s+with\s+(my\s+)?(project|homework|assignment)/i,
];

export function containsAbusePattern(text: string): boolean {
  return ABUSE_PATTERNS.some((pattern) => pattern.test(text));
}
