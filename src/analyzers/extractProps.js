export function extractProps(parsed) {
  const props = [];
  const decl = parsed.ast.program.body.find(n => n.type === 'ExportDefaultDeclaration');
  if (decl?.declaration?.params?.length > 0) {
    const param = decl.declaration.params[0];
    if (param.type === "ObjectPattern") {
      for (const prop of param.properties) {
        props.push({
          name: prop.key.name,
          type: "unknown"
        });
      }
    }
  }
  return props;
}
