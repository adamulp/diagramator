// Create svg element
export function createSvgElement(tag, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
}

// Create svg <g> group
export function createSvgGroup(attrributes) {
    const group = createSvgElement('g', attrributes);
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