//Given a string s, find the length of the longest substring without repeating characters.

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

//Breakdown of approach: iterate through string, store chars in an array if each new char doesn't match anything in the array, if we encounter a repeating char store the length of the current array in a separate one, slice out chars up to and including the repeating char in the array, then store the new char in the arr and repeat the process. Get the max value in the lengths array at the end and return that. 

//My first solve O(n^2)
function findLongestSubstringLength(s) {
    let arr = [];
    const substrLengths = [];

    for (let char of s) {       
        if (arr.includes(char)) {
            substrLengths.push(arr.length);
            const index = arr.indexOf(char);
            arr = arr.slice(index + 1);
        }     

        arr.push(char);         
        
    }
    substrLengths.push(arr.length);
    return Math.max(...substrLengths);

}

//Optimal: O(n)
function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
}


console.log(findSubstringLength('abcabcbb'));
console.log(findSubstringLength('pwwkew'));
console.log(findSubstringLength('bbbbbbbb'));
console.log(findSubstringLength("dvdf"));