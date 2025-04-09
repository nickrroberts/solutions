function HashMap () {
    let buckets = new Array(16);
    let loadFactor = 0;
    
    return {
      hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber*hashCode + key.charCodeAt(i)); 
        }
        return hashCode;
      },
    
      resize() {
        console.log("resizing")
        let oldBuckets = buckets;
        let newSize = oldBuckets.length * 2;
        let newBuckets = new Array(newSize);
        
        for (let i=0; i < oldBuckets.length; i++) {
          let bucket = oldBuckets[i];
          if (!bucket) continue;
    
          for (let entry of bucket) {
            const index = this.hash(entry.key) % newBuckets.length;
    
            if (!newBuckets[index]) {
              newBuckets[index] = [];
            }
            newBuckets[index].push(entry) 
          }
        }
    
        buckets = newBuckets;
      },
    
      set(key, value) {
          const index = this.hash(key) % buckets.length;
          let bucket = buckets[index];
    
          if (!bucket) {
            bucket = [];
            buckets[index] = bucket;
          }
    
          if (bucket.length > 0) {
            for (let item of bucket) {
              if (item.key === key) {
                item.value = value;
                return;
              }
            }
            bucket.push({key, value});
          } else {
            bucket.push({key, value});
          }
    
          loadFactor = this.entries().length / buckets.length;
          console.log(loadFactor);
          if (loadFactor > 0.75) {
            this.resize();
          }
      },
    
      get(key) {
        const index = this.hash(key);
        const bucket = buckets[index];
        if (index < 0 || index >= buckets.length) {
          throw new Error("Trying to access index out of bounds");
        }
        if (bucket && bucket.length === 1 && bucket[0].key === key) {
          return bucket[0];
        }
        if (bucket && bucket.length > 1) {
          for (let item of bucket) {
            if (item.key === key) {
              return item;
            }
          }
        }
        else {
          return false;
        }
      },
    
      has(key) {
        const index = this.hash(key);
        if (!buckets[index]) {
          return false;
        } else {
          for (let bucket of buckets[index]) {
            if (bucket.key === key) {
              return true;
            }
          }
          return false;
        }
      },
    
      remove(key) {
        const index = this.hash(key);
        const bucket = buckets[index];
        if (bucket) {
          for (let i=0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
              bucket.splice(i, 1);
              return true;
            }
          }
          return false;
        }
        else {
          return false
        }
      },
    
      length() {
        let counter = 0
        for(let i=0; i < buckets.length; i++) {
          if(Array.isArray(buckets[i])) {
            for (let j=0; j < buckets[i].length; j++ ) {
              counter++;
            }
          }
        }
        return counter;
      },
    
      clear() {
        this.buckets = new Array(16);
        this.loadFactor = 0;
      },
    
      keys() {
        const keys = [];
        for(let i=0; i < buckets.length; i++) {
          if(Array.isArray(buckets[i])) {
            for (let j=0; j < buckets[i].length; j++ ) {
              keys.push(buckets[i][j].key);
            }
          }
        }
        return keys;
      },
    
      values() {
        const values = [];
        for(let i=0; i < buckets.length; i++) {
          if(Array.isArray(buckets[i])) {
            for (let j=0; j < buckets[i].length; j++ ) {
              values.push(buckets[i][j].value);
            }
          }
        }
        return values;
      },
    
      entries() {
        const entries = [];
        for(let i=0; i < buckets.length; i++) {
          if(Array.isArray(buckets[i])) {
            for (let j=0; j < buckets[i].length; j++ ) {
              entries.push(buckets[i][j]);
            }
          }
        }
        return entries;
      },
      mapSize() {
        return buckets.length;
      }
    
    }}
    
    //Tests
    
    const map = HashMap();
    
    map.set("key0", "value0");
    map.set("key1", "value1");
    map.set("key2", "value2");
    map.set("key3", "value3");
    map.set("key4", "value4");
    map.set("key5", "value5");
    map.set("key6", "value6");
    map.set("key7", "value7");
    map.set("key8", "value8");
    map.set("key9", "value9");
    map.set("key10", "value10");
    map.set("key11", "value11");
    map.set("key12", "value12");
    map.set("key13", "value13");
    map.set("key14", "value14");
    map.set("key15", "value15");
    
    console.log(map.mapSize());
    
    