import { useState, useEffect } from 'react';
import TreeView from './components/TreeView';
import ComponentDetails from './components/ComponentDetails';
import MermaidRenderer from './components/MermaidRenderer';
import { convertTreeToMermaid } from './utils/convertToMermaid';

export default function App() {
  const [components, setComponents] = useState([]);
  const [tree, setTree] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res1 = await fetch('./data/components.json');
      const res2 = await fetch('./data/component-tree.json');
      const comp = await res1.json();
      const tree = await res2.json();
      console.log('📦 COMPONENTS', comp);
      console.log('🌳 TREE', tree);
      setComponents(comp);
      setTree(tree);
    };
    load();
  }, []);

  const selectedComponent = components.find((c) => c.name === selected);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-1'>
        <aside className='w-1/4 border-r p-4 overflow-auto'>
          <h2 className='font-bold text-xl mb-2'>Component Tree</h2>
          <TreeView tree={tree?.src || {}} onSelect={setSelected} />
        </aside>
        <main className='flex-1 p-6 overflow-auto'>
          {selectedComponent ? (
            <ComponentDetails component={selectedComponent} />
          ) : (
            <div className='text-gray-500'>
              Select a component to view details
            </div>
          )}

          {tree?.src && (
            <MermaidRenderer definition={convertTreeToMermaid(tree.src)} />
          )}
        </main>
      </div>
      <footer className='text-center text-sm text-gray-400 py-2 border-t'>
        🚀 Built with PropCreep | 💬{' '}
        <a
          href='https://github.com/manjunani/PropCreep/issues'
          target='_blank'
          className='text-blue-500'
        >
          Give Feedback
        </a>
      </footer>
    </div>
  );
}
