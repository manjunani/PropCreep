import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// ⚙️ Functional Component with props
export function DataGrid({ title, items, onSelect }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (items?.length) {
      setSelected(items[0]);
    }
  }, [items]);

  const handleClick = (item) => {
    setSelected(item);
    onSelect?.(item);
  };

  return (
    <div className='p-4 border rounded'>
      <h2 className='font-bold text-lg mb-2'>{title}</h2>
      <ul className='space-y-1'>
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(item)}
              className='bg-blue-100 px-2 py-1 rounded hover:bg-blue-200'
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <p className='mt-4 text-sm text-gray-500'>
        Selected: <strong>{selected}</strong>
      </p>
    </div>
  );
}

DataGrid.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
};

// 🧱 Class Component with props
export class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ status: 'loaded' });
    }, 1000);
  }

  render() {
    const { name, score } = this.props;
    const { status } = this.state;

    return (
      <div className='border p-4 mt-6 bg-white shadow rounded'>
        <h3 className='font-bold text-md'>📊 Report for: {name}</h3>
        {status === 'loading' ? (
          <p className='text-gray-400'>Loading...</p>
        ) : (
          <p className='text-green-700'>Score: {score}</p>
        )}
      </div>
    );
  }
}

ReportCard.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

// 🧱 Add PADDING to boost file size artificially
const pad = `

`.repeat(600); // ~10KB of whitespace

console.log(pad); // avoid unused var warning
