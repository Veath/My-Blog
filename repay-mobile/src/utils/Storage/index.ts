type Key = string;
type Value = string | {[x: string]: any}

const Storage = {

    /** localStorage Start */
    setLocal: function setLocal(key: Key, value: Value) {
        return Storage.setItem(window.localStorage, key, JSON.stringify(value));
    },
    getLocal: function getLocal(key: Key) {
        return Storage.getItem(window.localStorage, key);
    },
    removeLocal: function removeLocal(key: Key) {
        return Storage.removeItem(window.localStorage, key);
    },
    clearLocal: function clearLocal() {
        return Storage.clear(window.localStorage);
    },

    /** localStorage End */

    /** sessionStorage Start */
    setSession: function setSession(key: Key, value: Value) {
        return Storage.setItem(window.sessionStorage, key, JSON.stringify(value));
    },
    getSession: function getSession(key: Key) {
        let data = Storage.getItem(window.sessionStorage, key);
        return (!!data && JSON.parse(data)) || data;
    },
    removeSession: function removeSession(key: Key) {
        return Storage.removeItem(window.sessionStorage, key);
    },
    clearSession: function clearSession() {
        return Storage.clear(window.sessionStorage);
    },

    /** sessionStorage End */

    setItem: function setItem(storage: Storage, key: Key, value: string) {
        if (!Storage.test(storage)) return false;

        storage.setItem(key, value);

        return true;
    },
    getItem: function getItem(storage: Storage, key: Key) {
        if (!Storage.test(storage)) return false;

        return storage.getItem(key);
    },
    removeItem: function removeItem(storage: Storage, key: Key) {
        if (!Storage.test(storage)) return false;

        return storage.removeItem(key);
    },
    clear: function clear(storage: Storage) {
        if (!Storage.test(storage)) return false;

        storage.clear();

        return true;
    },
    test: function test(storage: Storage) {
        let hasStorage = !!storage;
        if (hasStorage) {
            try {
                storage.setItem('key', 'value');
                storage.removeItem('key');
                return true;
            } catch (e) {
                return false;
            }
        } else {
            return false;
        }
    }
};


export default Storage;