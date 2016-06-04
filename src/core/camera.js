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

    this.follow = function (object) {
        this.objectToFollow = object;
    };

    this.update = function () {
        //follow player if defined
        if (this.objectToFollow) {
            if (this.viewport.x > this.world.x && (this.viewport.x * this.viewport.width) < this.world.width)
                this.viewport.x = this.objectToFollow.x / 2;

            if (this.viewport.y > this.world.y && (this.viewport.y * this.viewport.height) < this.world.height)
                this.viewport.y = this.objectToFollow.y / 2;
        }

        //don't go over world borders
        if (this.viewport.x <= this.world.x)
            this.viewport.x = this.world.x;

        if (this.viewport.y <= this.world.y)
            this.viewport.y = this.world.y;

        if ((this.viewport.width + this.viewport.x) >= this.world.width)
            this.viewport.x = this.world.x - this.viewport.width;

        if ((this.viewport.height + this.viewport.y) >= this.world.height)
            this.viewport.y = this.world.y - this.viewport.height;
    };
});