var state = (function (stella) {
    this.stella = stella;
    this.input = this.stella.input;
    this.loader = this.stella.loader;
});

state.prototype.loaded = function () { };

state.prototype.update = function () { };

state.prototype.draw = function (ctx) { };