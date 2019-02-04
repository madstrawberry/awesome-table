import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { SortableContainer, SortableElement, arrayMove, SortEnd } from 'react-sortable-hoc';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { Row, Col, RowContent } from './awesomeTableModels';
import uuid from 'uuid';

interface Props {
  visibleCols: string[];
  sortedRows: Row[];
  cols: Col;
  onSortCol: (newOrder: SortEnd) => void;
  onSortRow: (name: string) => void;
}

const SortableRow = SortableContainer((props: TableRowProps) => <TableRow {...props} />);
const SortableTableCell = SortableElement((props: TableCellProps) => <TableCell {...props} />);

const renderCellContent = (val: RowContent) => {
  if (typeof val === 'string') {
    return val;
  }

  return val.content;
};

const component: React.FunctionComponent<Props> = ({
  visibleCols,
  sortedRows,
  cols,
  onSortCol,
  onSortRow,
}) => {
  return (
    <MuiTable>
      <TableHead>
        <SortableRow axis="x" onSortEnd={onSortCol}>
          <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
            <Checkbox />
          </TableCell>
          {visibleCols.map((name, index) => (
            <SortableTableCell index={index} key={cols[name].id}>
              <>
                {cols[name].title}
                {!cols[name].disableSort && <button onClick={() => onSortRow(name)}>Sort</button>}
              </>
            </SortableTableCell>
          ))}
        </SortableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map(row => (
          <TableRow key={uuid()}>
            <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
              <Checkbox />
            </TableCell>
            {visibleCols.map(name => (
              <TableCell key={uuid()}>{renderCellContent(row[name])}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  );
};

export default component;
