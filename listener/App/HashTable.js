class HashTable{
    constructor() {
        this.size = 0;
        this.entry = new Object();
    }

    Add(key, value) {
        if (!this.containsKey(key)) {
            this.size++;
        }
        this.entry[key] = value;
    };

    getValue(key) {
        return this.containsKey(key) ? this.entry[key] : null;
    };

    remove(key) {
        if (this.containsKey(key) && (delete this.entry[key])) {
            this.size--;
        }
    };

    containsKey(key) {
        return (key in this.entry);
    };

    containsValue(value) {
        for (var prop in this.entry) {
            if (this.entry[prop] == value) {
                return true;
            }
        }
        return false;
    };

    getValues() {
        var values = new Array();
        for (var prop in this.entry) {
            values.push(this.entry[prop]);
        }
        return values;
    };

    getKeys() {
        var keys = new Array();
        for (var prop in this.entry) {
            keys.push(prop);
        }
        return keys;
    };

    getSize() {
        return this.size;
    };

    clear() {
        this.size = 0;
        this.entry = new Object();
    };
}

module.exports = HashTable;