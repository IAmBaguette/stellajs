var vector = (function () {
    if (arguments.length == 2) {
        vector.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        vector.oneParam.apply(this, arguments);
    } else if (arguments.length == 0) {
        vector.twoParams.apply(this, [0, 0]);
    }
});

vector.oneParam = function (a) {
    vector.twoParams.apply(this, [a.x, a.y]);
};

vector.twoParams = function (x, y) {
    this.x = x;
    this.y = y;
};

vector.prototype.set = function () {
    if (arguments.length == 2) {
        this.set.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        this.set.oneParam.apply(this, arguments);
    }
};

vector.prototype.set.oneParam = function (a) {
    this.set(a.x, a.y);
};

vector.prototype.set.twoParams = function (x, y) {
    this.x = x;
    this.y = y;
};

vector.prototype.equals = function () {
    if (arguments.length == 2) {
        return this.equals.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        return this.equals.oneParam.apply(this, arguments);
    } else {
        return false;
    }
};

vector.prototype.equals.oneParam = function (a) {
    return this.equals(a.x, a.y);
};

vector.prototype.equals.twoParams = function (x, y) {
    return this.x == x && this.y == y;
};

vector.prototype.copy = function () {
    return new vector(this);
};
function drawText(ctx, x, y, text, height) {
    var lines = text.split("\n");
    lines.forEach(function (line) {
        ctx.fillText(line, x, y);
        y += height;
    });
}

Math.random.rangeInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
};

Math.clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
};

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
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
    this.axes = {};
    this.buttons = [];
    this.buttonPress = [];
    this.mousePosition = new vector(0, 0);

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
    };

    this.getKey = function (keyCode) {
        return this.keys[keyCode];
    };

    this.getKeyPress = function (keyCode) {
        return this.keyPress[keyCode];
    };

    this.getMouseButton = function (button) {
        return this.buttons[button];
    };

    this.getMouseButtonPress = function (button) {
        return this.buttonPress[button];
    };
});
var loader = (function (callback) {
    var self = this;
    this.loaded = {};
    this.callback = callback;

    this.start = function () {
        var remaining = Object.keys(this.loaded).length;
        if (remaining <= 0) {
            this.callback();
            return;
        }

        for (var key in this.loaded) {
            if (this.loaded.hasOwnProperty(key)) {
                var img = new Image();
                img.onload = function () {
                    --remaining;
                    if (remaining <= 0) {
                        self.callback();
                    }
                };
                img.src = this.loaded[key];
                this.loaded[key] = img;
            }
        }
    };

    this.add = function (key, img) {
        if (!this.loaded.hasOwnProperty(key)) {
            this.loaded[key] = img;
        } else {
            console.error("can't the same key twice");
        }
    };
    
    this.get = function (key) {
        if (this.loaded.hasOwnProperty(key)) {
            return this.loaded[key];
        }
    };

    this.remove = function (key) {
        if (this.loaded.hasOwnProperty(key)) {
            delete this.loaded[key];
        }
    }
});
var state = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;
    this.loader = this.stella.loader;
});

state.prototype.loaded = function () { };

state.prototype.update = function () { };

state.prototype.draw = function (ctx) { };
var DEBUG_MODE = 1;

var app = (function (canvas, options) {
    var self = this;
    var canvas = canvas;
    var options = options || {};
    options.width = options.width || 800;
    options.height = options.height || 600;
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
        self.loader = new loader(loaded);
        self.input = new input();
        // update size
        self.resizeCanvas();

        window.onresize = function () {
            self.resizeCanvas();
            self.draw();
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

        loop();
    };

    var loop = function () {
        setTimeout(function () {
            // Drawing code goes here
            update();
            draw();

            requestAnimationFrame(loop);
        }, 1000 / self.fps);
    };

    var update = function () {
        self.state.update();

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