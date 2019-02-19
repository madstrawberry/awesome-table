import React, { useState } from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import AwesomeTable from './AwesomeTable';
import {
  AwesomeTableRenderProps,
  Cols,
  RenderTableProps,
  Row,
  SortOrder,
} from './awesomeTableModels';
import { ascSort, descSort } from './awesomeTableUtils';
import ColumnToggle from './ColumnToggle';
import useStateWithStorage from './hooks/useStateWithStorage';

interface Props {
  cols: Cols;
  name: string;
  children: (renderProps: AwesomeTableRenderProps) => JSX.Element;
}

const AwesomeTableContainer: React.FunctionComponent<Props> = ({ cols, name, children }) => {
  const key = `awesomeTableVisibleCols-${name}`;

  const [visibleCols, setVisibleCols] = useStateWithStorage(Object.keys(cols), key);
  const [sortOrder, setSortOrder] = useState<undefined | SortOrder>(undefined);

  const updateColOrder = ({ oldIndex, newIndex }: SortEnd) => {
    const updatedVisibleCols = arrayMove(visibleCols, oldIndex, newIndex);

    setVisibleCols(updatedVisibleCols);
  };

  const toggleCol = (colNameToRemove: string) => {
    let updatedVisibleCols: string[];
    const isToggled = visibleCols.includes(colNameToRemove);

    if (!isToggled) {
      updatedVisibleCols = visibleCols.concat(colNameToRemove);
    } else {
      updatedVisibleCols = visibleCols.filter((colName) => colName !== colNameToRemove);
    }

    setVisibleCols(updatedVisibleCols);
  };

  const sortRow = (colName: string) => {
    const updatedSortOrder =
      !sortOrder || sortOrder.name !== colName
        ? { name: colName, sortAsc: true }
        : { name: colName, sortAsc: !sortOrder.sortAsc };

    setSortOrder(updatedSortOrder);
  };

  const getSortedRows = (rows: Row[]) => {
    if (!sortOrder) {
      return rows;
    }

    const sortedRows = sortOrder.sortAsc
      ? rows.sort(ascSort(sortOrder))
      : rows.sort(descSort(sortOrder));

    return sortedRows;
  };

  const renderColumnToggle = () => {
    return (
      <ColumnToggle
        cols={cols}
        isColVisible={(col) => visibleCols.includes(col)}
        toggleCol={toggleCol}
      />
    );
  };

  const renderTable = ({ rows, ...rest }: RenderTableProps) => {
    const sortedRows = getSortedRows(rows);

    return (
      <AwesomeTable
        sortOrder={sortOrder}
        visibleCols={visibleCols}
        cols={cols}
        rows={sortedRows}
        onSortCol={updateColOrder}
        onSortRow={sortRow}
        {...rest}
      />
    );
  };

  return children({
    renderColumnToggle,
    renderTable,
    sortRow,
    toggleCol,
  });
};

export default AwesomeTableContainer;
