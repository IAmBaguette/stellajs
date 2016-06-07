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