export const makeWord = (current: string, aim: string) => {
  if (current.length === aim.length) {
    return current;
  } else if (current.length < aim.length) {
    return current + aim[current.length];
  } else if (current.length > aim.length) {
    return '';
  }
  return '';
};
