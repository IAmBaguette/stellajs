var input = (function () {
    this.keys = [];
    this.keyPress = [];
    this.axes = {};

    // options.positive: The button that will send a positive value to the axis.
    // options.negative: The button that will send a negative value to the axis.
    // options.gravity: How fast will the input recenter.
    // options.sensitivity: For keyboard input, a larger value will result in faster response time. A lower value will be more smooth.
    this.addAxe = function (key, options) {
        if (!this.axes.hasOwnProperty(key)) {
            options.value = 0;
            this.axes[key] = options;
        }
    };

    this.removeAxe = function (key) {
        if (this.axes.hasOwnProperty(key)) {
            delete this.axes[key];
        }
    };

    this.getAxis = function (key) {
        if (this.axes.hasOwnProperty(key)) {
            return this.axes[key].value;
        }
    }

    this.getKey = function (keyCode) {
        return this.keys[keyCode];
    };

    this.getKeyPress = function (keyCode) {
        return this.keyPress[keyCode];
    }
});