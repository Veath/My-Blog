// #1312
var minInsertions = (s) => {
  const LEN = s.length;
  const dp = Array.from(Array(LEN), () => Array(LEN).fill(0));
  for (let i = 1; i < s.length; ++i) {
    for (j = 0; j < s.length - i; ++j) {
      dp[j][j + i] =
        s[j] === s[j + i]
          ? dp[j + 1][j + i - 1]
          : 1 + Math.min(dp[j + 1][j + i], dp[j][j + i - 1]);
    }
  }
  return dp[0][s.length - 1];
};

var minInsertions = function (s) {
  let n = s.length;

  // n行，n列的二维数组，初始化为0，base case为 i===j时，dp[i][j]=0
  const dp = Array.from(Array(n), () => Array(n).fill(0));
  // console.log(dp);

  // 从下往上
  for (let i = n - 2; i >= 0; i--) {
    // 从左往右
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  // 所求结果
  return dp[0][n - 1];
};
