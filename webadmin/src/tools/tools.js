/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-extend-native */
// eslint-disable-next-line no-extend-native

Array.prototype.indexOf = function(val) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    const index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};