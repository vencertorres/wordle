const setButtonColor = (
  keys: Map<string, string>,
  word: string,
  solution: string
) => {
  const keysCopy = new Map(keys);
  for (let i = 0; i < 5; i++) {
    if (keysCopy.has(word[i])) {
      if (word[i] === solution[i]) {
        keysCopy.set(word[i], "correct");
      } else if (solution.includes(word[i])) {
        keysCopy.set(word[i], "present");
      } else {
        keysCopy.set(word[i], "absent");
      }
    }
  }
  return keysCopy;
};

export default setButtonColor;
