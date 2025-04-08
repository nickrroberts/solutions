function LinkedList () {
    let list = {
      head: null
    }
    
    return {
      append(value) {
        const newNode =  Node(value, null);
        if (list.head === null) {
          list.head = newNode;
        } else {
          this.traverse( (node) => {
              if (node.next === null) {
                node.next = newNode;
                return true;
              }
          })
        }
        return list; 
      },
  
      prepend(value) {
        const prependedList = {
          head: null
        }
        const listCopy = list.head;
        const prependedNode = Node(value, listCopy)
        prependedList.head = prependedNode;
        list = prependedList;
        return list;
      },
  
      size() {
        let counter = 0;
        this.traverse(() => { counter++ });
        return counter
  
      },
  
      head() {
        return list.head;
  
      },
  
      tail() {
        let tailNode = null;
        this.traverse ( (node) => {
          if (node.next == null) {
            tailNode = node;
            return true;
          }
        })
        return tailNode;
        
      },
  
      at(index) {
        let indexNode = null
        this.traverse((current, counter) => {
          if (counter === index) {
            indexNode = current
            return true
          }
        })
  
        return indexNode;
  
      },
  
      pop() {
        if (list.head !== null && list.head.next == null) {
          list.head = null;
          return list;
        } else {
          this.traverse( (current) => {
            if (current.next.next === null) {
              current.next = null;
              return true;
            }
          })
          return list;
        }
         
      },
  
      contains(value) {
        let status = false;
        this.traverse( (current) => {
          if (current.value == value) {
            status = true;
            return true;
          }
        })
        return status;
      },
  
      find(value) {
        let foundIndex = null;
        this.traverse( (node, index) => { 
          if (node.value === value) {
            foundIndex = index
            return true;
          }
        });
        return foundIndex;
      },
  
      toString() {
        let nodeList = "";
        this.traverse( (current) => {
          if (current.next == null) {
            nodeList += ` (${current.value})`;         
          } else {
            nodeList += ` (${current.value}) =>`;
          }
        })
  
        return nodeList;
  
      },
  
        insertAt(value, index) {
          let newList = null;
          let previous = null;
          this.traverse ( (current, counter) => {          
            if (index === counter) {
              const newNode = Node(value, current);
              if (previous === null) {
                list.head = newNode
              } else {
                previous.next = newNode;
              }           
              newList = previous;
              return true;
            }
            previous = current;
          })
          return newList;
        },
  
      removeAt(index) {
        let newList = null;
        let previous = null;
        this.traverse( (current, counter) => {
          if (index === counter) {
            if (previous === null) {
              list.head = list.head.next
            } else {
              previous.next = current.next;
            }
            newList = previous;
            return true;
          }
          previous = current
        })
        return newList;
      },
  
      traverse(callback) {
        let current = list.head;
        let counter = 0;
        while (current !== null) {
          const stop = callback(current, counter);
          if (stop) break;
          current = current.next;
          counter++;
        }
      }
    }
  }
  
  function Node (value, next) {
    return {
      value,
      next
    }
  }
  