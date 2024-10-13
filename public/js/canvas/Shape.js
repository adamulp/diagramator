import CanvasItem from './CanvasItem.js';

export default class Shape extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
        this.hasPreview = true;
        this.previewElement = null;
    }


    // Abstract method for getting dimensions (must be overridden by subclasses)
    getDimensions(currentX, currentY) {
        throw new Error('getDimensions() must be implemented by the shape subclass');
    }

    // Abstract method for drawing the shape (must be overridden by subclasses)
    drawShape(startX, startY, width, height) {
        throw new Error('drawShapePreview() must be implemented by the shape subclass');
    }

    

    // Method to remove the preview element
    removePreviewElement() {
        if (this.previewElement) {
            this.previewElement.remove();
            this.previewElement = null;
        }
    }
}
