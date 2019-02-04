import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import * as React from 'react';
import uuid from 'uuid';
import { SortableContainer, SortableElement, arrayMove, SortEnd } from 'react-sortable-hoc';
import { LocalStorage, ascSort, descSort } from './awesomeTableUtils';
import ColumnToggler from './ColumnToggler';
import { AwesomeTableRenderProps, Row, Col, SortCol, RowContent } from './awesomeTableModels';

interface Props {
  rows: Row[];
  cols: Col;
  name: string;
  children?: (renderProps: AwesomeTableRenderProps) => JSX.Element;
}

interface State {
  visibleCols: string[];
  sortCol: undefined | SortCol;
}

const SortableRow = SortableContainer((props: TableRowProps) => <TableRow {...props} />);
const SortableTableCell = SortableElement((props: TableCellProps) => <TableCell {...props} />);

class AwesomeTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.id = `visibleCols-${props.name}`;

    this.state = {
      visibleCols: this.getInitialVisibleCols(),
      sortCol: undefined,
    };
  }

  id: string;

  getInitialVisibleCols = () => {
    const initialColNames = Object.keys(this.props.cols);
    const savedVisibleColNames = LocalStorage.getItem<string[]>(this.id);

    if (
      !!savedVisibleColNames &&
      savedVisibleColNames.every(colName => initialColNames.includes(colName))
    ) {
      return savedVisibleColNames;
    }

    return initialColNames;
  };

  updateOrder = ({ oldIndex, newIndex }: SortEnd) => {
    const { visibleCols } = this.state;
    const updatedVisibleCols = arrayMove(visibleCols, oldIndex, newIndex);

    this.updateVisibleCols(updatedVisibleCols);
  };

  toggleCol = (colNameToRemove: string) => {
    const { visibleCols } = this.state;
    let updatedVisibleCols;
    const isToggled = visibleCols.includes(colNameToRemove);

    if (!isToggled) {
      updatedVisibleCols = visibleCols.concat(colNameToRemove);
    } else {
      updatedVisibleCols = visibleCols.filter(name => name !== colNameToRemove);
    }

    this.updateVisibleCols(updatedVisibleCols);
  };

  updateVisibleCols = (visibleCols: string[]) => {
    this.setState({ visibleCols });
    LocalStorage.setItem(this.id, visibleCols);
  };

  renderColumnToggle = () => {
    const { cols } = this.props;
    const { visibleCols } = this.state;

    return (
      <ColumnToggler
        cols={cols}
        isColVisible={col => visibleCols.includes(col)}
        toggleCol={this.toggleCol}
      />
    );
  };

  sortCol = (colName: string) => () => {
    this.setState(({ sortCol }) => {
      return sortCol
        ? { sortCol: { name: colName, order: sortCol.order === 'DESC' ? 'ASC' : 'DESC' } }
        : { sortCol: { name: colName, order: 'ASC' } };
    });
  };

  renderCellContent = (val: RowContent) => {
    if (typeof val === 'string') {
      return val;
    }

    return val.content;
  };

  getSortedRows = () => {
    const { sortCol } = this.state;
    const { rows } = this.props;

    if (!sortCol) {
      return rows;
    }

    const sortedRows =
      sortCol.order === 'ASC' ? rows.sort(ascSort(sortCol)) : rows.sort(descSort(sortCol));

    return sortedRows;
  };

  render() {
    const { visibleCols } = this.state;
    const { cols, children } = this.props;

    const renderProps = {
      renderColumnToggle: this.renderColumnToggle,
      // cols,
      // isColVisible: col => visibleCols.includes(col),
      // toggleColumn: this.toggleColumn,
    };

    const sortedRows = this.getSortedRows();

    return (
      <>
        {!!children && children(renderProps)}
        <Table>
          <TableHead>
            <SortableRow axis="x" onSortEnd={this.updateOrder}>
              <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
                <Checkbox />
              </TableCell>
              {visibleCols.map((name, index) => (
                <SortableTableCell index={index} key={cols[name].id}>
                  <>
                    {cols[name].title}
                    {!cols[name].disableSort && <button onClick={this.sortCol(name)}>Sort</button>}
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
                  <TableCell key={uuid()}>{this.renderCellContent(row[name])}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default AwesomeTable;
