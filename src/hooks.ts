import { useState } from "react";

export const useKeyboardState = (initialValue: string) => {
  const [state, setState] = useState<Map<string, string>>(() => {
    const values = new Map();
    for (let value of initialValue) {
      values.set(value, "");
    }
    return values;
  });

  return [state, setState] as const;
};
