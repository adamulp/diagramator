import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Rectangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        // TO DO: Draw a preview of the rectangle on the temporary canvas.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    createFinal(currentX, currentY) {
        // TO DO: Create the final SVG rectangle and append it to the SVG canvas.
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