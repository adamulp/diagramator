export default class CanvasItem {
    constructor(svgContext, svgCanvas) {
        this.svgContext = svgContext;
        this.element = document.createElement('div');
        this.svgCanvas = svgCanvas;
        this.startX = 0;
        this.startY = 0;
        this.hasPreview = false;
        this.svgGroup = null;
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
        this.svgGroup = this.createSvgElement('g', attributes);
    }

    appendSvgElement(element) {
        this.svgGroup.appendChild(element);
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

export function createSvgElement(tag, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
}

// Create svg <g> group
export function createSvgGroup(parent, attributes) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            group.setAttribute(key, attributes[key]);
        }
    }
    parent.appendChild(group);
    return group;
}

// Append svg element to a group
export function appendSvgElement(svgGroup, element) {
    svgGroup.appendChild(element);
}

// Function to handle selecting an element
export function selectElement(element) {
    // Set all elements to default state
    const svgElements = document.querySelectorAll('#diagramSvg > *');
    svgElements.forEach(el => el.setAttribute('stroke', 'black'));

    // Highlight selected element
    element.setAttribute('stroke', 'blue');
}