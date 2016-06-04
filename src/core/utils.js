function drawText(ctx, x, y, text, height) {
    var lines = text.split("\n");
    lines.forEach(function (line) {
        ctx.fillText(line, x, y);
        y += height;
    });
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}