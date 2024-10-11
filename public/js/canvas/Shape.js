import CanvasItem from './CanvasItem.js';

export default class Shape extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
        this.hasPreview = true;
    }
    // Abstract method for getting dimensions (must be overridden by subclasses)
    getDimensions(currentX, currentY) {
        throw new Error('getDimensions() must be implemented by the shape subclass');
    }

    // Abstract method for drawing the shape (must be overridden by subclasses)
    drawShapePreview(startX, startY, width, height) {
        throw new Error('drawShapePreview() must be implemented by the shape subclass');
    }

    // Add event listener for selection
    addSelectionListener(element) {
        element.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click event from reaching parent
            this.selectElement(element); // Bind to correct this
        });
    }

    // Method to handle selecting an element
    selectElement(element) {
        // Set all elements to default stroke color
        this.svgCanvas.childNodes.forEach((child) => {
            child.setAttribute('stroke', 'black');
        });

        // Set the selected element's stroke to blue
        element.setAttribute('stroke', 'blue');
    }

    // Abstract method for finalizing the shape (must be overridden by subclasses)
    createFinal(currentX, currentY) {
        throw new Error('createFinal() must be implemented by the shape subclass');
    }
}
