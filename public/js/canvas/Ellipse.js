import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Ellipse extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        // TO DO: Draw a preview of the ellipse on the temporary canvas.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (currentX + this.startX) / 2;
        const centerY = (currentY + this.startY) / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    createFinal(currentX, currentY) {
        // TO DO: Create the final SVG ellipse and append it to the SVG canvas.
        const attributes = {
            cx: (currentX + this.startX) / 2,
            cy: (currentY + this.startY) / 2,
            rx: Math.abs(currentX - this.startX) / 2,
            ry: Math.abs(currentY - this.startY) / 2,
            stroke: 'black',
            fill: 'transparent'
        };
        const ellipse = createSvgElement('ellipse', attributes);

        // Add event listener for selection
        ellipse.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click event from reaching parent
            selectElement(ellipse);
        });
        appendSvgElement(this.svgCanvas, ellipse);
    }
}