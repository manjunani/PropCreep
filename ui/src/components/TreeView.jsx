export default function TreeView({ tree, onSelect, level = 0 }) {
  return (
    <ul className={`pl-${level * 4}`}>
      {Object.entries(tree).map(([key, value]) => {
        if (key === '__component') return null;

        const hasComponents = Array.isArray(value?.__components);

        return (
          <li key={key} className='mb-1'>
            <div className='font-semibold'>{key}</div>

            {hasComponents && (
              <ul className='pl-4'>
                {value.__components.map((comp) => (
                  <li key={comp}>
                    <button
                      onClick={() => onSelect(comp)}
                      className='text-left text-blue-600 hover:underline'
                    >
                      {comp}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {typeof value === 'object' && Object.keys(value).length > 1 && (
              <TreeView tree={value} onSelect={onSelect} level={level + 1} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
