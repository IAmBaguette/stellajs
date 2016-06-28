var State = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;
    this.loader = this.stella.loader;
    this.animates = this.stella.animates;
});

State.prototype.loaded = function () { };

State.prototype.update = function (deltaTime) { };

State.prototype.draw = function (ctx) { };