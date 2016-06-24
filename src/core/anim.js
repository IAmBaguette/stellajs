var Anim = (function () {
    if (arguments.length == 3) {
        Anim.threeParams.apply(this, arguments);
    } else if (arguments.length == 2) {
        Anim.twoParams.apply(this, arguments);
    }
});

Anim.twoParams = function (target, end) {
    this.target = target;
    this.start = target.copy();
    this.end = end.copy();
    this.distance = Vector.Distance(this.start, this.end);
    this.direction = Vector.Normalize(Vector.Sub(this.end, this.start));
};

Anim.threeParams = function (target, x, y) {
    Anim.twoParams.apply(this, [target, new Vector(x, y)]);
};