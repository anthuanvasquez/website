export const ABUSE_PATTERNS = [
  // Jailbreak attempts
  /ignora\s+(tus\s+)?instrucciones/i,
  /ignore\s+(your\s+)?instructions/i,
  /olvida\s+(todo|tus)/i,
  /forget\s+(everything|your)/i,
  /jailbreak/i,
  /pretend\s+you/i,
  /you\s+are\s+now/i,
  /now\s+act\s+as/i,
  /from\s+now\s+on/i,
  /a\s+partir\s+de\s+ahora/i,
  /actúa\s+como/i,
  /act\s+as\s+(if\s+you\s+are|a)/i,
  /roleplay/i,
  /dan\s+mode/i,
  /developer\s+mode/i,

  // Metadata/Instruction leakage
  /reveal\s+(your\s+)?(prompt|instructions|system)/i,
  /revela\s+(tus\s+)?(instrucciones|sistema)/i,
  /summarize\s+everything\s+above/i,
  /resume\s+todo\s+lo\s+anterior/i,
  /what\s+is\s+your\s+knowledge\s+base/i,
  /cuál\s+es\s+tu\s+base\s+de\s+conocimientos/i,

  // Code/Script/App requests (Hardened)
  /(?:crea|create|genera|generate|escribe|write)\s+(?:.*?\s+)?(?:app|aplicación|web|script|programa|program|código|code|bot|snippet|function|función|algorithm|algoritmo)/i,
  /interprete\s+de\s+python/i,
  /python\s+interpreter/i,
  /expert\s+in\s+javascript/i,
  /experto\s+en\s+javascript/i,

  // Delimiter injection
  /<\/?system>/i,
  /<\/?user>/i,
  /<\/?assistant>/i,
  /---/i,
  /###\s+Instruction/i,
  /'''/i,
  /"""/i,

  // Homework/Tasks
  /(?:ayúdame|help\s+me|hazme|do)\s+(?:.*?\s+)?(?:proyecto|project|tarea|homework|assignment|examen|exam)/i,
];

/**
 * Checks if a string contains any of the known abuse patterns.
 * @param text The user message to check.
 * @returns boolean
 */
export function containsAbusePattern(text: string): boolean {
  if (!text) return false;

  // Clean text for more accurate detection (removes extra spaces, normalize)
  const normalized = text.toLowerCase().replace(/\s+/g, ' ').trim();

  return ABUSE_PATTERNS.some((pattern) => pattern.test(normalized));
}
