import Shape from './Shape.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Ellipse extends Shape {
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
        const x = centerX - radiusX;
        const y = centerY - radiusY;
        const width = radiusX * 2;
        const height = radiusY * 2;

        // Create or update the preview element
        if (!this.previewElement) {
            this.previewElement = createSvgElement('ellipse', {
                cx: centerX,
                cy: centerY,
                rx: radiusX,
                ry: radiusY,
                stroke: 'black',
                fill: 'transparent'
            });
            appendSvgElement(this.svgCanvas, this.previewElement);
        } else {
            this.previewElement.setAttribute('cx', centerX);
            this.previewElement.setAttribute('cy', centerY);
            this.previewElement.setAttribute('rx', radiusX);
            this.previewElement.setAttribute('ry', radiusY);
        }
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

        // Remove the preview element after finalizing
        if (this.previewElement) {
            this.previewElement.remove();
            this.previewElement = null;
        }
    }
}
