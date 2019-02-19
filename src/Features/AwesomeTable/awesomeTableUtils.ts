import { Row, RowContent, SortOrder } from './awesomeTableModels';

const getValue = (rowContent: RowContent) => {
  if (!rowContent) {
    return 0;
  }

  let value;
  value = typeof rowContent !== 'object' ? rowContent : rowContent.sortString;
  value = typeof value === 'string' ? value.toLowerCase() : value;

  return value;
};

export const ascSort = (sortCol: SortOrder) => (a: Row, b: Row) => {
  const valueA = getValue(a.cols[sortCol.name]);
  const valueB = getValue(b.cols[sortCol.name]);

  if (!valueA || !valueB) {
    return 0;
  }
  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export const descSort = (sortCol: SortOrder) => (a: Row, b: Row) => {
  const valueA = getValue(a.cols[sortCol.name]);
  const valueB = getValue(b.cols[sortCol.name]);

  if (!valueA || !valueB) {
    return 0;
  }
  if (valueA > valueB) {
    return -1;
  }
  if (valueA < valueB) {
    return 1;
  }
  return 0;
};

export const LocalStorage = {
  hasLocalStorage: typeof window !== 'undefined' && window.localStorage,

  setItem(name: string, content: object | string) {
    if (!this.hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(name, JSON.stringify(content));
  },

  getItem<T = any>(name: string): T | null {
    if (!this.hasLocalStorage) {
      return null;
    }

    const content = window.localStorage.getItem(name);

    return content ? JSON.parse(content) : null;
  },
};
