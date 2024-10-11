import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';
import { drawTriangle } from '../utils/draw.js';

export default class Triangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        drawTriangle(this.ctx, this.startX, this.startY, currentX, currentY);
    }

    createFinal(currentX, currentY) {
        const points = `${this.startX},${this.startY} ${currentX},${currentY} ${this.startX - (currentX - this.startX)},${currentY}`;
        const attributes = {
            points: points,
            stroke: 'black',
            fill: 'transparent'
        };
        const polygon = createSvgElement('polygon', attributes);
        appendSvgElement(this.svgCanvas, polygon);
    }
}