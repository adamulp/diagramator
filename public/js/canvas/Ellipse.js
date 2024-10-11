import Shape from './Shape.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Ellipse extends Shape {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    // Override to calculate ellipse-specific dimensions
    getDimensions(currentX, currentY) {
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (this.startX + currentX) / 2;
        const centerY = (this.startY + currentY) / 2;

        return { centerX, centerY, radiusX, radiusY };
    }

    // Override to draw an ellipse preview
    drawShapePreview(centerX, centerY, radiusX, radiusY) {
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    // Implement the createFinal method
    createFinal(currentX, currentY) {
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (this.startX + currentX) / 2;
        const centerY = (this.startY + currentY) / 2;

        const attributes = {
            cx: centerX,
            cy: centerY,
            rx: radiusX,
            ry: radiusY,
            stroke: 'black',
            fill: 'transparent'
        };

        // Create an SVG ellipse element with the calculated attributes
        const ellipse = createSvgElement('ellipse', attributes);

        // Append the ellipse to the SVG canvas
        appendSvgElement(this.svgCanvas, ellipse);
    }
}
