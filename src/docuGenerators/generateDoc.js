import { generateStaticDoc } from './generateStaticDoc.js';
import { generateAIDocOpenAI } from './generateAIDocOpenAI.js';
import { generateAIDocGemini } from './generateAIDocGemini.js';

export async function generateDoc(comp) {
  const mode = process.env.PROP_AI_MODE || 'static';
  console.log('mode is', mode);

  if (mode === 'openai' && process.env.OPENAI_API_KEY) {
    return await generateAIDocOpenAI(comp);
  }

  if (mode === 'gemini' && process.env.GEMINI_API_KEY) {
    return await generateAIDocGemini(comp);
  }

  return generateStaticDoc(comp); // 💥 Always works offline
}
