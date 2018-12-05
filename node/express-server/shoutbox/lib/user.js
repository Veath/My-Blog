const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
    constructor(obj) {
        for (const key in obj) {
            this[key] = obj[key];
        }
    }
    save(fn) {
        if (this.id) {
            this.update(fn);
        } else {
            // 创建递增Id
            db.incr('user:ids', (err, id) => {
                if (err) return fn(err);
                this.id = id;
                this.hashPassword(err => {
                    if (err) return fn(err);
                    this.update(fn);
                })
            });
        }
    }
    update(fn) {
        db.set('user:id:' + this.name, this.id, (err) => {
            if (err) return fn(err);
            db.hmset('user:' + this.id, this, (err) => fn(err));
        });
    }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
        }
    }
    hashPassword(fn) {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return fn(err);
            this.salt = salt;
            bcrypt.hash(this.pass, salt, (err, hash) => {
                if (err) return fn(err);
                this.pass = hash;
                fn();
            });
        })
    }
    static authenticate(name, pass, fn) {
        User.getByName(name, (err, user) => {
            if (err) return fn(err);
            if (!user.id) return fn();
            bcrypt.hash(pass, user.salt, (err, hash) => {
                if (err) return fn(err);
                if (hash === user.pass) return fn(null, user);
                fn();
            });
        });
    }
    static getByName(name, fn) {
        User.getId(name, (err, id) => {
            if (err) return fn(err);
            this.get(id, fn);
        });
    }
    static getId(name, fn) {
        db.get('user:id:' + name, fn);
    }
    static get(id, fn) {
        db.hgetall('user:' + id, (err, user) => {
            console.log(user);
            fn(null, new User(user));
        });
    }
}

module.exports = User;