function drawText(ctx, x, y, text, height) {
    var lines = text.split("\n");
    lines.forEach(function (line) {
        ctx.fillText(line, x, y);
        y += height;
    });
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
var grid = (function (options) {
    this.width = options.width;
    this.height = options.height;
    this.blockSize = options.blockSize;
    this.baseColor = options.baseColor || "#007dd8";
    this.altColor = options.altColor || "#006ec0";

    this.image = null;

    //Generate grid
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    var rows = this.height / this.blockSize;
    var columns = this.width / this.blockSize;

    ctx.save();

    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            //Alternate color with modulo (odd, even)
            var color;
            if (row % 2 == 0) {
                if (column % 2 == 0) {
                    color = this.baseColor;
                } else {
                    color = this.altColor;
                }
            } else {
                if (column % 2 == 0) {
                    color = this.altColor;
                } else {
                    color = this.baseColor;
                }
            }

            var x = column * this.blockSize;
            var y = row * this.blockSize;

            ctx.beginPath();
            ctx.rect(x, y, this.blockSize, this.blockSize);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }

    ctx.restore();

    //store grid as a image texture
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    ctx = null; //clear data context

    this.draw = function (ctx, x, y) {
        x = x || 0;
        y = y || 0;

        var	width = ctx.canvas.width;
		var	height = ctx.canvas.height;

        if(this.image.width - x < width){
            width = this.image.width - x;
        }

        if(this.image.height - y < height){
            height = this.image.height - y; 
        }		

        ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
    }
});
var camera = (function (options) {

    this.objectToFollow = undefined;

    this.viewport = {
        x: options.startX || 0,
        y: options.startY || 0,
        width: options.viewWidth,
        height: options.viewHeight
    };

    this.world = {
        x: 0,
        y: 0,
        width: options.worldWidth,
        height: options.worldHeight
    };

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.follow = function (object, xDeadZone, yDeadZone) {
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
        this.objectToFollow = object;
    };

    this.update = function () {
        //follow player if defined
        if (this.objectToFollow) {
            if (this.objectToFollow.x - this.viewport.x + this.xDeadZone > this.viewport.width)
                this.viewport.x = this.objectToFollow.x - (this.viewport.width - this.xDeadZone);
            else if (this.objectToFollow.x - this.xDeadZone < this.viewport.x)
                this.viewport.x = this.objectToFollow.x - this.xDeadZone;

            if (this.objectToFollow.y - this.viewport.y + this.yDeadZone > this.viewport.height)
                this.viewport.y = this.objectToFollow.y - (this.viewport.height - this.yDeadZone);
            else if (this.objectToFollow.y - this.yDeadZone < this.viewport.y)
                this.viewport.y = this.objectToFollow.y - this.yDeadZone;
        }

        //don't go over world borders
        if (this.viewport.x <= this.world.x)
            this.viewport.x = this.world.x;

        if (this.viewport.y <= this.world.y)
            this.viewport.y = this.world.y;

        if ((this.viewport.width + this.viewport.x) >= this.world.width)
            this.viewport.x = (this.world.x + this.world.width) - this.viewport.width;

        if ((this.viewport.height + this.viewport.y) >= this.world.height)
            this.viewport.y = (this.world.y + this.world.height) - this.viewport.height;
    };
});
var KeyCode = {
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40
};
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
    };

    this.draw = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.state.draw(ctx);
    };

    // call init after everything is loaded
    this.init();
});