//Balanced binary search tree
function Tree(array) {
    let root = buildTree(array);
    
    function buildTree(array) {
      //Sort
      const sort = [...array].sort((a, b) => a - b);
      
      //Remove dupes
      const unique = [...new Set(sort)];
  
      //find the middle index
      const middle = Math.floor(unique.length/2);
  
      //base case = sort > 1 items
      if (unique.length > 1) {
        const left = unique.slice(0, middle);
        const right = unique.slice(middle + 1);
        const rootNode = Node(unique[middle], buildTree(left), buildTree(right));
  
        //return root node
        return rootNode;
      }
      
      if (unique.length === 1) {
        return Node(unique[0], null, null);
      }
    }
  
    const prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
      if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
  
    function walkTree (node, parent, value, callback) {
      if (node === null) return null;
  
      const result = callback(node, parent, value);
      if (result !== undefined) return result;
  
      if (value < node.value && node.left) {
        return walkTree(node.left, node, value, callback);
      } 
      if (value > node.value && node.right) {
        return walkTree(node.right, node, value, callback);
      } 
  
      return null;
  
    }
  
    return {
  
      print() {
        console.log("Tree structure:");
        prettyPrint(root);
      },
  
      insert(value) {
        const newNode = Node(value);
  
        if (root === null) {
          root = newNode;
          return;
        }
  
        walkTree(root, null, value, (node, parent, value) => {
          if (value === node.value) {
            console.log("Value already exists!");
            return true;
          }
  
          if (value < node.value) {
            if (node.left === null) {
              node.left = newNode;
              return true;
            } else { return }
          } 
  
          if (value > node.value) {
            if (node.right === null) {
              node.right = newNode;
              return true;
            } else { return }
          } 
  
          return false;
        })
      },
  
      deleteItem(value) {
  
        walkTree(root, null, value, (node, parent, value) => {
  
          //leaf node
          if (node.value === value && !node.left && !node.right) {
  
            if (parent === null) {
              root = null;
            }
            else if (parent.left === node) {
              parent.left = null;
            } 
            else if (parent.right === node) {
              parent.right = null;
            }
  
            return true;
          }
          //one child node
          if (node.value === value && (node.left === null || node.right === null)) {
            const child = node.left || node.right;
  
            if (parent.left === node) {
              parent.left = child;
            } 
            else if (parent.right === node) {
              parent.right = child;
            }
  
            return true;
          }
  
          //two child nodes - replace target with smallest value in right subtree, delete the smallest value in the right subtree
          if (node.value === value && node.left && node.right) {
            let successorParent = node;
            let successor = node.right;
            while (successor.left) {
              successorParent = successor;
              successor = successor.left;
            }
  
            node.value = successor.value;
  
          if (successorParent.left === successor) {
            successorParent.left = successor.right
          } else {
            successorParent.right === successor.right
          }
          
            return true;
          }
        })
      },
  
      find(value) {
        const result = walkTree(root, null, value, (node, parent, value) => {
          if (node.value === value) return node;
        })
  
        return result || false;
  
      },
  
      levelOrder(callback) {
        if (typeof callback !== "function") throw new Error("No callback function provided.");
        if (!root) return;
        
        const queue = [ root ];
  
        while (queue.length > 0) {
          const current = queue.shift();
          callback(current);
          if (current.left !== null) queue.push(current.left);
          if (current.right !== null) queue.push(current.right);
        }
      },
  
      inOrder(callback) {
        if (typeof callback !== "function") throw new Error("No callback function provided.");
        
        function traverse(current) {
          if (!current) return;
          traverse(current.left)
          callback(current)
          traverse(current.right)
        }
  
        traverse(root);
        
      },
  
      preOrder(callback) {
        if (typeof callback !== "function") throw new Error("No callback function provided.");
  
        function traverse(current) {
          if (!current) return;
          callback(current)
          traverse(current.left)      
          traverse(current.right)
        }
  
        traverse(root);
      },
  
      postOrder(callback) {
        if (typeof callback !== "function") throw new Error("No callback function provided .");
  
        function traverse(current) {
          if (!current) return;
          traverse(current.left)      
          traverse(current.right)
          callback(current)
        }
  
        traverse(root);
      },
  
      height(value) {
        if (value === null) return 0;
  
        let node;
  
        if (typeof value !== "object") {
          node = this.find(value);
          if (!node) return null;
        } else {
          node = value;
        }
      
        const leftH  = this.height(node.left);
        const rightH = this.height(node.right);
      
        return Math.max(leftH, rightH) + 1;
  
      },
  
      depth(value) {
        if (value === null) return 0;
  
        function traverse(current) {
          if (!current) return;
          if (current.value === value) {
            return 0;
          }
          const leftDepth  = traverse(current.left);
          if (leftDepth  != null) return leftDepth  + 1;
          
          const rightDepth = traverse(current.right);
          if (rightDepth != null) return rightDepth + 1;
          
          return null;
        }
        const result = traverse(root);
        return result;
        
      },
  
      isBalanced() {
  
        const check = (node) => {
          if (node === null) return 0;
    
          const lh = check(node.left);
          if (lh === -1) return -1;            
    
          const rh = check(node.right);
          if (rh === -1) return -1;         
    
          if (Math.abs(lh - rh) > 1) return -1;   
    
          return Math.max(lh, rh) + 1;           
        };
    
        return check(root) !== -1;
  
      },
  
      rebalance() {
        const values = [];
        this.inOrder(node => values.push(node.value));
  
        root = buildTree(values);
  
      },
  
    }
  
  }
  
  function Node(value, left = null, right = null) {
    return {
      value,    
      left,
      right
    }
  }
  
  
  
  