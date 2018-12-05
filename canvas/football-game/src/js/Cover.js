let Cover = Hilo.Class.create({
  Extends: Hilo.Container,
  // 天坑，不能使用ES6中的函数简写
  constructor: function (properties) {
    Cover.superclass.constructor.call(this, properties)
    this.init(properties)
    this.show(properties)
  },

  init (properties) {
    // iphone 6基准
    let titleBaseX = 750
    let titleBaseY = 1314

    // iphone 5基准
    let startBtnX = this.startBtnX = 640
    let startBtnY = this.startBtnY = 1136

    let readyBg = new Hilo.Bitmap({
      image: properties.readyBg,
      // 以视口宽高缩放
      scaleX: properties.width / properties.readyBg.width,
      scaleY: properties.height / properties.readyBg.height
    })
    let tips = new Hilo.Bitmap({
      id: 'tips',
      image: properties.tips
    })

    let title = new Hilo.Bitmap({
      id: 'title',
      image: properties.title,
      // 以6基准值缩放, 小屏手机缩小
      scaleX: properties.width / titleBaseX,
      scaleY: properties.height / titleBaseY
    })

    let startBtn = new Hilo.Sprite({
      id: 'startBtn',
      frames: properties.startBtn.getSprite('startBtn'),
      loop: false,
      interval: 60,
      timeBased: true,
      paused: true,
      // 以5的基准值缩放，大屏手机放大
      scaleX: properties.width / startBtnX,
      scaleY: properties.height / startBtnY
    })

    // 设置位置
    tips.x = this.width - tips.width - 30
    tips.y = 20
    title.x = this.width - title.width >> 1
    startBtn.x = this.width - (startBtn.width * startBtn.scaleX) >> 1
    startBtn.y = this.height + (startBtn.height * startBtn.scaleX * 1.8) >> 1

    this.addChild(readyBg, tips, title, startBtn)
  },
  show (properties) {
    this.visible = true
    let startBtn = this.getChildById('startBtn')
    // tips动画
    Hilo.Tween.to(this.getChildById('tips'), {
      scaleX: 1.1,
      scaleY: 1.1
    }, {
      duration: 800,
      loop: true,
      reverse: true
    })

    // title动画-->按钮动画
    Hilo.Tween.to(this.getChildById('title'),
      {
        y: 80
      }, {
      duration: 300,
      ease: Hilo.Ease.Quad.EaseIn,
    }).link(Hilo.Tween.to(this.getChildById('title'), {
      y: 20
    }, {
      duration: 200,
      delay: '+0',
      ease: Hilo.Ease.Circ.EaseOut,
    })).link(Hilo.Tween.to(this.getChildById('title'), {
      y: 30
    }, {
      duration: 200,
      delay: '+0'
    }))
      .link(Hilo.Tween.to(startBtn, {
      paused: false,
      scaleX: 0.8,
      scaleY: 0.8
    }, {
      duration: 30,
      delay: '+0'
    }))
      .link(Hilo.Tween.to(startBtn, {
      scaleX: 1.2,
      scaleY: 1.2
    }, {
      duration: 30,
      delay: '+0'
    })).link(Hilo.Tween.to(startBtn, {
      scaleX: properties.width / this.startBtnX,
      scaleY: properties.height / this.startBtnY
    }, {
      duration: 30,
      delay: '+0'
    }))
  },
  hide () {
    this.visible = false
  }
})
export default Cover