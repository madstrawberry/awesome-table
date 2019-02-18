import React, { Component, useState } from 'react';
import './App.css';
import AwesomeTableContainer from './Features/AwesomeTable/AwesomeTableContainer';
import { Cols, Row, RowContent, ColContent } from './Features/AwesomeTable/awesomeTableModels';
import Toolbar from './Toolbar';
import uuid from 'uuid';
import Collapse from '@material-ui/core/Collapse';

const App = () => {
  const data = mockData;

  const [openIds, setOpenIds] = useState<string[]>([]);

  const rows = generateRows(data, openIds, setOpenIds);

  return (
    <div className="App">
      <AwesomeTableContainer cols={cols} name="selectedFilters">
        {({ renderColumnToggle, renderTable, sortRow, toggleCol }) => (
          <>
            <Toolbar renderColumnToggle={renderColumnToggle} />
            {renderTable({ rows, noResults: <span>No results</span> })}
            <button onClick={() => sortRow('description')}>I am an external sort</button>
            <button onClick={() => toggleCol('description')}>Toggle description</button>
            <button onClick={() => setOpenIds(openIds.length > 0 ? [] : ['72322'])}>
              Toggle row with id 72322
            </button>
          </>
        )}
      </AwesomeTableContainer>
    </div>
  );
};

const cols: AppCol = {
  prodId: {
    content: 'ID',
  },
  name: {
    content: 'Name',
    disableToggle: true,
  },
  description: {
    content: 'Description',
    disableSort: true,
  },
};

function generateRows(
  data: Data[],
  openDetailsViewIds: string[],
  setDetailsView: (id: string[]) => void
): AppRow[] {
  return data.map(d => ({
    id: uuid(),
    detailsRow: (
      <Collapse in={openDetailsViewIds.includes(d.id)} unmountOnExit>
        <span>
          {d.id}: text <br />
          <br />
          <br />
          <br />
          <br />
          dsfsd
        </span>
      </Collapse>
    ),
    cols: {
      prodId: d.id,
      name: {
        sortString: d.type,
        content: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
      },
      description: d.description,
      detailsView: (
        <button
          onClick={() =>
            setDetailsView(
              openDetailsViewIds.includes(d.id)
                ? openDetailsViewIds.filter(o => o !== d.id)
                : openDetailsViewIds.concat(d.id)
            )
          }
        >
          Toggle
        </button>
      ),
    },
  }));
}

export interface Data {
  id: string;
  type: string;
  title: string;
  description: string;
}

export interface AppCol extends Cols {
  prodId: ColContent;
  name: ColContent;
  description: ColContent;
}

export interface AppRow extends Row {
  cols: {
    prodId: RowContent;
    name: RowContent;
    description: RowContent;
  };
}

const mockData: Data[] = [
  { id: '13434', type: 'Prod', title: 'Hoi', description: 'boo' },
  { id: '72322', type: 'Subsc', title: 'Hoi2', description: 'boo2' },
  { id: '25434', type: 'Prod', title: 'Hoi3', description: 'boo3' },
  { id: '98794', type: 'Subsc', title: 'Hoi4', description: 'boo4' },
];

export default App;
