import { Row, SortCol } from './awesomeTableModels';

export const ascSort = (sortCol: SortCol) => (a: Row, b: Row) => {
  let valueA = a[sortCol.name];
  let valueB = b[sortCol.name];

  valueA = typeof valueA === 'string' ? valueA : valueA.sortString;
  valueB = typeof valueB === 'string' ? valueB : valueB.sortString;

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export const descSort = (sortCol: SortCol) => (a: Row, b: Row) => {
  let valueA = a[sortCol.name];
  let valueB = b[sortCol.name];

  valueA = typeof valueA === 'string' ? valueA : valueA.sortString;
  valueB = typeof valueB === 'string' ? valueB : valueB.sortString;

  if (valueA > valueB) {
    return -1;
  }
  if (valueA < valueB) {
    return 1;
  }
  return 0;
};

const hasLocalStorage = typeof window !== 'undefined' && window.localStorage;

export const LocalStorage = {
  setItem(name: string, content: object | string) {
    if (!hasLocalStorage) {
      return;
    }

    window.localStorage.setItem(name, JSON.stringify(content));
  },

  getItem<T = any>(name: string): T | null {
    if (!hasLocalStorage) {
      return null;
    }

    const content = window.localStorage.getItem(name);

    return content ? JSON.parse(content) : null;
  },
};
