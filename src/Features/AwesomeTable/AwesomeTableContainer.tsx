import React from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { LocalStorage, ascSort, descSort } from './awesomeTableUtils';
import ColumnToggle from './ColumnToggle';
import { AwesomeTableRenderProps, Row, Col, SortOrder } from './awesomeTableModels';
import AwesomeTable from './AwesomeTable';

interface Props {
  rows: Row[];
  cols: Col;
  name: string;
  children: (renderProps: AwesomeTableRenderProps) => JSX.Element;
}

interface State {
  visibleCols: string[];
  sortOrder: undefined | SortOrder;
}

class AwesomeTableContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.id = `visibleCols-${props.name}`;

    this.state = {
      visibleCols: this.getInitialVisibleCols(),
      sortOrder: undefined,
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

  updateColOrder = ({ oldIndex, newIndex }: SortEnd) => {
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

  sortRow = (colName: string) => {
    this.setState(({ sortOrder }) => {
      return !sortOrder || sortOrder.name !== colName
        ? { sortOrder: { name: colName, sortAsc: true } }
        : { sortOrder: { name: colName, sortAsc: !sortOrder.sortAsc } };
    });
  };

  getSortedRows = () => {
    const { sortOrder } = this.state;
    const { rows } = this.props;

    if (!sortOrder) {
      return rows;
    }

    const sortedRows = sortOrder.sortAsc
      ? rows.sort(ascSort(sortOrder))
      : rows.sort(descSort(sortOrder));

    return sortedRows;
  };

  renderColumnToggle = () => {
    const { cols } = this.props;
    const { visibleCols } = this.state;

    return (
      <ColumnToggle
        cols={cols}
        isColVisible={col => visibleCols.includes(col)}
        toggleCol={this.toggleCol}
      />
    );
  };

  renderTable = () => {
    const { visibleCols, sortOrder } = this.state;
    const { cols } = this.props;
    const sortedRows = this.getSortedRows();

    return (
      <AwesomeTable
        sortOrder={sortOrder}
        visibleCols={visibleCols}
        cols={cols}
        sortedRows={sortedRows}
        onSortCol={this.updateColOrder}
        onSortRow={this.sortRow}
      />
    );
  };

  render() {
    const { children } = this.props;

    const renderProps = {
      renderColumnToggle: this.renderColumnToggle,
      renderTable: this.renderTable,
      sortRow: this.sortRow,
    };

    return children(renderProps);
  }
}

export default AwesomeTableContainer;
