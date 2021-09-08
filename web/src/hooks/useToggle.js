import { useState, useMemo } from 'react';

export default function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);

  const togglers = useMemo(
    () => ({
      on() {
        setValue(true);
      },
      off() {
        setValue(false);
      },
      toggle() {
        setValue((val) => !val);
      },
    }),
    [setValue]
  );

  return [value, togglers];
}
