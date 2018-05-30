let Master = Hilo.Class.create({
  Extends: Hilo.Sprite,
  paused: true,
  visible: false,
  interval: 6,
  stopMove: false,
  constructor: function (properties) {
    Master.superclass.constructor.call(this, properties)
    this.init(properties)
  },
  init (properties) {
    this.addFrame(properties.atlas.getSprite('master'))
    this.enemys = properties.enemys
  },
  move (x, y) {
    this.moveToX = x
    this.moveToY = y
  },
  onUpdate (time) {
    if (this.paused || this.moveToX === undefined) {
      return
    }
    let degNumber = this.trace(Math.atan2((this.moveToY - this.y), (this.moveToX - this.x)))
    let currentAnimationsTime = this.checkPointAngle(degNumber)

    let angle = Math.atan((this.y - this.moveToY) / (this.x - this.moveToX))
    let r = Math.abs((this.y - this.moveToY) / Math.sin(angle))
    if (r < 6) return
    this.enemys.move(this.x + this.width / 2, this.y + this.height / 3, this.x, this.y, this.width, this.height)
    let speed = Math.max(time * r / 200, 6)
    let stepX = currentAnimationsTime * speed * Math.cos(angle)
    let stepY = currentAnimationsTime * speed * Math.sin(angle)
    this.x += stepX
    this.y += stepY

  },
  trace (x) {
    // 弧度 = 角度 * Math.PI / 180
    return 180 * x / Math.PI
  },
  checkPointAngle (angle) {
    let currentAnimationsTime = 1
    // 右上方
    if (angle > 0 && angle > 90) {
      currentAnimationsTime = -currentAnimationsTime
      // 左上方
    } else if (angle > 0) {
      currentAnimationsTime = currentAnimationsTime
      // 左下方
    } else if (angle > -90 ) {
      currentAnimationsTime = currentAnimationsTime
      // 右下方
    } else {
      currentAnimationsTime = -currentAnimationsTime
    }
    return currentAnimationsTime
  },
})

export default Master