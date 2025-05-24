import path from 'path';

export function buildTree(components) {
  const tree = {};
  for (const comp of components) {
    const normalizedPath = comp.filePath.replace(/^\.\/?/, '');
    const parts = normalizedPath.split(/[\\\/]/);
    let pointer = tree;
    for (const part of parts) {
      if (!pointer[part]) pointer[part] = {};
      pointer = pointer[part];
    }
    if (!pointer.__components) pointer.__components = [];
    pointer.__components.push(comp.name);
  }
  return tree;
}
