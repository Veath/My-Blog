function isValid(str) {
  const map = {
    '{': -1,
    '[': -2,
    '(': -3,
    '}': 1,
    ']': 2,
    ')': 3
  };
  const stack = [];

  for (const char of str) {
    if (!map[char]) {
      continue;
    }

    if (map[char] < 0) {
      stack.push(char);
    } else {
      const temp = stack.pop();
      if (map[temp] + map[char] !== 0) return false;
    }
  }

  return true;
}
