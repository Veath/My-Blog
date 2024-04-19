class SkipList {
    constructor() {
        this.maxLevel = 16
        this.levelCount = 1
        this.head = createNode()
    }
    find(value) {
        let p = this.head
        for(let i = this.levelCount - 1; i >=0; i--) {
            while(p.forward[i] != null && p.forward[i].data < value) {
                p = p.forward[i]
            }
        }
        if (p.forward[0] != null && p.forward[0].data === value) return p.forward[0]
    }
    insert(value) {
        let p = this.head
        const level = randomLevel(this.maxLevel)
        const newNode = createNode(value, level)
        const update = new Array(this.maxLevel).fill(p)

        for(let i = level - 1; i >= 0; i--) {
            while(p.forward[i] != null && p.forward[i].data < value) {
                p = p.forward[i]
            }

            update[i] = p
        }

        for(let i = level - 1; i >= 0; i--) {
            newNode.forward[i] = update[i].forward[i]
            update[i].forward[i] = newNode
        }

        if (this.levelCount < level) this.levelCount = level
    }
    
    delete(value) {
        let p = this.head
        const update = new Array(this.levelCount).fill(p)
        for(let i = this.levelCount - 1; i >= 0; i--) {
            while(p.forward[i] != null && p.forward[i].data < value) {
                p = p.forward[i]
            }

            update[i] = p
        }

        if (p.forward[0] != null && p.forward[0].data !== value) return 
        for(let i = this.levelCount - 1; i>= 0; i--) {
            if( update[i].forward[i] != null && update[i].forward[i].data === value) {
                update[i].forward[i] =  update[i].forward[i].forward[i]
            }
        }

        while(this.levelCount > 1 && this.head.forward[this.levelCount] == null) {
            this.levelCount--
        }
    }
}

function createNode(value, level) {
  return { data: value, forward: [], maxLevel: level };
}


function randomLevel(maxLevel) {
    let level = 1
    while(Math.random() > 0.5 && level < maxLevel) {
        level++
    }

    return level
}

const skipList = new SkipList()
skipList.insert(1)
skipList.insert(2)
skipList.insert(5)
skipList.insert(3)
// skipList.delete(3)
console.log(skipList.head)