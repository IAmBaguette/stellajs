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