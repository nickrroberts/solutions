//Assumes the piece is a knight
//Using a breadth first search, this function finds the shortest path to a given position from a starting position on a chess board. I used a map to trace the path back to the starting point to print it out

function shortestPath(start, target) {
    let moves = 0;
    const queue = [[[start[0], start[1]], moves]];
    const visited = new Set();
    const parents = new Map();
    
  
    const offsets = [
      [ 2,  1],
      [ 2, -1],
      [-2,  1],
      [-2, -1],
      [ 1,  2],
      [ 1, -2],
      [-1,  2],
      [-1, -2],
    ];
  
    function validMoves([pos, moves]) {
      for (let offset of offsets) {
        const x = offset[0] + pos[0];
        const y = offset[1] + pos[1];
        const key = `${x}, ${y}`;
        const parentKey = `${pos[0]}, ${pos[1]}`;
        
        if (x >= 0 && x < 8 && y >= 0 && y < 8 && !visited.has(`${x}, ${y}`)) {
          queue.push([[x, y], moves +1]);
          parents.set(key, parentKey);        
        }
      }
    }
  
    while (queue.length > 0) {
      const [[x, y], moves] = queue.shift();
      visited.add(`${x}, ${y}`);
      validMoves([[x, y], moves]); 
  
      if (x === target[0] && y === target[1]) {
        const path = [];
        let current = `${target[0]}, ${target[1]}`;
        
        while (parents.has(current)) {
          path.push(current);
          current = parents.get(current);      
        }
        path.push(current);
        console.log(path);
  
        console.log(`The smallest number of moves to get from [${start}] to [${target}] is ${moves}: `);
        for (let item of
           path.reverse()) {
          console.log(`[${item}] `)
        }
  
        return;
      }
    }
  
  }
  
  //Example
  shortestPath([0,0], [1,3]);
  