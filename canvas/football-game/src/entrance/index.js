import engine from '../js/hilo/hilo-standalone'
import Asset from '../js/Asset'
import Cover from '../js/Cover'
import Ready from '../js/Ready'
import Master from '../js/Master'
import Enemys from '../js/Enemys'
window.onload = function () {
  game.init()
}

let game = window.game = {
  width: 0,
  height: 0,

  asset: null,
  stage: null,
  ticker: null,
  state: null,
  score: 0,

  bg: null,
  ground: null,
  bird: null,
  holdbacks: null,
  gameReadyScene: null,

  init () {
    this.asset = new Asset()
    this.asset.on('complete', () => {
      this.asset.off('complete')
      this.initStage()
    })
    this.asset.load()
  },
  initStage () {
    console.log('game init')
    let renderType = 'canvas'
    this.width = Math.min(innerWidth, 450) * 2
    this.height = Math.min(innerHeight, 750) * 2
    this.scale = 0.5
    this.stage = new Hilo.Stage({
      renderType: renderType,
      width: this.width,
      height: this.height,
      scaleX: this.scale,
      scaleY: this.scale
    })
    document.body.appendChild(this.stage.canvas)

    this.ticker = new Hilo.Ticker(60)
    this.ticker.addTick(Hilo.Tween)
    this.ticker.addTick(this.stage)
    this.ticker.start(true)

    this.initBackground()
    this.initScenes()
    this.initEnemys()
    this.initMaster()
    this.initTime()
    this.initUser()
    this.initMusic()

    this.stage.enableDOMEvent(Hilo.event.POINTER_START, true)
    this.stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true)
    // this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this))
    this.stage.on(Hilo.event.POINTER_MOVE, this.onUserInput.bind(this))
    this.stage.onUpdate = this.onUpdate.bind(this)
  },
  initBackground () {
    let bgImg = this.asset.bg
    // 一块背景的高度
    let pieceBgHeight = 505
    // 背景图
    this.bg = new Hilo.Bitmap({
      id: 'bg',
      image: bgImg,
      scaleX: this.width / bgImg.width,
      scaleY: (this.height + pieceBgHeight) / bgImg.height
    }).addTo(this.stage)
    // 设置背景y轴坐标
    this.bg.y = -pieceBgHeight * this.bg.scaleY
    // 移动背景
    this.backgroundAnimation = Hilo.Tween.to(this.bg, {
      y: 0,
    }, {
      duration: 1500,
      loop: true
    })
    this.backgroundAnimation.pause()
  },
  initScenes () {
    // 封面场景
    this.gameCoverScene = new Cover({
      id: 'coverScene',
      width: this.width,
      height: this.height,
      readyBg: this.asset.readyBg,
      tips: this.asset.tips,
      title: this.asset.title,
      startBtn: this.asset.startBtn
    }).addTo(this.stage)

    // 准备场景
    this.gameReadyScene = new Ready({
      id: 'readyScene',
      width: this.width,
      height: this.height,
      visible: false
    }).addTo(this.stage)

    this.gameCoverScene.getChildById('startBtn').on(Hilo.event.POINTER_START, (e) => {
      this.userShow()
      this.timeShow()
      this.master.visible = true
      this.gameCoverScene.hide()
      this.gameReadyScene.show(this.timeValue.y + this.timeValue._fontHeight)
    })

    this.gameReadyScene.on(Hilo.event.POINTER_START, (e) => {
      this.startTime = Date.now()
      this.gameReadyScene.hide()
      this.backgroundAnimation.start()
      this.musiceShow()
      this.master.play()
      this.enemys.visible = true
      this.enemys.move(this.master.x + this.master.width / 2, this.master.y + this.master.height / 3, this.master.x, this.master.y, this.master.width, this.master.height)
      this.state = 'playing'
    })
  },
  initUser () {
    let baseWidth = 750
    let faceWH = 130
    let scale = this.width / baseWidth
    this.userFace = new Hilo.Graphics({
      width: faceWH,
      height: faceWH,
      x: 20,
      y: 20,
      scaleX: scale,
      scaleY: scale,
      visible: false
    })
    this.userFace.lineStyle(10, '#9e9e9e').beginBitmapFill(this.asset.avatar, 'no-repeat')
      .drawRoundRect(0, 0, this.userFace.width, this.userFace.height, this.userFace.width / 2)
      .endFill()
      .addTo(this.stage)
  },
  userShow () {
    this.userFace.visible = true
  },
  initMaster () {
    let baseWidth = this.baseWidth = 750
    let scale = this.width / baseWidth
    this.master = new Master({
      id: 'master',
      atlas: this.asset.master,
      scaleX: scale,
      scaleY: scale,
      enemys: this.enemys
    }).addTo(this.stage)
    this.master.x = (this.width - this.master.width) >> 1
    this.master.y = (this.height / 2 + this.master.height) >> 1
  },
  initEnemys () {
    this.enemys = new Enemys({
      id: 'enemys',
      atlas: this.asset.enemy,
      width: this.width,
      height: this.height,
      visible: false
    }).addTo(this.stage)
  },
  initMusic () {
    let switchs = true
    let onPosition = [0, 0, 80, 80]
    let offPosition = [0, 80, 80, 80]
    let image = this.asset.musicIcon
    this.musicIcon = new Hilo.Bitmap({
      id: 'musicIcon',
      image,
      rect: switchs ? offPosition : onPosition,
      pivotX: 40,
      pivotY: 40,
      x: this.width - image.width - 10 + 40,
      y: 10 + 40,
      visible: false,
    }).addTo(this.stage)

    this.musicAnimation = Hilo.Tween.to(this.musicIcon, {
      rotation: 360
    }, {
      duration: 1000,
      loop: true
    })
    switchs ? this.musicAnimation.start() : this.musicAnimation.pause()

    this.musicIcon.on(Hilo.event.POINTER_START, (e) => {
      switchs = !switchs
      if (switchs) {
        this.musicIcon.setImage(image, offPosition)
        this.musicAnimation.start()
      } else {
        this.musicIcon.setImage(image, onPosition)
        this.musicAnimation.pause()
        this.musicIcon.rotation = 0
      }
      console.log(switchs ? 'on' : 'off')
    })
  },
  musiceShow () {
    this.musicIcon.visible = true
  },
  initTime () {
    let baseWidth = this.baseWidth = 750
    let scale = this.width / baseWidth
    let content = '时间'
    this.time = 0
    this.timeKey = new Hilo.Text({
      font: `${36 * scale}px Arial,sans-serif`,
      text: content,
      lineSpacing: 0,
      width: this.width,
      maxWidth: this.width,
      lineSpacing: 10 * scale,
      color: '#fff',
      y: 20 * scale,
      textAlign: 'center',
      visible: false,
    }).addTo(this.stage)

    this.timeValue = new Hilo.Text({
      font: `bold ${60 * scale}px Arial,sans-serif`,
      text: this.time.toFixed(2),
      lineSpacing: 0,
      width: this.width,
      maxWidth: this.width,
      lineSpacing: 10 * scale,
      color: '#fff',
      y: this.timeKey._fontHeight + this.timeKey.y,
      textAlign: 'center',
      visible: false,
    }).addTo(this.stage)
  },
  timeShow () {
    this.timeKey.visible = true
    this.timeValue.visible = true
  },
  onUpdate () {
    if (this.state === 'playing') {
      this.now = Date.now()
      this.currentTime = this.now - this.startTime
      if (this.currentTime > 200) {
        this.timeValue.text = (+this.timeValue.text + this.currentTime / 1000).toFixed(2)
        this.startTime = this.now
      }

      // if (this.enemys.isCollision) {
      //   this.gameOver()
      // }

      if (this.enemys.checkCollision(this.master)) {
        this.gameOver()
      }
    }
  },
  onUserInput (e) {
    if (this.state === 'playing') {
      let x = e.stageX
      let y = e.stageY
      let minOffsetX = 0
      let minOffsetY = 0

      let maxOffsetX = this.width - this.master.width
      let maxoffsetY = this.height - this.master.height

      let offsetX = x - this.master.width / 2
      let offsetY = y - this.master.height / 2

      if (offsetX > maxOffsetX) {
        offsetX = maxOffsetX
      } else if (offsetX < minOffsetX) {
        offsetX = minOffsetX
      }

      if (offsetY > maxoffsetY) {
        offsetY = maxoffsetY
      } else if (offsetY < minOffsetY) {
        offsetY = minOffsetY
      }
      this.master.move(offsetX, offsetY)
    }
  },
  gameOver () {
    if (this.state !== 'over') {
      this.state = 'over'
      this.master.paused = true
    }
  }
}
document.querySelector('body').addEventListener('touchstart', (ev) => {
  game.state === 'playing' && event.preventDefault()
})