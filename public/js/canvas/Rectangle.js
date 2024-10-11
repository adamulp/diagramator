import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';
import { drawRectangle } from '../utils/draw.js';

export default class Rectangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        drawRectangle(this.ctx, this.startX, this.startY, currentX, currentY);
    }

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