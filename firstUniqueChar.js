function firstUniqueChar(str) {
    const counts = {};
  
    for (let char of str) {
      counts[char] = (counts[char] || 0) + 1;
    }
  
    for (let char of str) {
      if (counts[char] === 1) {
        return char;
      }
    }
  
    return null;
  }



console.log(firstUniqueChar('aabbcdd')); // ➞ 'c'
console.log(firstUniqueChar('aabbcc'));  // ➞ null
console.log(firstUniqueChar('abcab'));   // ➞ 'c'

//loop through the characters in the string, store in an array, count each appearance, check if equal to one,  look for the first instance in the array of one