import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { Row, Cols, RowContent, SortOrder } from './awesomeTableModels';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface Props {
  visibleCols: string[];
  sortedRows: Row[];
  cols: Cols;
  sortOrder: SortOrder | undefined;
  onSortCol: (newOrder: SortEnd) => void;
  onSortRow: (name: string) => void;
}

const SortableRow = SortableContainer((props: TableRowProps) => <TableRow {...props} />);
const SortableTableCell = SortableElement((props: TableCellProps) => <TableCell {...props} />);

const renderCellContent = (val: RowContent) => {
  if (!val || typeof val !== 'object') {
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
  const hasDetailsView = sortedRows.some(r => !!r.detailsRow);
  const colCount = visibleCols.length + (hasDetailsView ? 2 : 1); // Add for checkbox and details toggle

  return (
    <Table>
      <TableHead>
        <SortableRow axis="x" pressDelay={200} onSortEnd={onSortCol}>
          <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
            <Checkbox />
          </TableCell>
          {visibleCols.map((name, index) => (
            <SortableTableCell index={index} key={name}>
              <>
                <TableSortLabel
                  active={sortOrder && sortOrder.name === name}
                  direction={!!sortOrder && sortOrder.sortAsc ? 'asc' : 'desc'}
                  disabled={cols[name].disableSort}
                  onClick={() => onSortRow(name)}
                >
                  {cols[name].content}
                </TableSortLabel>
              </>
            </SortableTableCell>
          ))}
          {hasDetailsView && <TableCell padding="dense" style={{ maxWidth: 0 }} />}
        </SortableRow>
      </TableHead>
      <TableBody>
        {sortedRows.map(row => (
          <React.Fragment key={row.id}>
            <TableRow>
              <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
                <Checkbox />
              </TableCell>
              {visibleCols.map(name => (
                <TableCell key={`${row.id}-${name}`}>{renderCellContent(row.cols[name])}</TableCell>
              ))}
              {!!row.detailsRow && (
                <TableCell key={`${row.id}-detailsView`}>{row.cols['detailsView']}</TableCell>
              )}
            </TableRow>
            {!!row.detailsRow && (
              <TableRow style={{ height: 'auto' }}>
                <TableCell padding="none" colSpan={colCount} style={{ border: 0 }}>
                  {row.detailsRow}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default AwesomeTable;
