let Asset = Hilo.Class.create({
  Mixes: Hilo.EventMixin,
  queue: null,
  bg: null,
  ground: null,
  ready: null,
  over: null,

  load () {
    // todo
    let resources = [
      {id: 'bg', src: 'http://10.14.21.37:3000/static/bg.png'},
      {id: 'readyBg', src: 'http://10.14.21.37:3000/static/readyBg.png'},
      {id: 'tips', src: 'http://10.14.21.37:3000/static/tips.png'},
      {id: 'title', src: 'http://10.14.21.37:3000/static/title.png'},
      {id: 'startBtn', src: 'http://10.14.21.37:3000/static/startBtn.png'},
      {id: 'avatar', src: 'http://10.14.21.37:3000/static/avatar.jpg'},
      {id: 'musicIcon', src: 'http://10.14.21.37:3000/static/music.png'},
      {id: 'master', src: 'http://10.14.21.37:3000/static/master.png'},
      {id: 'enemy', src: 'http://10.14.21.37:3000/static/enemy.png'}
    ]

    // 资源队列
    this.queue = new Hilo.LoadQueue()
    this.queue.add(resources)
    this.queue.on('load', this.onLoad.bind(this))
    this.queue.on('complete', this.onComplete.bind(this))
    this.queue.start()
  },
  onLoad () {
    // 加载进度
    console.log('loading...' + (this.queue.getLoaded() / this.queue.getTotal() * 100).toFixed(2) + '%')
  },
  onComplete () {
    // 全部加载完成输出内容
    this.bg = this.queue.get('bg').content
    this.readyBg = this.queue.get('readyBg').content
    this.tips = this.queue.get('tips').content
    this.title = this.queue.get('title').content
    this.avatar = this.queue.get('avatar').content
    this.musicIcon = this.queue.get('musicIcon').content
    this.enemy = this.queue.get('enemy').content

    // 输入开始按钮精灵图
    this.startBtn = new Hilo.TextureAtlas({
      image: this.queue.get('startBtn').content,
      // 每一帧 x, y, w, h
      frames: [
        [0, 0, 232, 98],
        [0, 98, 232, 98],
        [0, 195, 232, 98]
      ],
      sprites: {
        startBtn: [0, 1, 2, 1, 2, 1, 2, 1, 2, 0]
      }
    })
    this.master = new Hilo.TextureAtlas({
      image: this.queue.get('master').content,
      frames: [
        [0, 0, 74, 152],
        [0, 152, 74, 152]
      ],
      sprites: {
        master: [0, 1]
      }
    })

    this.queue.off('complete')
    this.fire('complete')
  }
})

export default Asset