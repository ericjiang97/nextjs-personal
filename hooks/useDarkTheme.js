import { useState, useEffect } from "react";

const localStorageKey = "darkTheme";

export default function useDarkTheme() {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(false);

  useEffect(() => {
    const initialValue = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    try {
      const item = window.localStorage.getItem(localStorageKey);
      console.log(item);
      if (item === null) {
        setStoredValue(initialValue);
      }
      // Parse stored json or if none return initialValue
      setStoredValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      setStoredValue(initialValue);
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(localStorageKey, JSON.stringify(value));
  };

  return [storedValue, setValue];
}
