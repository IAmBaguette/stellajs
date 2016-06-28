var DEBUG_MODE = 1;
var DEBUG_ANIMATING = 0;

var app = (function (canvas, options) {
    var self = this;
    var canvas = canvas;
    var options = options || {};
    options.width = options.width || 800;
    options.height = options.height || 600;
    var ctx = canvas.getContext("2d");
    var startTime = 0;

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
        if (options.fullScreen) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = options.width;
            canvas.height = options.height;
        }
    };

    var init = function () {
        self.fps = 60;
        self.state = undefined;
        self.states = {};
        self.loader = new Loader(loaded);
        self.animates = new animates();
        self.input = new Input();
        // update size
        self.resizeCanvas();

        window.onresize = function () {
            self.resizeCanvas();
            draw();
        };

        canvas.addEventListener("mousemove", function (e) {
            self.input.mousePosition.set(e.offsetX, e.offsetY);
        });

        canvas.addEventListener("mousedown", function (e) {
            if (!self.input.buttons[e.button]) {
                self.input.buttonPress[e.button] = true;
            }
            self.input.buttons[e.button] = true;
        });

        canvas.addEventListener("mouseup", function (e) {
            self.input.buttons[e.button] = false;
        });

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

        this.loader.start();
    };

    var loaded = function () {
        self.state.loaded();

        startTime = new Date().getTime();
        loop();
    };

    var loop = function () {
        // setTimeout(function () {
        var deltaTime = (new Date()).getTime() - startTime;

        update(deltaTime);
        draw();

        startTime = new Date().getTime();

        requestAnimationFrame(loop);
        // }, 1000 / self.fps);
    };

    var update = function (deltaTime) {
        self.animates.update(deltaTime);
        self.state.update(deltaTime);

        // reset keys
        self.input.keyPress = [];
        self.input.buttonPress = [];

        for (var key in self.input.axes) {
            var axe = self.input.axes[key];
            if (self.input.getKey(axe.positive)) {
                axe.value = clamp(axe.value - axe.sensitivity, -1, 0);
            } else if (self.input.getKey(axe.negative)) {
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

    var draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        self.state.draw(ctx);
    };

    // call init after everything is loaded
    init();
});