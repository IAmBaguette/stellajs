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