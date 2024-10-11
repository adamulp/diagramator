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
    drawShapePreview(startX, startY, currentX, currentY) {
        const x = (startX + currentX) / 2; // Calculate the center X
        const y = (startY + currentY) / 2; // Calculate the center Y
        const radiusX = Math.abs(currentX - startX) / 2; // Calculate the X radius
        const radiusY = Math.abs(currentY - startY) / 2; // Calculate the Y radius
    
        // Ensure the preview element exists or create it
        if (!this.previewElement) {
            this.previewElement = createSvgElement('ellipse', {
                cx: x,
                cy: y,
                rx: radiusX,
                ry: radiusY,
                stroke: 'black',
                fill: 'transparent'
            });
            appendSvgElement(this.svgCanvas, this.previewElement);
        } else {
            this.previewElement.setAttribute('cx', x);
            this.previewElement.setAttribute('cy', y);
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
