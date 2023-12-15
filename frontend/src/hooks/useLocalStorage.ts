import { useCallback, useState, useEffect } from 'react';
import { stringify, parse } from 'flatted';

function getSavedValue(key: string, initialValue: unknown) {
  const jsonValue = localStorage.getItem(key);
  if (jsonValue != null) {
    return parse(jsonValue) as unknown;
  }

  return initialValue;
}

function useLocalStorage(key: string, initialValue: unknown) {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
  }, []);

  return { value, setValue, remove };
}

export default useLocalStorage;
