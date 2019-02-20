import { useEffect, useState } from 'react';
import { LocalStorage } from '../awesomeTableUtils';

const useStateWithStorage = <T extends object | string>(content: T, key: string) => {
  const [savedContent, setSavedContent] = useState<T>(content);

  const updateContent = (updatedContent: T) => {
    LocalStorage.setItem(key, updatedContent);
    setSavedContent(updatedContent);
  };

  const setInitialContent = () => {
    const currentSavedContent = LocalStorage.getItem<T>(key);

    if (Array.isArray(currentSavedContent) && Array.isArray(content)) {
      if (currentSavedContent.every((colName) => content.includes(colName))) {
        updateContent(currentSavedContent);
      }

      return;
    }

    updateContent(content);
  };

  useEffect(() => {
    setInitialContent();
  }, []);

  useEffect(() => {
    setInitialContent();
  }, [key]);

  return [savedContent, updateContent] as [typeof savedContent, typeof updateContent];
};

export default useStateWithStorage;
