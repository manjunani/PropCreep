import ComponentPreview from './ComponentPreview';

export default function ComponentDetails({ component }) {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>{component.name}</h1>
      <p className='text-sm text-gray-500 mb-4'>{component.filePath}</p>

      <h2 className='text-lg font-semibold mb-2'>Props</h2>
      {component.sizeKb > 10 && (
        <p className='text-red-600 text-sm mt-2'>
          🚨 Large component – consider splitting
        </p>
      )}
      <p className='text-sm text-gray-500 mb-2'>
        Size:{' '}
        <span className='font-mono'>{component.sizeKb?.toFixed(2)} KB</span>
      </p>

      {component.doc && (
        <div className='mt-4 text-sm bg-gray-50 p-4 border rounded whitespace-pre-wrap'>
          <h4 className='font-bold mb-2'>🧠 Documentation</h4>
          <p>{component.doc}</p>
        </div>
      )}
      {component.props.length > 0 ? (
        <table className='min-w-full text-left text-sm border'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='p-2 border'>Name</th>
              <th className='p-2 border'>Type</th>
            </tr>
          </thead>
          <tbody>
            {component.props.map((prop) => (
              <tr key={prop.name}>
                <td className='p-2 border'>{prop.name}</td>
                <td className='p-2 border'>{prop.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-gray-400'>No props found.</p>
      )}

      <ComponentPreview component={component} />
    </div>
  );
}
