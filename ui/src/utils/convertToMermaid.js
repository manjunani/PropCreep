export function convertTreeToMermaid(tree) {
  const lines = ['graph TD'];

  function walk(node, parent = 'root') {
    if (typeof node !== 'object' || node === null) return;

    for (const [key, value] of Object.entries(node)) {
      // Skip internal metadata keys
      if (key.startsWith('__')) continue;

      const nodeId = key.replace(/\W+/g, '_'); // sanitize label

      lines.push(`${parent}-->${nodeId}`);
      walk(value, nodeId);

      // handle components explicitly
      if (Array.isArray(value?.__components)) {
        for (const comp of value.__components) {
          const compId = comp.replace(/\W+/g, '_');
          lines.push(`${nodeId}-->${compId}`);
        }
      }
    }
  }

  walk(tree);
  return lines.join('\n');
}
