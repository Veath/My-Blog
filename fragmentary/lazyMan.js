/**
 * LazyMan('Jason').doSports('running').sleep(10).doSports('walking');
 */

function lazyMan(name) {
  const queue = [];

  queue.push(() => {
    console.log(name);
  });

  setTimeout(async () => {
    let fn;
    while ((fn = queue.shift())) {
      await fn();
    }
  }, 4);

  return {
    doSports(desc) {
      queue.push(() => console.log(desc));
      return this;
    },
    sleep(num) {
      queue.push(() => new Promise((r) => setTimeout(r, num * 1000)));
      return this;
    },
  };
}
