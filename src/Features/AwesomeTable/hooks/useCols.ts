import { LocalStorage } from '../awesomeTableUtils';
import { useEffect, useState } from 'react';

const useStateWithStorage = <T extends object>(content: T, key: string) => {
  const [savedContent, setSavedContent] = useState<T>(content);

  const updateContent = (content: T) => {
    LocalStorage.setItem(key, content);
    setSavedContent(content);
  };

  useEffect(() => {
    const currentSavedContent = LocalStorage.getItem<T>(key);

    if (Array.isArray(currentSavedContent) && Array.isArray(content)) {
      if (currentSavedContent.every(colName => content.includes(colName))) {
        updateContent(currentSavedContent);
      }

      return;
    }

    updateContent(content);
  }, []);

  return [savedContent, updateContent] as [typeof savedContent, typeof updateContent];
};

export default useStateWithStorage;
