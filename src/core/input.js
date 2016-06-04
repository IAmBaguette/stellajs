var input = (function () {
    this.keys = [];
    this.keyPress = [];

    this.getKey = function (keyCode) {
        return this.keys[keyCode];
    };

    this.getKeyDown = function (keyCode) {
        return this.keyPress[keyCode];
    }
});