import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

export default function MermaidRenderer({ definition }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!definition || !containerRef.current) return;

    try {
      mermaid.parse(definition); // validate before rendering

      const renderMermaid = async () => {
        const id = 'mermaid-' + Math.floor(Math.random() * 10000);

        const { svg } = await mermaid.render(id, definition);
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      };

      renderMermaid();
    } catch (err) {
      console.error('⚠️ Mermaid render error:', err.message);
      containerRef.current.innerHTML = `<p class='text-red-600'>⚠️ Mermaid syntax error</p>`;
    }
  }, [definition]);

  return (
    <div className='border p-4 bg-white shadow rounded mt-6'>
      <h3 className='font-bold mb-2'>📈 Component Tree Diagram</h3>
      <div ref={containerRef}></div>
    </div>
  );
}
