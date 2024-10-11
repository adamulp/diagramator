import Shape from './Shape.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Triangle extends Shape {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
        this.previewElement = null; // Store the preview element    
        this.startX = 0;
        this.startY = 0;
    }

    // Method to set the starting coordinates
    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
    }

    // Override to calculate triangle-specific dimensions (coordinates of three points)
    getDimensions(currentX, currentY) {
        const x1 = this.startX;
        const y1 = this.startY;

        const x2 = currentX;
        const y2 = this.startY;

        // Calculate the midpoint of the base for x3
        const x3 = (x1 + x2) / 2;
        const y3 = currentY; // The bottom vertex should be where the cursor is

        return { x1, y1, x2, y2, x3, y3 };
    }

    // Override to draw a triangle preview
    drawShapePreview(startX, startY, currentX, currentY) {
        const { x1, y1, x2, y2, x3, y3 } = this.getDimensions(currentX, currentY);

        // Create or update the preview element
        const points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;

        if (!this.previewElement) {
            this.previewElement = createSvgElement('polygon', {
                points: points,
                stroke: 'black',
                fill: 'transparent'
            });
            appendSvgElement(this.svgCanvas, this.previewElement);
        } else {
            this.previewElement.setAttribute('points', points);
        }
    }

    // Implement the createFinal method to create the triangle in the SVG canvas
    createFinal(currentX, currentY) {
        const { x1, y1, x2, y2, x3, y3 } = this.getDimensions(currentX, currentY);

        // Create an SVG 'polygon' element for the triangle
        const points = `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
        const attributes = {
            points: points,
            stroke: 'black',
            fill: 'transparent'
        };

        // Create and append the polygon to the SVG canvas
        const triangle = createSvgElement('polygon', attributes);
        appendSvgElement(this.svgCanvas, triangle);

        // Clean up the preview element
        if (this.previewElement) {
            this.svgCanvas.removeChild(this.previewElement);
            this.previewElement = null;
        }
    }
}
