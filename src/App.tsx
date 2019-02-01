import React, { Component } from 'react';
import './App.css';
import AwesomeTable, { Col, Row } from './Features/AwesomeTable/AwesomeTable';
import uuid from 'uuid';

class App extends Component {
  render() {
    const data = mockData;

    const rows = generateRows(data);

    const cols: AppCol = {
      id: {
        id: uuid(),
        title: 'ID',
      },
      name: {
        id: uuid(),
        title: 'Name',
      },
      description: {
        id: uuid(),
        title: 'Description',
      },
    };

    return (
      <div className="App">
        <AwesomeTable rows={rows} cols={cols} name="cool" />
      </div>
    );
  }
}

function generateRows(mockData: Data[]): AppRow[] {
  return mockData.map(d => ({
    id: d.id,
    name: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
    description: d.description,
  }));
}

export interface Data {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface AppCol extends Col {
  id: {
    id: string;
    title: string;
  };
  name: {
    id: string;
    title: string;
  };
  description: {
    id: string;
    title: string;
  };
}

export interface AppRow extends Row {
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
