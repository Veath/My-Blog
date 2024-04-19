/**
 * 
 * const fn1 = (... args)=>console.log('I want sleep1', ... args)
const fn2 = (... args)=>console.log('I want sleep2', ... args)
const event = new Events();
event.on('sleep', fn1, 1, 2, 3);
event.on('sleep', fn2, 1, 2, 3);
event.fire('sleep', 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off('sleep', fn1);
event.once('sleep', ()=>console.log('I want sleep));
event.fire('sleep');
 */

class Events {
  constructor() {
    this.events = new Map();
  }
  on(name, cb, ...args) {
    const list = this.events.get(name) || new Set();
    list.add(cb);
    cb.__args__ = args;
    this.events.set(name, list);
  }

  fire(name, ...args) {
    const fns = this.events.get(name);
    for (let fn of fns) {
      fn(...fn.__args__, ...args);
    }
  }

  off(name, fn) {
    const fns = this.events.get(name);

    if (fns) {
      fns.delete(fn);
    }
  }

  once(name, cb, ...args) {
    const fn = (...params) => {
      cb(...params);
      this.off(name, fn);
    };

    this.on(name, fn, ...args);
  }
}
