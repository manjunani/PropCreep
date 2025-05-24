import OpenAI from 'openai';

export async function generateAIDocOpenAI({ name, source }) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('❌ OPENAI_API_KEY not provided.');
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You are a React documentation bot.
Generate:
1. Summary of what "${name}" does
2. Its props and usage
3. Any observations or edge cases

\`\`\`jsx
${source}
\`\`\`
`;

  const res = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return res.choices[0].message.content.trim();
}
