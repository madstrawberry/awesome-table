import React, { Component } from 'react';
import './App.css';
import AwesomeTable from './Features/AwesomeTable/AwesomeTable';
import { Col, Row, RowContent, ColContent } from './Features/AwesomeTable/awesomeTableModels';
import Toolbar from './Toolbar';

class App extends Component {
  render() {
    const data = mockData;

    const rows = generateRows(data);

    const cols: AppCol = {
      id: {
        id: 'id',
        title: 'ID',
        disableToggle: false,
        disableSort: false,
      },
      name: {
        id: 'name',
        title: 'Name',
        disableToggle: true,
        disableSort: false,
      },
      description: {
        id: 'description',
        title: 'Description',
        disableToggle: false,
        disableSort: true,
      },
    };

    return (
      <div className="App">
        <AwesomeTable rows={rows} cols={cols} name="selectedFilters">
          {({ toggleComponent }) => <Toolbar toggleComponent={toggleComponent} />}
        </AwesomeTable>
      </div>
    );
  }
}

function generateRows(mockData: Data[]): AppRow[] {
  return mockData.map(d => ({
    id: d.id,
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
  id: ColContent;
  name: ColContent;
  description: ColContent;
}

export interface AppRow extends Row {
  id: RowContent;
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
