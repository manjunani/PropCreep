import fs from 'fs/promises';
import * as babelParser from '@babel/parser';

export async function parseComponent(filePath) {
  const code = await fs.readFile(filePath, 'utf-8');
  const sizeKb = code.length / 1024;

  try {
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    const components = [];

    for (const node of ast.program.body) {
      if (node.type === 'ExportNamedDeclaration' && node.declaration) {
        const decl = node.declaration;

        if (
          decl.type === 'FunctionDeclaration' ||
          decl.type === 'ClassDeclaration'
        ) {
          const name = decl.id?.name;
          if (name) {
            components.push({
              filePath,
              name,
              sizeKb,
              ast,
            });
          }
        }

        if (decl.type === 'VariableDeclaration') {
          for (const varDecl of decl.declarations) {
            if (varDecl.id?.name) {
              components.push({
                filePath,
                name: varDecl.id.name,
                sizeKb,
                ast,
              });
            }
          }
        }
      }

      if (node.type === 'ExportDefaultDeclaration') {
        const name = node.declaration?.name || 'default';
        components.push({
          filePath,
          name,
          sizeKb,
          ast,
        });
      }
    }

    return components;
  } catch (err) {
    console.error('❌ Failed to parse', filePath, err.message);
    return [];
  }
}
