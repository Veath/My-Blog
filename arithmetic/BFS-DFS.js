// 模拟Dom深度遍历
const DFS = (node) => {
    if (!node) {
        return;
    }
    let deep = arguments[1] || 1;
    console.log(`${node.name}.${node.classList} ${deep}`);
    if (!node.children.length) {
        return;
    }
    Array.from(node.children).forEach(item => DFS(item, deep + 1));
}

// 模拟Dom广度遍历
const BFS = (root) => {
    if (!root) {
        return;
    }
    let queue = [{
        item: root,
        depth: 1,
    }];

    while (queue.length) {
        let node = queue.shift();
        console.log(`${node.item.nodeName}.${node.item.classList} ${node.depth}`);
        if (!node.item.children.length) {
            return;
        }
        Array.from(node.item.children).forEach(item => {
            queue.push({
                item,
                depth: node.depth++
            })
        });
    }
}