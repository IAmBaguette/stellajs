var input = (function () {
    this.keys = [];
    this.keyPress = [];

    this.getKey = function (keyCode) {
        return this.keys[keyCode];
    };

    this.getKeyPress = function (keyCode) {
        return this.keyPress[keyCode];
    }
});
var DEBUG_MODE = 1;

var app = (function (canvas) {
    var self = this;
    var canvas = canvas;
    var ctx = canvas.getContext("2d");
    this.fps = 60;
    this.state = undefined;
    this.states = {};

    this.add = function (key, state) {
        if (!this.states.hasOwnProperty(key)) {
            this.states.key = state;
        }
    };

    this.remove = function (key) {
        if (this.states.hasOwnProperty(key)) {
            delete this.states.key;
        }
    }

    this.set = function (key) {
        this.state = new this.states.key(self);
    };

    this.input = new input();

    this.start = function () {
        window.onresize = function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            self.draw();
        };

        window.onresize();
        canvas.focus();

        canvas.addEventListener("keydown", function (e) {
            if (!self.input.keys[e.keyCode]) {
                self.input.keyPress[e.keyCode] = true;
            }
            self.input.keys[e.keyCode] = true;

            if (DEBUG_MODE) {
                if (self.input.getKeyPress(e.keyCode)) {
                    var log = "";
                    for (var attr in Keyboard) {
                        if (Keyboard[attr] == e.keyCode) {
                            log += "Keyboard." + attr + ": ";
                        }
                    }
                    log += e.keyCode;
                    console.log(log);
                }
            }
        });

        canvas.addEventListener("keyup", function (e) {
            self.input.keys[e.keyCode] = false;
        });

        loop();
    };

    var loop = function () {
        setTimeout(function () {
            // Drawing code goes here
            self.update();
            self.draw();

            requestAnimationFrame(loop);
        }, 1000 / this.fps);
    };

    this.update = function () {
        this.state.update();

        // reset keys
        this.input.keyPress = [];
    };

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.state.draw(ctx);
    };
});

var Keyboard = {
    Up: 38
};