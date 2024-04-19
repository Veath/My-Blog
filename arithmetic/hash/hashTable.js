class HashTable {
  constructor() {
    this.table = new Map();
  }
  hash(key) {
    const len = key.length;
    const val = 0;
    for (let i = 0; i < len; i++) {
      val += key.charCodeAt(i) * i;
    }
    return val;
  }
  put(key, value) {
    const hash = this.hash(key);
    if (!this.table[hash]) {
      this.table[hash] = new Map();
    }
    this.table[hash].set(key, value);
  }
  get(key) {
    const hash = this.hash(key);
    return this.table[hash] && this.table[hash].get(key);
  }
  delete(key) {
    const hash = this.hash(key);
    this.table[hash] && this.table[hash].delete(key);
  }
}

export { HashTable };
