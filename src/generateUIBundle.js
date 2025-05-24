import fs from 'fs-extra';
import path from 'path';

export async function writeUIData(components, tree, outputDir) {
  await fs.ensureDir(outputDir);
  await fs.writeJSON(path.join(outputDir, 'components.json'), components, { spaces: 2 });
  await fs.writeJSON(path.join(outputDir, 'component-tree.json'), tree, { spaces: 2 });
}
