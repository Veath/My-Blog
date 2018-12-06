class Dichotomy {
    constructor () {
        this.root = null;    
    }
    insert (number) {
        const newItem = new Item(number);
        if (!this.root) {
            this.root = newItem;
        } else {
            insertItem(this.root, newItem);
        }
    }
    findMin() {
        return minItem(this.root);
    }
    search(number) {
        return searchItem(this.root, number);
    }
    remove(key) {
        removeItem(this.root, key);
    }
    middleOrder () {
        middleOrderItem(this.root);
    }
    previousOrder () {
        previousOrderItem(this.root);
    }
    blackOrder() {
        blackOrderItem(this.root);
    }
}

class Item {
    constructor (number) {
        this.key = number;
        this.right = null
        this.left = null;
    }
}

function insertItem(node, children) {
    if (node.key >= children.key) {
        if (!node.left) {
            node.left = children;
        } else {
            insertItem(node.left, children);
        }
    } else {
        if (!node.right) {
            node.right = children;
        } else {
            insertItem(node.right, children);
        }
    }
}

function middleOrderItem(node) {
    if (!!node) {
        middleOrderItem(node.left);
        console.log(node);
        middleOrderItem(node.right);
    }
}

function previousOrderItem(node) {
    if (!!node) {
        console.log(node.key);
        previousOrderItem(node.left);
        previousOrderItem(node.right);
    }
}

function blackOrderItem(node) {
    if (!!node) {
        blackOrderItem(node.left);
        blackOrderItem(node.right);
        console.log(node.key);
    }
}

function minItem(node) {
    if (!!node) {
        while(node.left) {
            node = node.left;
        }
        return node;
    }
}

function searchItem(root, number) {
    if (root) {
        if (root.key === number) {
            return true;
        } else if (root.key > number) {
            return searchItem(root.left, number);
        } else {
            return searchItem(root.right, number);
        }
    }
}

function removeItem(root, number) {
    if (root) {
        if(number < root.key) {
            root.left = removeItem(root.left, number);
            return root;
        } else if (number > root.key) {
            root.right = removeItem(root.right, number);
            return root;
        } else {
            if (!root.left && !root.right) {
                root = null;
                return root;
            } 
            if (!root.left) {
                root = root.right;
                return root;
            } 
            if (!root.right) {
                root = root.left;
                return root;
            }
             //需要移除的节点包含两个子节点
             var aux = minItem(root.right)
             root.key = aux.key
             root.right = removeNode(root.right, axu.key)
             return root
        }
    }
}
