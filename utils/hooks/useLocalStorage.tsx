import { ITestamentInfo } from 'mock/index';
import { useEffect, useState } from 'react';

function useLocalStorage(itemName: string, initialValue: ITestamentInfo) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    try {
      const localStorageItem = window.localStorage.getItem(itemName);
      let parsedItem;
      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItem = initialValue;
      } else {
        parsedItem = JSON.parse(localStorageItem);
      }

      setItem(parsedItem);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveItem = (newItem: any) => {
    try {
      const stringifiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringifiedItem);
      setItem(newItem);
    } catch (error: any) {
      setError(error);
    }
  };

  return {
    item,
    saveItem,
    loading,
    error,
  };
}

export { useLocalStorage };
