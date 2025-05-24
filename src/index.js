import { walkFolder } from './analyzers/walkFolder.js';
import { parseComponent } from './analyzers/parseComponent.js';
import { extractProps } from './analyzers/extractProps.js';
import { buildTree } from './output/buildTree.js';
import { generateDocs } from './output/generateDocs.js';
import { writeUIData } from './generateUIBundle.js';
import { writeMermaid } from './output/writeMermaid.js';
import { generateDoc } from './docuGenerators/generateDoc.js';

import dotenv from 'dotenv';
dotenv.config();

export async function runDocgen({ input, output }) {
  const files = await walkFolder(input);
  console.log('📁 Found files:', files);
  console.log(
    process.env.OPENAI_API_KEY
      ? 'Using OpenAI for documentation generation'
      : process.env.GEMINI_API_KEY
      ? 'Using Gemini for documentation generation'
      : 'Using static documentation generation'
  );
  console.log('🔍 Starting component parsing...');

  const components = [];

  for (const file of files) {
    console.log('🔍 Parsing:', file);
    const parsedComponents = await parseComponent(file);
    for (const parsed of parsedComponents) {
      if (parsed) {
        const props = extractProps(parsed);
        const doc = await generateDoc({ ...parsed, props });
        components.push({ ...parsed, props, doc });
        console.log('✅ Parsed:', parsed.name);
      } else {
        console.warn('⚠️ Skipped:', file);
      }
    }
  }

  const tree = buildTree(components);
  await generateDocs(components, tree, output);
  await writeUIData(components, tree, output);
  await writeMermaid(tree, output);

  console.log(
    '🧩 Final component list:',
    components.map((c) => c.name)
  );
  console.log('✅ Docs generated successfully.');
  console.log('\n💬 Got suggestions or found bugs?');
  console.log(
    '🛠  Submit feedback here: https://github.com/manjunani/PropCreep/issues'
  );
}
