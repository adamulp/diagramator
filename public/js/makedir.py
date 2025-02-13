import os


# TO DO: Create the directory structure and ensure all the necessary folders exist.
def create_directory_structure():
    """Creates the directory structure for the project."""
    os.makedirs('canvas', exist_ok=True)
    os.makedirs('utils', exist_ok=True)

    files = [
        'canvas/Actor.js',
        'canvas/CanvasItem.js',
        'canvas/Ellipse.js',
        'canvas/Rectangle.js',
        'canvas/Shape.js',
        'canvas/Triangle.js',
        'utils/SvgUtils.js',
        'diagram.js'
    ]

    for file in files:
        with open(file, 'w') as f:
            pass

# Update SvgUtils.js to include the selectElement function
def update_svg_utils():
    """Updates SvgUtils.js to include selection capabilities."""
    content = """
export function createSvgElement(type, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
}

export function appendSvgElement(svgCanvas, element) {
    svgCanvas.appendChild(element);
}

// Function to handle selecting an element
export function selectElement(element) {
    // Set all elements to default state
    const svgElements = document.querySelectorAll('#diagramSvg > *');
    svgElements.forEach(el => el.setAttribute('stroke', 'black'));

    // Highlight selected element
    element.setAttribute('stroke', 'blue');
}
"""
    with open('utils/SvgUtils.js', 'w') as f:
        f.write(content.strip())
# TO DO: Write the base CanvasItem class to be used for other shapes
def write_canvas_item():
    """Writes content to CanvasItem.js."""
    content = """
export default class CanvasItem {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.svgCanvas = svgCanvas;
        this.startX = 0;
        this.startY = 0;
    }

    setStartCoords(x, y) {
        this.startX = x;
        this.startY = y;
    }
}
"""
    with open('canvas/CanvasItem.js', 'w') as f:
        f.write(content.strip())

# TO DO: Define the Rectangle class, inheriting from CanvasItem
def write_rectangle():
    """Writes content to Rectangle.js."""
    content = """
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Rectangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        // TO DO: Draw a preview of the rectangle on the temporary canvas.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    createFinal(currentX, currentY) {
        // TO DO: Create the final SVG rectangle and append it to the SVG canvas.
        const attributes = {
            x: Math.min(this.startX, currentX),
            y: Math.min(this.startY, currentY),
            width: Math.abs(currentX - this.startX),
            height: Math.abs(currentY - this.startY),
            stroke: 'black',
            fill: 'transparent'
        };
        const rect = createSvgElement('rect', attributes);
        appendSvgElement(this.svgCanvas, rect);
    }
}
"""
    with open('canvas/Rectangle.js', 'w') as f:
        f.write(content.strip())

# TO DO: Define the Ellipse class, inheriting from CanvasItem
def write_ellipse():
    """Writes content to Ellipse.js."""
    content = """
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Ellipse extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        // TO DO: Draw a preview of the ellipse on the temporary canvas.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (currentX + this.startX) / 2;
        const centerY = (currentY + this.startY) / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    createFinal(currentX, currentY) {
        // TO DO: Create the final SVG ellipse and append it to the SVG canvas.
        const attributes = {
            cx: (currentX + this.startX) / 2,
            cy: (currentY + this.startY) / 2,
            rx: Math.abs(currentX - this.startX) / 2,
            ry: Math.abs(currentY - this.startY) / 2,
            stroke: 'black',
            fill: 'transparent'
        };
        const ellipse = createSvgElement('ellipse', attributes);
        appendSvgElement(this.svgCanvas, ellipse);
    }
}
"""
    with open('canvas/Ellipse.js', 'w') as f:
        f.write(content.strip())

# TO DO: Define the Actor class, inheriting from CanvasItem
def write_actor():
    """Writes content to Actor.js."""
    content = """
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Actor extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    createFinal(x, y) {
        // TO DO: Create the actor SVG group, including head, body, arms, and legs.
        const actorGroup = createSvgElement('g', {
            class: 'actor',
            transform: `translate(${x}, ${y})`,
            stroke: 'black',
            fill: 'transparent'
        });

        // TO DO: Add the head to the actor group.
        const head = createSvgElement('circle', {
            cx: '0',
            cy: '-30',
            r: '15',
            stroke: 'black',
            fill: 'white'
        });

        // TO DO: Add the body to the actor group.
        const body = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '0',
            y2: '20',
            stroke: 'black'
        });

        // Append elements to actor group
        appendSvgElement(actorGroup, head);
        appendSvgElement(actorGroup, body);

        // TO DO: Add arms and legs similarly...

        appendSvgElement(this.svgCanvas, actorGroup);
    }
}
"""
    with open('canvas/Actor.js', 'w') as f:
        f.write(content.strip())

# TO DO: Fill out the full implementation of write_triangle function.
def write_triangle():
    """Writes content to Triangle.js."""
    content = """
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Triangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        // TO DO: Implement the method to draw a preview of a triangle.
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, currentY); // Left point
        this.ctx.lineTo(currentX, currentY); // Right point
        this.ctx.lineTo((this.startX + currentX) / 2, this.startY); // Top point
        this.ctx.closePath();
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    createFinal(currentX, currentY) {
        // TO DO: Implement the method to create the final SVG triangle.
        const points = `${this.startX},${this.startY} ${currentX},${currentY} ${this.startX - (currentX - this.startX)},${currentY}`;
        const attributes = {
            points: points,
            stroke: 'black',
            fill: 'transparent'
        };
        const polygon = createSvgElement('polygon', attributes);
        appendSvgElement(this.svgCanvas, polygon);
    }
}
"""
    with open('canvas/Triangle.js', 'w') as f:
        f.write(content.strip())

# TO DO: Consider adding common methods for shapes that might be shared across multiple shape types.
def write_shape():
    """Writes content to Shape.js."""
    content = """
import CanvasItem from './CanvasItem.js';

export default class Shape extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    // Common methods for shapes can be added here in the future
}
"""
    with open('canvas/Shape.js', 'w') as f:
        f.write(content.strip())

# TO DO: Add event handlers for all types of tools and shapes in diagram.js.
def write_diagram():
    """Writes content to diagram.js."""
    content = """
import Rectangle from './canvas/Rectangle.js';
import Ellipse from './canvas/Ellipse.js';
import Triangle from './canvas/Triangle.js';
import Actor from './canvas/Actor.js';

// diagram.js code with appropriate changes and imports

document.addEventListener('DOMContentLoaded', function () {
    const tempCanvas = document.getElementById('tempCanvas');
    const svgCanvas = document.getElementById('diagramSvg');
    const ctx = tempCanvas.getContext('2d');
    let selectedTool = null;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    // TO DO: Add more tools to the tool selection logic.
    // Tool selection logic
    document.querySelectorAll('.tool-icon').forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const toolName = e.target.alt;

            // Set the selected tool
            switch (toolName) {
                case 'Rectangle Tool':
                    selectedTool = new Rectangle(ctx, svgCanvas);
                    break;
                case 'Ellipse Tool':
                    selectedTool = new Ellipse(ctx, svgCanvas);
                    break;
                case 'Triangle Tool':
                    selectedTool = new Triangle(ctx, svgCanvas);
                    break;
                case 'Actor Tool':
                    selectedTool = new Actor(ctx, svgCanvas);
                    break;
                default:
                    selectedTool = null;
            }
            console.log(`Selected tool: ${toolName}`);
        });
    });

    // TO DO: Update mouse event handlers to include all possible interactions.
    // Event handlers for canvas drawing actions
    tempCanvas.addEventListener('mousedown', (e) => {
        if (selectedTool) {
            isDrawing = true;
            const rect = tempCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            selectedTool.setStartCoords(startX, startY);
            console.log(`Mouse Down: startX=${startX}, startY=${startY}`);
        }
    });

    tempCanvas.addEventListener('mousemove', (e) => {
        if (isDrawing && selectedTool) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            selectedTool.drawPreview(currentX, currentY); // TO DO: Ensure drawPreview is correctly implemented for all shapes.
            console.log(`Mouse Move: currentX=${currentX}, currentY=${currentY}`);
        }
    });

    tempCanvas.addEventListener('mouseup', (e) => {
        if (isDrawing && selectedTool) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            selectedTool.createFinal(currentX, currentY); // TO DO: Ensure createFinal is working correctly for all shapes.
            isDrawing = false;
            console.log(`Mouse Up: currentX=${currentX}, currentY=${currentY}`);
        }
    });
});
"""
    with open('diagram.js', 'w') as f:
        f.write(content.strip())

# TO DO: Add logic for missing shape classes and their unique properties.
def main():
    update_svg_utils()

if __name__ == "__main__":
    main()
