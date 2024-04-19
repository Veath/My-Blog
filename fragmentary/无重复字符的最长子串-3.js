/**
 * 无重复字符的最长子串-3
给定一个字符串，请你找出其中不含有重复字符的   最长子串   的长度。
示例  1:
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
复制代码示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
复制代码示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

典型的滑动窗口问题，定义一个左边界 left 和一个右边界 right，形成一个窗口，并且在这个窗口中保证不出现重复的字符串。
这需要用到一个新的变量 freqMap，用来记录窗口中的字母出现的频率数。在此基础上，先尝试取窗口的右边界再右边一个位置的值，也就是 str[right + 1]，然后拿这个值去 freqMap 中查找：

这个值没有出现过，那就直接把 right ++，扩大窗口右边界。
如果这个值出现过，那么把 left ++，缩进左边界，并且记得把 str[left] 位置的值在 freqMap 中减掉。

循环条件是 left < str.length，允许左边界一直滑动到字符串的右界。

 */

let lengthOfLongestSubstring = function (str) {
  let n = str.length;
  // 滑动窗口为s[left...right]
  let left = 0;
  let right = -1;
  let freqMap = {}; // 记录当前子串中下标对应的出现频率
  let max = 0; // 找到的满足条件子串的最长长度

  while (left < n) {
    let nextLetter = str[right + 1];
    if (!freqMap[nextLetter] && nextLetter !== undefined) {
      freqMap[nextLetter] = 1;
      right++;
    } else {
      freqMap[str[left]] = 0;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }

  return max;
};
