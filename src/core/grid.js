var grid = (function (options) {
    this.width = options.width;
    this.height = options.height;
    this.blockSize = options.blockSize;
    this.baseColor = options.baseColor || "#007dd8";
    this.altColor = options.altColor || "#006ec0";

    this.image = null;

    //Generate grid
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;

    var rows = this.width / this.blockSize;
    var columns = this.height / this.blockSize;

    ctx.save();

    for (var row = 0; row < rows; row++) {
        for (var column = 0; column < columns; column++) {
            //Alternate color with modulo (odd, even)
            var color;
            if (row % 2 == 0) {
                if (column % 2 == 0) {
                    color = this.baseColor;
                } else {
                    color = this.altColor;
                }
            } else {
                if (column % 2 == 0) {
                    color = this.altColor;
                } else {
                    color = this.baseColor;
                }
            }

            var x = column * this.blockSize;
            var y = row * this.blockSize;

            ctx.beginPath();
            ctx.rect(x, y, this.blockSize, this.blockSize);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }
    }

    ctx.restore();

    //store grid as a image texture
    this.image = new Image();
    this.image.src = ctx.canvas.toDataURL("image/png");

    ctx = null; //clear data context

    this.draw = function (ctx) {
        ctx.drawImage(this.image, 0, 0);
    }
});