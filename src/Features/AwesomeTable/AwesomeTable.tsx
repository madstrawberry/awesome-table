import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import { SortableContainer, SortableElement, SortEnd } from 'react-sortable-hoc';
import { ColContent, Cols, RenderTableProps, RowContent, SortOrder } from './awesomeTableModels';

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

const getRowColContent = (rowContent: RowContent, colContent: ColContent) => {
  let content;
  let TableCellComponent;

  if (!rowContent || typeof rowContent !== 'object') {
    TableCellComponent = colContent.ColComponent;
    content = rowContent;
  } else {
    TableCellComponent = rowContent.ColComponent || colContent.ColComponent;
    content = rowContent.content;
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
  TableBodyRowComponent,
}) => {
  const hasDetailsView = rows.some((r) => !!r.detailsRow);
  const hasSelectToggle = rows.some((r) => !!r.selectToggle);
  const colCount = visibleCols.length + (hasDetailsView ? 2 : 1); // Add for checkbox and details toggle

  return (
    <Table>
      <TableHead>
        <SortableRow axis="x" pressDelay={200} onSortEnd={onSortCol}>
          {hasSelectToggle && <TableCell padding="checkbox">{bulkSelect}</TableCell>}
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
        {rows.map((row) => (
          <React.Fragment key={row.id}>
            <TableBodyRowComponent isRowSelected={row.isRowSelected} isRowActive={row.isRowActive}>
              {hasSelectToggle && <TableCell padding="checkbox">{row.selectToggle}</TableCell>}
              {visibleCols.map((name) => {
                const { content, TableCellComponent } = getRowColContent(
                  row.cols[name],
                  cols[name]
                );

                return <TableCellComponent key={`${row.id}-${name}`}>{content}</TableCellComponent>;
              })}
              {!!row.detailsToggle && (
                <TableCell padding="dense" key={`${row.id}-detailsView`}>
                  {row.detailsToggle}
                </TableCell>
              )}
            </TableBodyRowComponent>
            {!!row.detailsRow && (
              <TableRow style={{ height: 'auto' }}>
                <TableCell padding="none" colSpan={colCount} style={{ border: 0 }}>
                  {row.detailsRow}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
        {!!error && (
          <TableRow>
            <TableCell colSpan={colCount}>{error}</TableCell>
          </TableRow>
        )}
        {rows.length === 0 && !error && !!noResults && (
          <TableRow>
            <TableCell colSpan={colCount}>{noResults}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AwesomeTable;
