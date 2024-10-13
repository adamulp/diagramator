export default class CanvasItem {
    constructor(svgContext, svgCanvas) {
        this.svgContext = svgContext;
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

    // Change ctx
    setSvgcontext(svgContext) {
        this.svgContext = svgContext;
    }
    
    createSvgElement(elementType, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', elementType);
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
        return element;
    }

    createSvgGroup(attributes) {
        return this.createSvgElement('g', attributes);
    }

    appendSvgElement(svgGroup, element) {
        svgGroup.appendChild(element);
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