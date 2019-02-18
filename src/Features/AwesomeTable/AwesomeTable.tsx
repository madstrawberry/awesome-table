import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { Cols, RowContent, SortOrder, RenderTableProps, Row } from './awesomeTableModels';
import TableSortLabel from '@material-ui/core/TableSortLabel';

interface Props extends RenderTableProps {
  visibleCols: string[];
  cols: Cols;
  sortOrder: SortOrder | undefined;
  onSortCol: (newOrder: SortEnd) => void;
  onSortRow: (name: string) => void;
}

const SortableRow = SortableContainer((props: TableRowProps) => <TableRow {...props} />);
const getSortableTableCell = (Comp: React.ComponentType<TableCellProps> = TableCell) =>
  SortableElement((props: TableCellProps) => <Comp {...props} />);

const getRowColContent = (val: RowContent) => {
  let content;
  let TableCellComponent;

  if (!val || typeof val !== 'object') {
    TableCellComponent = TableCell;
    content = val;
  } else {
    TableCellComponent = val.ColComponent || TableCell;
    content = val.content;
  }

  return { content, TableCellComponent };
};

const AwesomeTable: React.FunctionComponent<Props> = ({
  visibleCols,
  rows,
  cols,
  onSortCol,
  onSortRow,
  sortOrder,
  error,
  noResults,
  bulkSelect,
}) => {
  const hasDetailsView = rows.some(r => !!r.detailsRow);
  const hasSelectToggle = rows.some(r => !!r.selectToggle);
  const colCount = visibleCols.length + (hasDetailsView ? 2 : 1); // Add for checkbox and details toggle

  return (
    <Table>
      <TableHead>
        <SortableRow axis="x" pressDelay={200} onSortEnd={onSortCol}>
          {hasSelectToggle && (
            <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
              {bulkSelect}
            </TableCell>
          )}
          {visibleCols.map((name, index) => {
            const col = cols[name];
            const SortableTableCell = getSortableTableCell(col.ColComponent);

            return (
              <SortableTableCell index={index} key={name}>
                <>
                  <TableSortLabel
                    active={sortOrder && sortOrder.name === name}
                    direction={!!sortOrder && sortOrder.sortAsc ? 'asc' : 'desc'}
                    disabled={col.disableSort}
                    onClick={() => onSortRow(name)}
                  >
                    {col.content}
                  </TableSortLabel>
                </>
              </SortableTableCell>
            );
          })}
          {hasDetailsView && <TableCell padding="dense" style={{ maxWidth: 0 }} />}
        </SortableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <React.Fragment key={row.id}>
            <TableRow>
              {hasSelectToggle && (
                <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
                  {row.selectToggle}
                </TableCell>
              )}
              {visibleCols.map(name => {
                const { content, TableCellComponent } = getRowColContent(row.cols[name]);

                return <TableCellComponent key={`${row.id}-${name}`}>{content}</TableCellComponent>;
              })}
              {!!row.detailsToggle && (
                <TableCell padding="dense" key={`${row.id}-detailsView`}>
                  {row.detailsToggle}
                </TableCell>
              )}
            </TableRow>
            {!!row.detailsRow && (
              <TableRow style={{ height: 'auto' }}>
                <TableCell padding="none" colSpan={colCount} style={{ border: 0 }}>
                  {row.detailsRow}
                </TableCell>
              </TableRow>
            )}
            {!!error && (
              <TableRow>
                <TableCell colSpan={colCount}>{error}</TableCell>
              </TableRow>
            )}
            {!rows.length && !error && !!noResults && (
              <TableRow>
                <TableCell colSpan={colCount}>{noResults}</TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
};

export default AwesomeTable;
