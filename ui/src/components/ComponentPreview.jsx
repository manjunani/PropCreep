export default function ComponentPreview({ component }) {
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <h3 className="text-md font-semibold mb-2">Component Preview</h3>
      <pre className="text-sm text-gray-800 bg-white p-2 overflow-auto">
        {`<${component.name} {...props} />`}
      </pre>
      <p className="text-xs text-gray-500 mt-2">Preview is illustrative. Live render not implemented.</p>
    </div>
  );
}
