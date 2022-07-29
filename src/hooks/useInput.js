import { useCallback, useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    // eslint-disable-next-line
    [value]
  );

  return { value, onChange: handleChange };
};

export default useInput;
