import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import React, { Component, useState } from 'react';
import uuid from 'uuid';
import './App.css';
import AwesomeTableContainer from './Features/AwesomeTable/AwesomeTableContainer';
import { ColContent, Cols, Row, RowContent } from './Features/AwesomeTable/awesomeTableModels';
import Toolbar from './Toolbar';

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
            {renderTable({
              rows,
              noResults: <span>No results</span>,
              TableBodyRowComponent: FancyTableRow,
            })}
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

const FancyTableCell = (props: TableCellProps) => (
  <TableCell {...props} style={{ background: '#f1f1f1' }} />
);

const FancyTableRow = ({ isRowSelected, ...rest }: TableRowProps & { isRowSelected?: boolean }) => (
  <TableRow {...rest} style={{ background: isRowSelected ? 'pink' : '#f1f1f1' }} />
);

const cols: AppCol = {
  prodId: {
    content: 'ID',
    ColComponent: FancyTableCell,
  },
  name: {
    content: 'Name',
    disableToggle: true,
    ColComponent: TableCell,
  },
  description: {
    content: 'Description',
    disableSort: true,
    ColComponent: TableCell,
  },
};

function generateRows(
  data: Data[],
  openDetailsViewIds: string[],
  setDetailsView: (id: string[]) => void
): AppRow[] {
  return data.map((d) => ({
    id: uuid(),
    isRowSelected: d.id === '72322' ? true : false,
    detailsRow: (
      <Collapse in={openDetailsViewIds.includes(d.id)} unmountOnExit>
        <div>
          {d.id}: text <br />
          <br />
          <br />
          <br />
          <br />
          dsfsd
        </div>
      </Collapse>
    ),
    detailsToggle: (
      <button
        onClick={() =>
          setDetailsView(
            openDetailsViewIds.includes(d.id)
              ? openDetailsViewIds.filter((o) => o !== d.id)
              : openDetailsViewIds.concat(d.id)
          )
        }
      >
        Toggle
      </button>
    ),
    selectToggle: <Checkbox />,
    cols: {
      prodId: d.id,
      name: {
        sortString: d.type,
        content: <span style={{ color: 'pink' }}>{`${d.type} - ${d.title}`}</span>,
      },
      description: d.description,
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
