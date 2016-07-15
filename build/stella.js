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
        this.mainCtx = this.mainCanvas.getContext("2d");
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.updateCanvasSize();

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
    add(key, state) {
        if (!this.states.hasOwnProperty(key)) {
            this.states[key] = state;
        }
    }
    remove(key) {
        if (this.states.hasOwnProperty(key)) {
            delete this.states[key];
        }
    }
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










































































































