export default class CanvasItem {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.element = document.createElement('div');
        this.svgCanvas = svgCanvas;
        this.startX = 0;
        this.startY = 0;
        this.hasPreview = false;
    }

    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
    }

    // Add css class canvas-item to the element
    addCanvasItemCssClass() {
        this.element.classList.add('canvas-item');
    }




    // Method to handle selecting an element
    selectElement(element) {
        // Set all elements to default state
        this.svgCanvas.childNodes.forEach((child) => {
            child.setAttribute('stroke', 'black');
        });

        // Set the selected element to a different color
        element.setAttribute('stroke', 'blue');

    }
    
}