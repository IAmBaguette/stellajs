var Anim = (function () {
    if (arguments.length == 4) {
        Anim.fourParams.apply(this, arguments);
    } else if (arguments.length == 3) {
        Anim.threeParams.apply(this, arguments);
    }
});

Anim.threeParams = function (target, end, time) {
    this.target = target;
    this.start = target.copy();
    this.end = end.copy();
    this.distance = Vector.Distance(this.start, this.end);
    this.direction = Vector.Normalize(Vector.Sub(this.end, this.start));
    this.speed = (typeof time !== undefined ? time : 0);
    this.speed = (time <= 0 ? 1 : time);
};

Anim.fourParams = function (target, x, y, time) {
    Anim.twoParams.apply(this, [target, new Vector(x, y), time]);
};