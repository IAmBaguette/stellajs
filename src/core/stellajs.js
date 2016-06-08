var DEBUG_MODE = 1;

var app = (function (canvas) {
    var self = this;
    var canvas = canvas;
    var ctx = canvas.getContext("2d");

    // add new state
    this.add = function (key, state) {
        if (!this.states.hasOwnProperty(key)) {
            this.states[key] = state;
        }
    };
    // remove existing state
    this.remove = function (key) {
        if (this.states.hasOwnProperty(key)) {
            delete this.states[key];
        }
    }
    // set state before start
    this.set = function (key) {
        this.state = new this.states[key](self);
    };
    // canvas/screen width & height
    this.getScreenSize = function () {
        return { width: canvas.width, height: canvas.height };
    };
    // update canvas size
    this.resizeCanvas = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    this.init = function () {
        this.fps = 60;
        this.state = undefined;
        this.states = {};
        this.input = new input();
        // update size
        this.resizeCanvas();

        window.onresize = function () {
            self.resizeCanvas();
            self.draw();
        };

        canvas.addEventListener("keydown", function (e) {
            if (!self.input.keys[e.keyCode]) {
                self.input.keyPress[e.keyCode] = true;
            }
            self.input.keys[e.keyCode] = true;

            if (DEBUG_MODE) {
                if (self.input.getKeyPress(e.keyCode)) {
                    var log = "";
                    for (var attr in KeyCode) {
                        if (KeyCode[attr] == e.keyCode) {
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
    };

    this.start = function () {
        canvas.focus();

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

        for (var key in this.input.axes) {
            var axe = this.input.axes[key];
            if (this.input.getKey(axe.positive)) {
                axe.value = clamp(axe.value - axe.sensitivity, -1, 0);
            } else if (this.input.getKey(axe.negative)) {
                axe.value = clamp(axe.value + axe.sensitivity, 0, 1);
            } else {
                if (axe.value > 0) {
                    axe.value = clamp(axe.value - axe.gravity, 0, 1);
                } else if (axe.value < 0) {
                    axe.value = clamp(axe.value + axe.gravity, -1, 0);
                } else {
                    axe.value = 0;
                }
            }
        }
    };

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.state.draw(ctx);
    };

    // call init after everything is loaded
    this.init();
});