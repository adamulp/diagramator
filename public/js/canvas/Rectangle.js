import Shape from './Shape.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Rectangle extends Shape {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    // Override to calculate rectangle-specific dimensions
    getDimensions(currentX, currentY) {
        return {
            startX: this.startX,
            startY: this.startY,
            width: currentX - this.startX,
            height: currentY - this.startY
        };
    }

    // Override to draw a rectangle preview
    drawShapePreview(startX, startY, width, height) {
        this.ctx.strokeRect(startX, startY, width, height);
    }

    // Implement the createFinal method
    createFinal(currentX, currentY) {
        const attributes = {
            x: Math.min(this.startX, currentX),
            y: Math.min(this.startY, currentY),
            width: Math.abs(currentX - this.startX),
            height: Math.abs(currentY - this.startY),
            stroke: 'black',
            fill: 'transparent'
        };
        const rect = createSvgElement('rect', attributes);

        appendSvgElement(this.svgCanvas, rect);
    }
}
