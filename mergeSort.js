function mergeSort (array) {
    if (array.length == 1) {
      return array;
    }
    else {
          let mid = Math.floor(array.length / 2);
          const left = array.slice(0, mid);
          const right = array.slice(mid);
          const sortedLeft = mergeSort(left);
          const sortedRight = mergeSort(right);
          const combined =  [];
          let i = 0;
          let j = 0;
  
          while (i < sortedLeft.length && j < sortedRight.length) {
            if (sortedLeft[i] < sortedRight[j]) {
              combined.push(sortedLeft[i]);
              i++;
            } else {
              combined.push(sortedRight[j]);
              j++;
            }
          }
  
          while (i < sortedLeft.length) {
            combined.push(sortedLeft[i]);
            i++;
          }
        
          while (j < sortedRight.length) {
            combined.push(sortedRight[j]);
            j++;
          }
        
          return combined;
        
    } 
  }