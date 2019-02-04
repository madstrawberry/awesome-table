import React, { Component } from 'react';
import './App.css';
import AwesomeTableContainer from './Features/AwesomeTable/AwesomeTableContainer';
import { Col, Row, RowContent, ColContent } from './Features/AwesomeTable/awesomeTableModels';
import Toolbar from './Toolbar';
import uuid from 'uuid';

class App extends Component {
  render() {
    const data = mockData;

    const rows = generateRows(data);

    return (
      <div className="App">
        <AwesomeTableContainer cols={cols} name="selectedFilters">
          {({ renderColumnToggle, renderTable, sortRow, toggleCol }) => (
            <>
              <Toolbar renderColumnToggle={renderColumnToggle} />
              {renderTable(rows)}
              <button onClick={() => sortRow('description')}>I am an external sort</button>
              <button onClick={() => toggleCol('description')}>Toggle description</button>
            </>
          )}
        </AwesomeTableContainer>
      </div>
    );
  }
}

const cols: AppCol = {
  prodId: {
    title: 'ID',
  },
  name: {
    title: 'Name',
    disableToggle: true,
  },
  description: {
    title: 'Description',
    disableSort: true,
  },
};

function generateRows(data: Data[]): AppRow[] {
  return data.map(d => ({
    id: uuid(),
    prodId: d.id,
    name: {
      sortString: d.type,
      content: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
    },
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
  prodId: ColContent;
  name: ColContent;
  description: ColContent;
}

export interface AppRow extends Row {
  prodId: RowContent;
  name: RowContent;
  description: RowContent;
}

const mockData: Data[] = [
  { id: '13434', type: 'Prod', title: 'Hoi', description: 'boo' },
  { id: '72322', type: 'Subsc', title: 'Hoi2', description: 'boo2' },
  { id: '25434', type: 'Prod', title: 'Hoi3', description: 'boo3' },
  { id: '98794', type: 'Subsc', title: 'Hoi4', description: 'boo4' },
];

export default App;
