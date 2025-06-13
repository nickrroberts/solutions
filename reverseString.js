function reverseString(str) {
    const arr = [];
    for (let i = str.length-1; i >= 0; i--) {
        arr.push(str[i]);
    }
    return arr.join("");
}

console.log(reverseString("hello"));    // ➞ "olleh"
console.log(reverseString("abcde"));    // ➞ "edcba"
console.log(reverseString("a"));        // ➞ "a"