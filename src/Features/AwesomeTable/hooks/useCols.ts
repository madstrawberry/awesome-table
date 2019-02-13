import { LocalStorage } from '../awesomeTableUtils';
import { useEffect, useState } from 'react';

const useCols = (cols: string[], id: string) => {
  const [visibleCols, setVisibleCols] = useState<string[]>(cols);

  const setAndSaveVisibleCols = (cols: string[]) => {
    LocalStorage.setItem(id, cols);
    setVisibleCols(cols);
  };

  useEffect(() => {
    const savedVisibleColNames = LocalStorage.getItem<string[]>(id);

    if (!!savedVisibleColNames && savedVisibleColNames.every(colName => cols.includes(colName))) {
      setAndSaveVisibleCols(savedVisibleColNames);
      return;
    }

    setAndSaveVisibleCols(cols);
  }, []);

  return [visibleCols, setAndSaveVisibleCols] as [typeof visibleCols, typeof setAndSaveVisibleCols];
};

export default useCols;
