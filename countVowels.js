function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;

    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}


console.log(countVowels("hello"));     // ➞ 2
console.log(countVowels("xyz"));       // ➞ 0
console.log(countVowels("aeiouaei"));  // ➞ 8