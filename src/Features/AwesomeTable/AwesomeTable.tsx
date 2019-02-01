import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import * as React from 'react';
import uuid from 'uuid';
import { SortableContainer, SortableElement, arrayMove, SortEnd } from 'react-sortable-hoc';
import { LocalStorage } from '../../localStorageUtils';
import ToggleColumns from '../../ToggleColumns';

export interface Col {
  [key: string]: { id: string; title: string };
}

export interface Row {
  [key: string]: JSX.Element | string;
}

export interface ToolbarProps {
  cols: Col;
  isColVisible: (col: string) => boolean;
  toggleColumn: (col: string) => void;
}

interface Props {
  rows: Row[];
  cols: Col;
  name: string;
  toolbar?: (toolbarProps: ToolbarProps) => JSX.Element;
}

interface State {
  visibleCols: string[];
}

class AwesomeTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.id = `visibleCols-${this.props.name}`;

    this.state = {
      visibleCols: this.getInitialVisibleCols(),
    };
  }

  id: string;

  getInitialVisibleCols = () => {
    const allColNames = Object.keys(this.props.cols);
    const savedVisibleColNames = LocalStorage.getItem<string[]>(this.id);

    if (
      !!savedVisibleColNames &&
      savedVisibleColNames.every(colName => allColNames.includes(colName))
    ) {
      return savedVisibleColNames;
    }

    return allColNames;
  };

  updateOrder = ({ oldIndex, newIndex }: SortEnd) => {
    const { visibleCols } = this.state;
    const updatedVisibleCols = arrayMove(visibleCols, oldIndex, newIndex);

    this.updateVisibleColumns(updatedVisibleCols);
  };

  toggleColumn = (colToRemove: string) => {
    const { visibleCols } = this.state;
    let updatedVisibleCols;
    const isToggled = visibleCols.includes(colToRemove);

    if (!isToggled) {
      updatedVisibleCols = visibleCols.concat(colToRemove);
    } else {
      updatedVisibleCols = visibleCols.filter(name => name !== colToRemove);
    }

    this.updateVisibleColumns(updatedVisibleCols);
  };

  updateVisibleColumns = (visibleCols: string[]) => {
    this.setState({ visibleCols });
    LocalStorage.setItem(this.id, visibleCols);
  };

  render() {
    const { visibleCols } = this.state;
    const { cols, rows, toolbar } = this.props;

    return (
      <>
        {!!toolbar &&
          toolbar({
            cols,
            isColVisible: col => visibleCols.includes(col),
            toggleColumn: this.toggleColumn,
          })}
        <Table>
          <TableHead>
            <SortableRow axis="x" onSortEnd={this.updateOrder}>
              <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
                <Checkbox />
              </TableCell>
              {visibleCols.map((name, index) => (
                <SortableTableCell index={index} key={cols[name].id}>
                  {cols[name].title}
                </SortableTableCell>
              ))}
            </SortableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={uuid()}>
                <TableCell padding="checkbox" style={{ maxWidth: 0 }}>
                  <Checkbox />
                </TableCell>
                {visibleCols.map(name => (
                  <TableCell key={uuid()}>{row[name]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

const SortableRow = SortableContainer((props: TableRowProps) => <TableRow {...props} />);
const SortableTableCell = SortableElement((props: TableCellProps) => <TableCell {...props} />);

export default AwesomeTable;
