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

    this.add = function () {
        if (arguments.length == 2) {
            this.add.twoParams.apply(this, arguments);
        } else if (arguments.length == 1) {
            this.add.oneParam.apply(this, arguments);
        }
    };

    // { "key": "src" }
    this.add.oneParam = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                this.add(key, obj[key]);
            }
        }
    };

    this.add.twoParams = function (key, src) {
        if (!this.loaded.hasOwnProperty(key)) {
            this.loaded[key] = src;
        } else {
            console.error("can't the same key twice");
        }
    };

    this.get = function (obj) {
        if (obj instanceof Array) {
            return this.get.array.apply(this, arguments);
        } else {
            return this.get.key.apply(this, arguments);
        }
    };

    // [key]
    this.get.array = function (array) {
        var results = [];
        array.forEach(function (key) {
            results.push(this.get(key));
        }, this);
        return results;
    };

    this.get.key = function (key) {
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