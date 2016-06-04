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
var DEBUG_MODE = 1;

var app = (function (canvas) {
    var self = this;
    var canvas = canvas;
    var ctx = canvas.getContext("2d");
    this.fps = 60;
    this.state = undefined;

    this.input = new input();

    this.start = function () {
        if (this.state) {
            this.state.stella = self;
            canvas.addEventListener("keydown", function (e) {
                if (!self.input.keys[e.keyCode]) {
                    self.input.keyPress[e.keyCode] = true;
                }
                self.input.keys[e.keyCode] = true;

                if (DEBUG_MODE) {
                    if (self.input.getKeyDown(e.keyCode)) {
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
        } else {
            console.error("state is undefined");
        }
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