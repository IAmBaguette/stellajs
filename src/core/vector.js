var Vector = (function () {
    if (arguments.length == 2) {
        Vector.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        Vector.oneParam.apply(this, arguments);
    } else if (arguments.length == 0) {
        Vector.twoParams.apply(this, [0, 0]);
    }
});

Vector.oneParam = function (a) {
    Vector.twoParams.apply(this, [a.x, a.y]);
};

Vector.twoParams = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.Add = function (a, b) {
    return new Vector(a.x + b.x, a.y + b.y); 
};

Vector.Sub = function (a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
};

Vector.Mul = function(a, f) {
    return new Vector(a.x * f, a.y * f);
};

Vector.Magnitude = function (a) {
    return a.magnitude();
};

Vector.Distance = function (a, b) {
    return Vector.Magnitude(Vector.Sub(b, a));
};

Vector.Normalize = function (a) {
    return a.normalize();
};

Vector.prototype.set = function () {
    if (arguments.length == 2) {
        this.set.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        this.set.oneParam.apply(this, arguments);
    }
};

Vector.prototype.set.oneParam = function (a) {
    this.set(a.x, a.y);
};

Vector.prototype.set.twoParams = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector.prototype.add = function (a) {
    this.x += a.x;
    this.y += a.y;
    return this;
};

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.normalize = function () {
    var m = this.magnitude();
    m = (m == 0 ? 1 : m);
    return new Vector(this.x / m, this.y / m);
};

Vector.prototype.equals = function () {
    if (arguments.length == 2) {
        return this.equals.twoParams.apply(this, arguments);
    } else if (arguments.length == 1) {
        return this.equals.oneParam.apply(this, arguments);
    } else {
        return false;
    }
};

Vector.prototype.equals.oneParam = function (a) {
    return this.equals(a.x, a.y);
};

Vector.prototype.equals.twoParams = function (x, y) {
    return this.x == x && this.y == y;
};

Vector.prototype.copy = function () {
    return new Vector(this);
};