const EventEmitter = require('events');
const fs = require('fs');

const watchDir = './watch';
const processedDir = './done';

class Watch extends EventEmitter {
    constructor(watchDir, processedDir) {
        super();
        this.watchDir = watchDir;
        this.processedDir = processedDir;
    }
    watch() {
        fs.readdir(this.watchDir, (err, files) => {
            if (err) throw err;
            for (const index in files) {
                this.emit('process', files[index]);
            }
        });
    }
    start() {
        fs.watchFile(watchDir, () => this.watch());
    }
}

const watcher = new Watch(watchDir, processedDir);
watcher.on('process', function(file) {
    const watchFile = this.watchDir + '/' + file;
    const processedFile = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, (err) => {
        if (err) throw err;
    });
});

watcher.start();