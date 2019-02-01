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
import ColumnToggler from './ColumnToggler';

export interface Col {
  [colName: string]: { id: string; title: string; disableToggle: boolean };
}

export interface Row {
  [colName: string]: JSX.Element | string;
}

export interface AwesomeTableRenderProps {
  // cols: Col;
  // isColVisible: (col: string) => boolean;
  // toggleColumn: (col: string) => void;
  toggleComponent: () => JSX.Element;
}

interface Props {
  rows: Row[];
  cols: Col;
  name: string;
  children?: (toolbarProps: AwesomeTableRenderProps) => JSX.Element;
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

  getToggleComponent = () => {
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

  render() {
    const { visibleCols } = this.state;
    const { cols, rows, children } = this.props;

    const renderProps = {
      toggleComponent: this.getToggleComponent,
      // cols,
      // isColVisible: col => visibleCols.includes(col),
      // toggleColumn: this.toggleColumn,
    };

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
