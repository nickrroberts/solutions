//Iterative (return array of fib sequence taking the number of items as an input)
function fibonnaci(n) {
    const arr = [];
    for (let i=0; i < n; i++) {
      if (i < 2) {
        arr.push(i);
      } else {
        arr.push(arr[i-1] + arr[i-2]);
      }
    }
    return arr;
  }
  
  //Recursive
  function fibonnaciRecursive (n) {
    if (n === 1) return [0];
    if (n === 2) return [0,1];
    
    const arr = fibonnaciRecursive(n-1);
    const nextVal = arr[arr.length - 1] + arr[arr.length - 2];
    return [...arr, nextVal];
  }