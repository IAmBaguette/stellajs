function drawText(ctx, text, x, y, height) {
    var lines = text.split("\n");
    lines.forEach(function (line) {
        ctx.fillText(line, x, y);
        y += height;
    });
}

Math.random.rangeInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
};

Math.clamp = function (num, min, max) {
    return Math.min(Math.max(num, min), max);
};

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};