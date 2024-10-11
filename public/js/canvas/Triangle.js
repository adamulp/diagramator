import Shape from './Shape.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Triangle extends Shape {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    // Override to calculate triangle-specific dimensions (coordinates of three points)
    getDimensions(currentX, currentY) {
        const x1 = this.startX;
        const y1 = this.startY;

        const x2 = currentX;
        const y2 = this.startY;

        const x3 = (this.startX + currentX) / 2;
        const y3 = currentY;

        return { x1, y1, x2, y2, x3, y3 };
    }

    // Override to draw a triangle preview
    drawShapePreview(x1, y1, x2, y2, x3, y3) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1); // First vertex
        this.ctx.lineTo(x2, y2); // Second vertex
        this.ctx.lineTo(x3, y3); // Third vertex
        this.ctx.closePath();
        this.ctx.stroke(); // Draw the triangle
    }

    // Implement the createFinal method to create the triangle in the SVG canvas
    createFinal(currentX, currentY) {
        const { x1, y1, x2, y2, x3 } = this.getDimensions(currentX, currentY);

        // Create an SVG 'polygon' element for the triangle
        const points = `${x1},${y1} ${x2},${y2} ${x3},${currentY}`;
        const attributes = {
            points: points,
            stroke: 'black',
            fill: 'transparent'
        };

        // Create and append the polygon to the SVG canvas
        const triangle = createSvgElement('polygon', attributes);
        appendSvgElement(this.svgCanvas, triangle);
    }
}
