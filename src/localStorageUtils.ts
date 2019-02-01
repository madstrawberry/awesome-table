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
