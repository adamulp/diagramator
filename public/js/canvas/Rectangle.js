import Shape from './Shape.js';
import { createSvgElement, appendSvgElement, createSvgGroup } from '../utils/SvgUtils.js';

export default class Rectangle extends Shape {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
        this.previewElement = null; // Store the preview element
        this.startX = 0;
        this.startY = 0;
    }

    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
    }

    // Calculate dimensions of rectangles from current mouse position
    getDimensions(currentX, currentY) {
        return {
            startX: this.startX,
            startY: this.startY,
            width: currentX - this.startX,
            height: currentY - this.startY
        };
    }

    // Override to draw a rectangle preview
    drawShape(startX, startY, currentX, currentY) {
        const x = Math.min(startX, currentX);
        const y = Math.min(startY, currentY);
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        // Debugging logs
        console.log(`Drawing preview: startX=${startX}, startY=${startY}, currentX=${currentX}, currentY=${currentY}`);
        console.log(`Calculated dimensions: x=${x}, y=${y}, width=${width}, height=${height}`);

        // Create or update the preview element
        if (!this.previewElement) {
            this.previewElement = createSvgElement('rect', {
                x: x,
                y: y,
                width: width,
                height: height,
                stroke: 'black',
                fill: 'transparent'
            });
            appendSvgElement(this.svgCanvas, this.previewElement);
        } else {
            this.previewElement.setAttribute('x', x);
            this.previewElement.setAttribute('y', y);
            this.previewElement.setAttribute('width', width);
            this.previewElement.setAttribute('height', height);
        }
    }

}