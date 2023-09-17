/* 求逆序数对的个数 */
export function reversePairs(nums) {
  // 归并排序
  let sum = 0;
  mergeSort(nums);
  return sum;

  function mergeSort(nums) {
    if (nums.length < 2) return nums;
    const mid = parseInt(nums.length / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    let res = [];
    let leftLen = left.length;
    let rightLen = right.length;
    let len = leftLen + rightLen;
    for (let index = 0, i = 0, j = 0; index < len; index++) {
      if (i >= leftLen) res[index] = right[j++];
      else if (j >= rightLen) res[index] = left[i++];
      else if (left[i] <= right[j]) res[index] = left[i++];
      else {
        res[index] = right[j++];
        sum += leftLen - i;//在归并排序中唯一加的一行代码
      }
    }
    return res;
  }
};
/* 打乱数组*/
export function shuffle(nums) {
  for (let i = 0; i < nums.length; ++i) {
    const j = Math.floor(Math.random() * (nums.length - i)) + i;
    [nums[i], nums[j]] = [nums[j], nums[i]]
  }
  return nums;
};