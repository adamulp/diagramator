import CanvasItem from './CanvasItem.js';

export default class Shape extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
        this.hasPreview = true;
    }


    // Common methods for shapes can be added here in the future
}