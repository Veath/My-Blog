let Ready = Hilo.Class.create({
  Extends: Hilo.Container,
  constructor: function (properties) {
    Ready.superclass.constructor.call(this, properties)
    this.init(properties)
  },
  init (properties) {
    // iphone 6基准
    let baseWidth = this.baseWidth = 750

    let blackMask = new Hilo.View({
      id: 'blackMask',
      width: this.width,
      height: this.height,
      alpha: 0.6,
      background: '#000'
    })

    let scale = this.width / baseWidth
    let content = '长按并拉动角色进行移动'
    let fontStyle = `bold ${45 * scale}px Arial,sans-serif`

    let textTips = new Hilo.Text({
      id: 'textTips',
      font: fontStyle,
      text: content,
      lineSpacing: 0,
      width: this.width,
      maxWidth: 320 * scale,
      height: 100 * scale,
      lineSpacing: 10 * scale,
      color: '#fff',
      textAlign: 'center'
    })
    textTips.y = textTips._fontHeight * 2 + 20

    let btnWidth = 300
    let btnHeight = 100
    let readyBtnBorder = new Hilo.Graphics({
      width: btnWidth * scale,
      height: btnHeight * scale,
      x: (this.width - btnWidth * scale) >> 1,
      y: (this.height - btnHeight + 100 * scale) >> 1
    })
    readyBtnBorder.lineStyle(5, '#fff').drawRoundRect(0, 0, btnWidth * scale, btnHeight * scale, 10).endFill()

    let readyBtn = new Hilo.Text({
      id: 'playing',
      font: fontStyle,
      text: '我知道了',
      color: '#fff',
      width: this.width,
      textAlign: 'center',
    })
    // 使用readyBtnBorder.y + 按钮高度空隙 / 2
    readyBtn.y = readyBtnBorder.y + (btnHeight * scale - readyBtn._fontHeight) / 2

    this.addChild(blackMask, textTips, readyBtn, readyBtnBorder)
  },
  show (offsetY) {
    this.visible = true
    this.getChildById('textTips').y = offsetY
  },
  hide () {
    this.visible = false
    this.getChildById('blackMask').alpha = 0
  }
})

export default Ready