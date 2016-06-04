var DEBUG_MODE = 1;

var app = (function (canvas) {
    var self = this;
    var canvas = canvas;
    var ctx = canvas.getContext("2d");
    this.fps = 60;

    this.input = new input();

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

    this.start = function () {
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
        // reset keys
        this.input.keyPress = [];
    };

    this.draw = function () {

    };
});

var Keyboard = {
    Up: 38
};