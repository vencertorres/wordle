import wordList from "../wordList";

const getNewWord = () => {
  const index = Math.floor(Math.random() * (wordList.length - 0 + 1) + 0);
  return wordList[index];
};

export default getNewWord;
