let Enemys = Hilo.Class.create({
  Extends: Hilo.Container,
  constructor: function (properties) {
    Enemys.superclass.constructor.call(this, properties)
    // 敌人总数
    this.numEnemy = 1
    this.currentNum = 3
    this.currentAnimationsTime = 1
    this.createEnemys(properties.atlas)
  },
  createEnemys (atlas) {
    let baseWidth = this.baseWidth = 750
    let scale = this.baseScale = this.width / baseWidth
    let self = this
    this.atlas = atlas
    for (let i = 0; i < this.numEnemy; i++) {
      let enemys = new Hilo.Sprite({
        id: `enemy-${i}`,
        frames: [
          {image:atlas, rect: [0, 0, 74, 128], name:'move-1'},
          {image:atlas, rect: [0, 128, 74, 128], name:'move-2', next: 'move-1'},
          {image:atlas, rect: [0, 256, 74, 128], name:'attack'}
        ],
        interval: 6,
        scaleX: scale,
        scaleY: scale,
        onUpdate () {
          if(self.getChildById(`enemy-${i}`) && self.getChildById(`enemy-${i}`).attack){
            this.goto('attack')
          }
        }
      }).addTo(this)
      enemys.pivotX = enemys.width / 2
      enemys.pivotY = enemys.height / 2
      enemys.x = Math.random() > 0.5 ? -(enemys.width + enemys.pivotX) * scale : (this.width + enemys.pivotX)
      enemys.y = this.height / 2 * Math.random()
    }
  },
  resetEnemy (target) {
    target.attack = false
    target.rotation = 0
    target.x = Math.random() > 0.5 ? -target.width * 2 * this.baseScale : this.width + target.width * 2 * this.baseScale
    target.y = this.height / 2 * Math.random()

  },
  attack (x, y, target, direction, deg) {
    if (!target.attack) {
      target.attack = true
      target.moveToX = x
      target.moveToY = y
      target.direction = direction
      target.degNumber = deg
    }
    if (target.x > this.width * 1.5 || target.x < -target.x || target.y > this.height * 1.5 || target.y < -target.y) {
      this.resetEnemy(target)
      return
    }
    let angle = Math.atan((target.y - target.moveToY) / (target.x - target.moveToX))
    let speed = 15
    let stepX = target.direction * speed * Math.cos(angle)
    let stepY = target.direction * speed * Math.sin(angle)
    target.rotation = target.degNumber - 90
    target.x += stepX
    target.y += stepY
  },
  move (moveToX, moveToY, masterX, masterY, masterWidth, masterHeight) {
    this.moveToX = moveToX
    this.moveToY = moveToY
    this.masterX = masterX
    this.masterY = masterY
    this.masterWidth = masterWidth
    this.masterHeight = masterHeight
  },
  onUpdate(time) {
    if (this.moveToX === undefined) {
      return
    }
    let i = 0
    let degNumber = this.trace(Math.atan2((this.moveToY - this.getChildById(`enemy-${i}`).y), (this.moveToX - this.getChildById(`enemy-${i}`).x)))
    let currentAnimationsTime = this.checkPointAngle(degNumber)
    // angel为一个角度，已弧度值表示
    let angle = Math.atan((this.getChildById(`enemy-${i}`).y - this.moveToY) / (this.getChildById(`enemy-${i}`).x - this.moveToX))
    let r = Math.abs((this.getChildById(`enemy-${i}`).y - this.moveToY) / Math.sin(angle))
    let speed = Math.max(time * r / 1000, 6)
    let stepX = currentAnimationsTime * speed * Math.cos(angle)
    let stepY = currentAnimationsTime * speed * Math.sin(angle)
    // if (this.checkCollision({x: this.masterX, y: this.masterY, width: this.masterWidth, height: this.masterHeight})) {
    //   this.isCollision = true
    // }
    if (this.isCollision) {
      this.getChildById(`enemy-${i}`).attack = true
      // this.getChildById(`enemy-${i}`).rotation = degNumber - 90
      return
    }
    if (r <= 300 || this.getChildById(`enemy-${i}`).attack) {
      this.attack(this.moveToX, this.moveToY, this.getChildById(`enemy-${i}`), currentAnimationsTime, degNumber)
    } else if (!this.getChildById(`enemy-${i}`).attack) {
      this.getChildById(`enemy-${i}`).x += stepX
      this.getChildById(`enemy-${i}`).y += stepY
    }
  },
  // 输入弧度值，求出角度值
  trace (x) {
    // 弧度 = 角度 * Math.PI / 180
    return 180 * x / Math.PI
  },
  checkPointAngle (angle) {
    let currentAnimationsTime
    this.currentAnimationsTime = Math.abs(this.currentAnimationsTime)
    // 右上方
    if (angle > 0 && angle > 90) {
      currentAnimationsTime = -this.currentAnimationsTime
      // 左上方
    } else if (angle > 0) {
      currentAnimationsTime = this.currentAnimationsTime
      // 左下方
    } else if (angle > -90 ) {
      currentAnimationsTime = this.currentAnimationsTime
      // 右下方
    } else {
      currentAnimationsTime = -this.currentAnimationsTime
    }
    return currentAnimationsTime
  },
  // 检测碰撞
  hitTestObject: function(master, object){
    // enemy只用了pivotX pivotY偏移坐标,所以检测时以偏移后的坐标计算
    let b1 = this.scaleTo(master, 0.5),
      b2 = object,
      hit = b1.x <= b2.x - b2.pivotX + b2.width && b2.x - b2.pivotX <= b1.x + b1.width &&
        b1.y <= b2.y - b2.pivotY + b2.height && b2.y - b2.pivotY <= b1.y + b1.height;
    return !!hit;
  },
  checkCollision (master) {
    for (let i = 0, len = this.children.length; i < len; i++) {
      if (master.hitTestObject(this.children[i], true)) {
        this.isCollision = true
        return true
      }
      return false
    }
  },
  scaleTo (target, num) {
    let obj = {}
    let scale = num
    let offsetScale = 1 - num
    obj.x = target.x + target.width * offsetScale / 2
    obj.y = target.y + target.height * offsetScale / 2
    obj.width = target.width * scale
    obj.height = target.height * scale
    return obj
  }
})

export default Enemys