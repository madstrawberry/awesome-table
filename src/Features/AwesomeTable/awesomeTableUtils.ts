import { Row, SortOrder } from './awesomeTableModels';

export const ascSort = (sortCol: SortOrder) => (a: Row, b: Row) => {
  let valueA = a.cols[sortCol.name];
  let valueB = b.cols[sortCol.name];

  if (!valueA || !valueB) {
    return 0;
  }

  valueA = typeof valueA !== 'object' ? valueA : valueA.sortString;
  valueB = typeof valueB !== 'object' ? valueB : valueB.sortString;

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export const descSort = (sortCol: SortOrder) => (a: Row, b: Row) => {
  let valueA = a.cols[sortCol.name];
  let valueB = b.cols[sortCol.name];

  if (!valueA || !valueB) {
    return 0;
  }

  valueA = typeof valueA !== 'object' ? valueA : valueA.sortString;
  valueB = typeof valueB !== 'object' ? valueB : valueB.sortString;

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
