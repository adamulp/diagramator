export default class CanvasItem {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.svgCanvas = svgCanvas;
        this.startX = 0;
        this.startY = 0;
        this.hasPreview = false;
    }

    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
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