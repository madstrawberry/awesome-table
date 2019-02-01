import React, { Component } from 'react';
import './App.css';
import AwesomeTable from './AwesomeTable';
import uuid from 'uuid';

class App extends Component {
  render() {
    const data = mockData;

    const rows = generateRows(data);

    const cols: Row = { id: 'ID', name: 'Name', description: 'Description' };

    // const cols2: Row2 = { id: 'ID', name: 'Name', description: 'Description' };

    return (
      <div className="App">
        <AwesomeTable rows={rows} cols={cols} name="cool" />
      </div>
    );
  }
}

function generateRows(mockData: Data[]): Row[] {
  return mockData.map(d => ({
    id: d.id,
    name: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
    description: d.description,
  }));
}

// function generateRows2(mockData: Data[]): Row2[] {
//   return mockData.map(d => ({
//     id: {
//       id: uuid();
//       title: d.id
//     },
//     name: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
//     description: d.description,
//   }));
// }

export interface Data {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface Row2 {
  id: {
    id: string;
    title: string | JSX.Element;
  };
  name: {
    id: string;
    title: string | JSX.Element;
  };
  description: {
    id: string;
    title: string | JSX.Element;
  };
}

export interface Row {
  id: string | JSX.Element;
  name: string | JSX.Element;
  description: string | JSX.Element;
}

const mockData: Data[] = [
  { id: '1', type: 'Prod', title: 'Hoi', description: 'boo' },
  { id: '2', type: 'Subsc', title: 'Hoi2', description: 'boo2' },
  { id: '3', type: 'Prod', title: 'Hoi3', description: 'boo3' },
  { id: '4', type: 'Subsc', title: 'Hoi4', description: 'boo4' },
];

export default App;
