class BinarySearchTree {
  constructor() {
    this.tree = null;
  }
  find(data) {
    let node = this.tree;
    while (node != null) {
      if (node.data > data) node = node.left;
      else if (node.data < data) node = node.right;
      return node;
    }
    return null;
  }
  insert(data) {
    if (!this.tree) {
      this.tree = createNode(data);
      return;
    }
    let node = this.tree;
    while (node != null) {
      if (node.data > data) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = createNode(data);
          return;
        }
      } else {
        if (node.right) {
          node = node.right;
        } else {
          node.right = createNode(data);
          return;
        }
      }
    }
  }
  delete(data) {
    let node = this.tree;
    let pNode = null;
    while (node != null && node.data !== data) {
      pNode = node;
      if (node.data > data) node = node.left;
      else node = node.right;
    }

    if (!node) return;

    if (node.left && node.right) {
      let tempNode = node.right;
      let tempPNode = null;

      while (tempNode.left) {
        tempPNode = tempNode;
        tempNode = tempNode.left;
      }

      node.data = tempNode.data;
      node = tempNode;
      pNode = tempPNode;
    }

    let children = null;
    if (node.left) children = node.left;
    else if (node.right) children = node.right;

    if (!pNode) this.tree = children;
    else if (pNode.left === node) pNode.left = children;
    else if (pNode.right === node) pNode.right = children;
  }
  findMin() {
    let node = this.tree;
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }
  findMax() {
    let node = this.tree;
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }
  prevOrder() {
    if (!this.tree) return;
    let node = this.tree;
    const queue = [node];
    while (queue.length) {
      const tempNode = queue.pop();
      console.log(tempNode.data);
      if (tempNode.right) {
        queue.push(tempNode.right);
      }
      if (tempNode.left) {
        queue.push(tempNode.left);
      }
    }
  }
  middleOrder() {
    if (!this.tree) return;
    let node = this.tree;
    const queue = [];
    while (node || queue.length) {
      while (node) {
        queue.push(node);
        node = node.left;
      }
      const tempNode = queue.pop();
      console.log(tempNode.data);
      node = tempNode.right;
    }
  }
  postOrder() {
    if (!this.tree) return;
    let node = this.tree;
    const queue = [];
    let lastVisit = this.tree;
    while (node || queue.length) {
      while (node) {
        queue.push(node);
        node = node.left;
      }
      const tempNode = queue[queue.length - 1];
      if (!tempNode.right || tempNode.right === lastVisit) {
        const temp = queue.pop();
        lastVisit = temp;
        console.log(temp.data);
      } else {
        node = tempNode.right;
      }
    }
  }
  postOrder2() {
    if (!this.tree) return;
    let node = this.tree;
    const queue = [node];
    const result = []
    while(queue.length) {
        const tempNode = queue.pop()
        result.push(tempNode.data)
        if(tempNode.left) {
            queue.push(tempNode.left)
        }
        if(tempNode.right) {
            queue.push(tempNode.right)
        }
    }
    result.reverse().forEach((data) => console.log(data))
  }
}

function createNode(data) {
  return { data, left: null, right: null };
}


const a = new BinarySearchTree()
a.insert(2)
a.insert(3)
a.insert(1)
a.postOrder()
a.postOrder2()
