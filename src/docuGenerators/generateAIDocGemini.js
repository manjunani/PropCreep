import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIDocGemini({ name, source }) {
  const prompt = `
You are an expert React documentation bot.
Document the following component:
1. Short summary
2. Props list
3. Purpose and behavior

Component:
\`\`\`jsx
${source}
\`\`\`
`;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
