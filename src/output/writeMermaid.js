import fs from 'fs-extra';
import path from 'path';

export async function writeMermaid(tree, outputDir) {
  const lines = ['graph TD'];

  function walk(node, parent = 'root') {
    for (const [key, value] of Object.entries(node)) {
      if (key === '__components') {
        for (const comp of value) {
          lines.push(`${parent}-->${comp}`);
        }
        continue;
      }

      if (key.startsWith('__')) continue; // skip __component or __meta

      const nodeLabel = `${parent}-->${key}`;
      lines.push(nodeLabel);

      walk(value, key);
    }
  }

  walk(tree);

  const mermaidDefinition = lines.join('\n');
  await fs.outputFile(
    path.join(outputDir, 'component-tree.mmd'),
    mermaidDefinition
  );
}
