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
        if (isDrawing && selectedTool.hasPreview) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear the canvas before drawing the preview
            selectedTool.drawPreview(currentX, currentY);
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