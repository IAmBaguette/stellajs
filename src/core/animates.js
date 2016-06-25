var animates = (function () {
    var animating = {};
    var listeners = {};
    // add time based animation and ability to set a speed or speed base on time to elapsed
    // REAL QUEUE ANIMATION (wait until previous vector is done)
    
    this.isAnimating = function () {
        return Object.keys(animating).length > 0;
    };

    this.add = function () {
        if (arguments.length == 2) {
            if (arguments[1] instanceof Array) {
                this.add.queue.apply(this, arguments);
            } else {
                this.add.anim.apply(this, arguments);
            }
        }
    };

    this.add.anim = function (key, anim) {
        if (!animating.hasOwnProperty(key)) {
            animating[key] = {};
            animating[key].queue = [];
        }

        animating[key].queue.push(anim);
    };

    this.add.queue = function (key, queue) {
        if (!animating.hasOwnProperty(key)) {
            animating[key] = {};
            animating[key].queue = queue;
        } else {
            animating[key].queue.push.apply(animating[key].queue, queue);
        }
    };

    this.remove = function (key) {
        if (animating.hasOwnProperty(key)) {
            delete animating[key];
        }
    }

    this.addListener = function (key, callback) {
        if (!listeners.hasOwnProperty(key)) {
            listeners[key] = callback;
        } else {
            throw "listener key already exists";
        }
    };

    this.update = function () {
        var garbage = {};
        var linearSpeed = 7;

        for (var key in animating) {
            if (animating.hasOwnProperty(key)) {
                if (!garbage.hasOwnProperty(key)) {
                    garbage[key] = {};
                    garbage[key].queue = [];
                }
                var queue = animating[key].queue;
                var callback = animating[key].callback;
                for (var index in queue) {
                    var anim = queue[index];
                    if (DEBUG_ANIMATING) {
                        anim.target.set(anim.end);
                        garbage[key].queue.push(anim);
                        continue;
                    }

                    if (Vector.Distance(anim.start, anim.target) >= anim.distance) {
                        anim.target.set(anim.end);
                        garbage[key].queue.push(anim);
                    } else {
                        anim.target.add(Vector.Mul(anim.direction, linearSpeed));
                    }
                }
            }
        }

        // clean up
        for (var key in garbage) {
            if (garbage.hasOwnProperty(key) &&
                animating.hasOwnProperty(key)) {
                var queue = garbage[key].queue;
                for (var index in queue) {
                    var i = animating[key].queue.indexOf(queue[index]);
                    animating[key].queue.splice(i, 1);
                    if (listeners.hasOwnProperty(key)) {
                        listeners[key](animating[key].queue.length);
                    }
                }
                if (animating[key].queue.length <= 0) {
                    this.remove(key);
                }
            }
        }
    };
});