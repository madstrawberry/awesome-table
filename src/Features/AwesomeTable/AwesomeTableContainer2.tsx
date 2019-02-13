import React, { useState } from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { ascSort, descSort } from './awesomeTableUtils';
import ColumnToggle from './ColumnToggle';
import { AwesomeTableRenderProps, Row, Col, SortOrder } from './awesomeTableModels';
import AwesomeTable from './AwesomeTable';
import useStateWithStorage from './hooks/useCols';

interface Props {
  cols: Col;
  name: string;
  children: (renderProps: AwesomeTableRenderProps) => JSX.Element;
}

const AwesomeTableContainer2: React.FunctionComponent<Props> = ({ cols, name, children }) => {
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
      updatedVisibleCols = visibleCols.filter(name => name !== colNameToRemove);
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
        isColVisible={col => visibleCols.includes(col)}
        toggleCol={toggleCol}
      />
    );
  };

  const renderTable = (rows: Row[]) => {
    const sortedRows = getSortedRows(rows);

    return (
      <AwesomeTable
        sortOrder={sortOrder}
        visibleCols={visibleCols}
        cols={cols}
        sortedRows={sortedRows}
        onSortCol={updateColOrder}
        onSortRow={sortRow}
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

export default AwesomeTableContainer2;
