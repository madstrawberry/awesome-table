import * as React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { Row, Col, RowContent, SortOrder } from './awesomeTableModels';
import uuid from 'uuid';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface Props {
  visibleCols: string[];
  sortedRows: Row[];
  cols: Col;
  sortOrder: SortOrder | undefined;
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

const AwesomeTable: React.FunctionComponent<Props> = ({
  visibleCols,
  sortedRows,
  cols,
  onSortCol,
  onSortRow,
  sortOrder,
}) => {
  return (
    <Table>
      <TableHead>
        <SortableRow axis="x" pressDelay={100} onSortEnd={onSortCol}>
          <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
            <Checkbox />
          </TableCell>
          {visibleCols.map((name, index) => (
            <SortableTableCell index={index} key={cols[name].id}>
              <>
                <TableSortLabel
                  active={sortOrder && sortOrder.name === cols[name].id}
                  direction={!!sortOrder && sortOrder.sortAsc ? 'asc' : 'desc'}
                  disabled={cols[name].disableSort}
                  onClick={() => onSortRow(name)}
                >
                  {cols[name].title}
                </TableSortLabel>
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
    </Table>
  );
};

export default AwesomeTable;
