'use strict'

var STELLA = {};

STELLA.DEFAULT_WIDTH = 800;
STELLA.DEFAULT_HEIGHT = 600;

STELLA.App = class {
    constructor(canvas, options) {
        this.mainCanvas = canvas;
        this.mainCtx = undefined;
        this.canvas = undefined;
        this.ctx = undefined;

        this.state = undefined;
        this.states = undefined;

        this.camera = undefined;

        this.options = options || {};
        this.options.width = this.options.width || STELLA.DEFAULT_WIDTH;
        this.options.height = this.options.height || STELLA.DEFAULT_HEIGHT;
        this.options.fullScreen = this.options.fullScreen ? this.options.fullScreen : false;
    }
    start() {
        this.init();
        this.mainCanvas.focus();

        this.loop();
    }
    init() {
        // for drawing camera canvases
        this.mainCtx = this.mainCanvas.getContext("2d");
        // for camera's
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        // first time update canvas size
        this.updateCanvasSize();

        // event to update canvas size when window resizes
        window.onresize = function () {
            self.resizeCanvas();
            draw();
        };

        this.state = undefined;
        this.states = {};

        this.camera = new Camera();
    }
    loop() {
        this.update()
        this.draw();

        requestAnimationFrame(this.loop.bind(this));
    }
    update() {

    }
    draw() {
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // get state draw
        //this.state.draw(ctx)

        // draw context on cameras


        // draw cameras canvases
    }
    updateCanvasSize() {
        var width = this.options.width;
        var height = this.options.height;
        if (this.options.fullScreen) {
            width = window.innerWidth;
            height = window.innerHeight;
        }

        this.mainCanvas.width = width;
        this.mainCanvas.height = height;
    }
    getCanvasSize() {
        return new STELLA.Dimension(this.mainCanvas.width, this.mainCanvas.height);
    }
    // add new state
    add(key, state) {
        if (!this.states.hasOwnProperty(key)) {
            this.states[key] = state;
        }
    }
    // remove existing state
    remove(key) {
        if (this.states.hasOwnProperty(key)) {
            delete this.states[key];
        }
    }
    // set state before start
    set(key) {
        this.state = new this.states[key](self);
    }
}

STELLA.Dimension = class {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

STELLA.Camera = class {
    constructor() {

    }
}

STELLA.State = class {
    constructor() {

    }
}

// var STELLA = {};

// STELLA.extend = function (a, b) {
// 	b.prototype = Object.create(a.prototype);
// 	b.prototype.constructor = b;
// };


// var Vector = (function () {
//     if (arguments.length == 2) {
//         Vector.twoParams.apply(this, arguments);
//     } else if (arguments.length == 1) {
//         Vector.oneParam.apply(this, arguments);
//     } else if (arguments.length == 0) {
//         Vector.twoParams.apply(this, [0, 0]);
//     }
// });

// Vector.oneParam = function (a) {
//     Vector.twoParams.apply(this, [a.x, a.y]);
// };

// Vector.twoParams = function (x, y) {
//     this.x = x;
//     this.y = y;
// };

// Vector.Add = function (a, b) {
//     return new Vector(a.x + b.x, a.y + b.y); 
// };

// Vector.Sub = function (a, b) {
//     return new Vector(a.x - b.x, a.y - b.y);
// };

// Vector.Mul = function(a, f) {
//     return new Vector(a.x * f, a.y * f);
// };

// Vector.Magnitude = function (a) {
//     return a.magnitude();
// };

// Vector.Distance = function (a, b) {
//     return Vector.Magnitude(Vector.Sub(b, a));
// };

// Vector.Normalize = function (a) {
//     return a.normalize();
// };

// Vector.prototype.set = function () {
//     if (arguments.length == 2) {
//         this.set.twoParams.apply(this, arguments);
//     } else if (arguments.length == 1) {
//         this.set.oneParam.apply(this, arguments);
//     }
// };

// Vector.prototype.set.oneParam = function (a) {
//     this.set(a.x, a.y);
// };

// Vector.prototype.set.twoParams = function (x, y) {
//     this.x = x;
//     this.y = y;
// };

// Vector.prototype.add = function (a) {
//     this.x += a.x;
//     this.y += a.y;
//     return this;
// };

// Vector.prototype.magnitude = function () {
//     return Math.sqrt(this.x * this.x + this.y * this.y);
// };

// Vector.prototype.normalize = function () {
//     var m = this.magnitude();
//     m = (m == 0 ? 1 : m);
//     return new Vector(this.x / m, this.y / m);
// };

// Vector.prototype.equals = function () {
//     if (arguments.length == 2) {
//         return this.equals.twoParams.apply(this, arguments);
//     } else if (arguments.length == 1) {
//         return this.equals.oneParam.apply(this, arguments);
//     } else {
//         return false;
//     }
// };

// Vector.prototype.equals.oneParam = function (a) {
//     return this.equals(a.x, a.y);
// };

// Vector.prototype.equals.twoParams = function (x, y) {
//     return this.x == x && this.y == y;
// };

// Vector.prototype.copy = function () {
//     return new Vector(this);
// };
// function drawText(ctx, text, x, y, height) {
//     var lines = text.split("\n");
//     lines.forEach(function (line) {
//         ctx.fillText(line, x, y);
//         y += height;
//     });
// }

// Math.random.rangeInt = function (min, max) {
//     return Math.round(Math.random() * (max - min)) + min;
// };

// Math.clamp = function (num, min, max) {
//     return Math.min(Math.max(num, min), max);
// };

// Math.radians = function (degrees) {
//     return degrees * Math.PI / 180;
// };

// Math.degrees = function (radians) {
//     return radians * 180 / Math.PI;
// };
// var grid = (function (options) {
//     this.width = options.width;
//     this.height = options.height;
//     this.blockSize = options.blockSize;
//     this.baseColor = options.baseColor || "#007dd8";
//     this.altColor = options.altColor || "#006ec0";

//     this.image = null;

//     var ctx = document.createElement("canvas").getContext("2d");
//     ctx.canvas.width = this.width;
//     ctx.canvas.height = this.height;

//     var rows = this.height / this.blockSize;
//     var columns = this.width / this.blockSize;

//     ctx.save();

//     for (var row = 0; row < rows; row++) {
//         for (var column = 0; column < columns; column++) {
//             var color;
//             if (row % 2 == 0) {
//                 if (column % 2 == 0) {
//                     color = this.baseColor;
//                 } else {
//                     color = this.altColor;
//                 }
//             } else {
//                 if (column % 2 == 0) {
//                     color = this.altColor;
//                 } else {
//                     color = this.baseColor;
//                 }
//             }

//             var x = column * this.blockSize;
//             var y = row * this.blockSize;

//             ctx.beginPath();
//             ctx.rect(x, y, this.blockSize, this.blockSize);
//             ctx.fillStyle = color;
//             ctx.fill();
//             ctx.closePath();
//         }
//     }

//     ctx.restore();

//     this.image = new Image();
//     this.image.src = ctx.canvas.toDataURL("image/png");

//     ctx = null; 

//     this.draw = function (ctx, x, y) {
//         x = x || 0;
//         y = y || 0;

//         var	width = ctx.canvas.width;
// 		var	height = ctx.canvas.height;

//         if(this.image.width - x < width){
//             width = this.image.width - x;
//         }

//         if(this.image.height - y < height){
//             height = this.image.height - y; 
//         }		

//         ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
//     }
// });
// var camera = (function (options) {

//     this.objectToFollow = undefined;

//     this.viewport = {
//         x: options.startX || 0,
//         y: options.startY || 0,
//         width: options.viewWidth,
//         height: options.viewHeight
//     };

//     this.world = {
//         x: 0,
//         y: 0,
//         width: options.worldWidth,
//         height: options.worldHeight
//     };

//     this.xDeadZone = 0;
//     this.yDeadZone = 0;

//     this.follow = function (object, xDeadZone, yDeadZone) {
//         this.xDeadZone = xDeadZone;
//         this.yDeadZone = yDeadZone;
//         this.objectToFollow = object;
//     };

//     this.update = function () {
//         if (this.objectToFollow) {
//             if (this.objectToFollow.x - this.viewport.x + this.xDeadZone > this.viewport.width)
//                 this.viewport.x = this.objectToFollow.x - (this.viewport.width - this.xDeadZone);
//             else if (this.objectToFollow.x - this.xDeadZone < this.viewport.x)
//                 this.viewport.x = this.objectToFollow.x - this.xDeadZone;

//             if (this.objectToFollow.y - this.viewport.y + this.yDeadZone > this.viewport.height)
//                 this.viewport.y = this.objectToFollow.y - (this.viewport.height - this.yDeadZone);
//             else if (this.objectToFollow.y - this.yDeadZone < this.viewport.y)
//                 this.viewport.y = this.objectToFollow.y - this.yDeadZone;
//         }

//         if (this.viewport.x <= this.world.x)
//             this.viewport.x = this.world.x;

//         if (this.viewport.y <= this.world.y)
//             this.viewport.y = this.world.y;

//         if ((this.viewport.width + this.viewport.x) >= this.world.width)
//             this.viewport.x = (this.world.x + this.world.width) - this.viewport.width;

//         if ((this.viewport.height + this.viewport.y) >= this.world.height)
//             this.viewport.y = (this.world.y + this.world.height) - this.viewport.height;
//     };
// });
// var KeyCode = {
//     LeftArrow: 37,
//     UpArrow: 38,
//     RightArrow: 39,
//     DownArrow: 40
// };
// var Input = (function () {
//     this.keys = [];
//     this.keyPress = [];
//     this.axes = {};
//     this.buttons = [];
//     this.buttonPress = [];
//     this.mousePosition = new Vector(0, 0);

//     this.addAxe = function (key, options) {
//         if (!this.axes.hasOwnProperty(key)) {
//             options.value = 0;
//             this.axes[key] = options;
//         }
//     };

//     this.removeAxe = function (key) {
//         if (this.axes.hasOwnProperty(key)) {
//             delete this.axes[key];
//         }
//     };

//     this.getAxis = function (key) {
//         if (this.axes.hasOwnProperty(key)) {
//             return this.axes[key].value;
//         }
//     };

//     this.getKey = function (keyCode) {
//         return this.keys[keyCode];
//     };

//     this.getKeyPress = function (keyCode) {
//         return this.keyPress[keyCode];
//     };

//     this.getMouseButton = function (button) {
//         return this.buttons[button];
//     };

//     this.getMouseButtonPress = function (button) {
//         return this.buttonPress[button];
//     };
// });
// var Loader = (function (callback) {
//     var self = this;
//     this.loaded = {};
//     this.callback = callback;

//     this.start = function () {
//         var remaining = Object.keys(this.loaded).length;
//         if (remaining <= 0) {
//             this.callback();
//             return;
//         }

//         for (var key in this.loaded) {
//             if (this.loaded.hasOwnProperty(key)) {
//                 var img = new Image();
//                 img.onload = function () {
//                     --remaining;
//                     if (remaining <= 0) {
//                         self.callback();
//                     }
//                 };
//                 img.src = this.loaded[key];
//                 this.loaded[key] = img;
//             }
//         }
//     };

//     this.add = function () {
//         if (arguments.length == 2) {
//             this.add.twoParams.apply(this, arguments);
//         } else if (arguments.length == 1) {
//             this.add.oneParam.apply(this, arguments);
//         }
//     };

//     this.add.oneParam = function (obj) {
//         for (var key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 this.add(key, obj[key]);
//             }
//         }
//     };

//     this.add.twoParams = function (key, src) {
//         if (!this.loaded.hasOwnProperty(key)) {
//             this.loaded[key] = src;
//         } else {
//             throw "can't add the same key twice"
//         }
//     };

//     this.get = function (obj) {
//         if (obj instanceof Array) {
//             return this.get.array.apply(this, arguments);
//         } else {
//             return this.get.key.apply(this, arguments);
//         }
//     };

//     this.get.array = function (array) {
//         var results = [];
//         array.forEach(function (key) {
//             results.push(this.get(key));
//         }, this);
//         return results;
//     };

//     this.get.key = function (key) {
//         if (this.loaded.hasOwnProperty(key)) {
//             return this.loaded[key];
//         }
//     };

//     this.remove = function (key) {
//         if (this.loaded.hasOwnProperty(key)) {
//             delete this.loaded[key];
//         }
//     }
// });
// var Anim = (function () {
//     if (arguments.length == 4) {
//         Anim.fourParams.apply(this, arguments);
//     } else if (arguments.length == 3) {
//         Anim.threeParams.apply(this, arguments);
//     }
// });

// Anim.threeParams = function (target, end, time) {
//     this.target = target;
//     this.start = target.copy();
//     this.end = end.copy();
//     this.distance = Vector.Distance(this.start, this.end);
//     this.direction = Vector.Normalize(Vector.Sub(this.end, this.start));
//     this.speed = (typeof time !== undefined ? time : 0);
//     this.speed = (time <= 0 ? 1 : time);
// };

// Anim.fourParams = function (target, x, y, time) {
//     Anim.twoParams.apply(this, [target, new Vector(x, y), time]);
// };
// var animates = (function () {
//     var animating = {};
//     var listeners = {};

//     this.isAnimating = function () {
//         return Object.keys(animating).length > 0;
//     };

//     this.add = function () {
//         if (arguments.length == 2) {
//             if (arguments[1] instanceof Array) {
//                 this.add.queue.apply(this, arguments);
//             } else {
//                 this.add.anim.apply(this, arguments);
//             }
//         }
//     };

//     this.add.anim = function (key, anim) {
//         if (!animating.hasOwnProperty(key)) {
//             animating[key] = {};
//             animating[key].queue = [];
//         }

//         animating[key].queue.push(anim);
//     };

//     this.add.queue = function (key, queue) {
//         if (!animating.hasOwnProperty(key)) {
//             animating[key] = {};
//             animating[key].queue = queue;
//         } else {
//             animating[key].queue.push.apply(animating[key].queue, queue);
//         }
//     };

//     this.remove = function (key) {
//         if (animating.hasOwnProperty(key)) {
//             delete animating[key];
//         }
//     }

//     this.addListener = function (key, callback) {
//         if (!listeners.hasOwnProperty(key)) {
//             listeners[key] = callback;
//         } else {
//             throw "listener key already exists";
//         }
//     };

//     this.update = function (deltaTime) {
//         var garbage = {};

//         for (var key in animating) {
//             if (animating.hasOwnProperty(key)) {
//                 if (!garbage.hasOwnProperty(key)) {
//                     garbage[key] = {};
//                     garbage[key].queue = [];
//                 }
//                 var queue = animating[key].queue;
//                 var callback = animating[key].callback;
//                 for (var index in queue) {
//                     var anim = queue[index];
//                     if (DEBUG_ANIMATING) {
//                         anim.target.set(anim.end);
//                         garbage[key].queue.push(anim);
//                         continue;
//                     }

//                     if (Vector.Distance(anim.start, anim.target) >= anim.distance) {
//                         anim.target.set(anim.end);
//                         garbage[key].queue.push(anim);
//                     } else {
//                         var distance = Vector.Distance(anim.start, anim.end);
//                         anim.target.add(Vector.Mul(anim.direction, (distance / anim.speed) * deltaTime));
//                     }
//                 }
//             }
//         }

//         for (var key in garbage) {
//             if (garbage.hasOwnProperty(key) &&
//                 animating.hasOwnProperty(key)) {
//                 var queue = garbage[key].queue;
//                 for (var index in queue) {
//                     var i = animating[key].queue.indexOf(queue[index]);
//                     animating[key].queue.splice(i, 1);
//                     if (listeners.hasOwnProperty(key)) {
//                         listeners[key](animating[key].queue.length);
//                     }
//                 }
//                 if (animating[key].queue.length <= 0) {
//                     this.remove(key);
//                 }
//             }
//         }
//     };
// });
// var State = (function (stella) {
//     this.stella = stella;
//     this.input = this.stella.input;
//     this.loader = this.stella.loader;
//     this.animates = this.stella.animates;

//     State.prototype.start = function () { };
//     this.loaded = function () { };
//     this.update = function (deltaTime) { };
//     this.draw = function (ctx) { };
// });
// var DEBUG_MODE = 1;
// var DEBUG_ANIMATING = 0;

// var app = (function (canvas, options) {
//     var self = this;
//     var canvas = canvas;
//     var options = options || {};
//     options.width = options.width || 800;
//     options.height = options.height || 600;
//     var ctx = canvas.getContext("2d");
//     var startTime = 0;

//     this.add = function (key, state) {
//         if (!this.states.hasOwnProperty(key)) {
//             this.states[key] = state;
//         }
//     };
//     this.remove = function (key) {
//         if (this.states.hasOwnProperty(key)) {
//             delete this.states[key];
//         }
//     }
//     this.set = function (key) {
//         this.state = new this.states[key](self);
//         this.state.start();
//     };
//     this.getScreenSize = function () {
//         return { width: canvas.width, height: canvas.height };
//     };
//     this.resizeCanvas = function () {
//         if (options.fullScreen) {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         } else {
//             canvas.width = options.width;
//             canvas.height = options.height;
//         }
//     };

//     var init = function () {
//         self.fps = 60;
//         self.state = undefined;
//         self.states = {};
//         self.loader = new Loader(loaded);
//         self.animates = new animates();
//         self.input = new Input();
//         self.resizeCanvas();

//         window.onresize = function () {
//             self.resizeCanvas();
//             draw();
//         };

//         canvas.addEventListener("mousemove", function (e) {
//             self.input.mousePosition.set(e.offsetX, e.offsetY);
//         });

//         canvas.addEventListener("mousedown", function (e) {
//             if (!self.input.buttons[e.button]) {
//                 self.input.buttonPress[e.button] = true;
//             }
//             self.input.buttons[e.button] = true;
//         });

//         canvas.addEventListener("mouseup", function (e) {
//             self.input.buttons[e.button] = false;
//         });

//         canvas.addEventListener("keydown", function (e) {
//             if (!self.input.keys[e.keyCode]) {
//                 self.input.keyPress[e.keyCode] = true;
//             }
//             self.input.keys[e.keyCode] = true;

//             if (DEBUG_MODE) {
//                 if (self.input.getKeyPress(e.keyCode)) {
//                     var log = "";
//                     for (var attr in KeyCode) {
//                         if (KeyCode[attr] == e.keyCode) {
//                             log += "Keyboard." + attr + ": ";
//                         }
//                     }
//                     log += e.keyCode;
//                     console.log(log);
//                 }
//             }
//         });

//         canvas.addEventListener("keyup", function (e) {
//             self.input.keys[e.keyCode] = false;
//         });
//     };

//     this.start = function () {
//         canvas.focus();

//         this.loader.start();
//     };

//     var loaded = function () {
//         self.state.loaded();

//         startTime = new Date().getTime();
//         loop();
//     };

//     var loop = function () {
//         var deltaTime = (new Date()).getTime() - startTime;

//         update(deltaTime);
//         draw();

//         startTime = new Date().getTime();

//         requestAnimationFrame(loop);
//     };

//     var update = function (deltaTime) {
//         self.animates.update(deltaTime);
//         self.state.update(deltaTime);

//         self.input.keyPress = [];
//         self.input.buttonPress = [];

//         for (var key in self.input.axes) {
//             var axe = self.input.axes[key];
//             if (self.input.getKey(axe.positive)) {
//                 axe.value = clamp(axe.value - axe.sensitivity, -1, 0);
//             } else if (self.input.getKey(axe.negative)) {
//                 axe.value = clamp(axe.value + axe.sensitivity, 0, 1);
//             } else {
//                 if (axe.value > 0) {
//                     axe.value = clamp(axe.value - axe.gravity, 0, 1);
//                 } else if (axe.value < 0) {
//                     axe.value = clamp(axe.value + axe.gravity, -1, 0);
//                 } else {
//                     axe.value = 0;
//                 }
//             }
//         }
//     };

//     var draw = function () {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         self.state.draw(ctx);
//     };

//     init();
// });