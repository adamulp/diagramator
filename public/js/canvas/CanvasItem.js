export default class CanvasItem {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.svgCanvas = svgCanvas;
        this.startX = 0;
        this.startY = 0;
    }

    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
    }
}