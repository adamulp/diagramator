import Rectangle from './canvas/Rectangle.js';
import Ellipse from './canvas/Ellipse.js';
import Triangle from './canvas/Triangle.js';
import Actor from './canvas/Actor.js';
import PointerTool from './tooling/PointerTool.js';

document.addEventListener('DOMContentLoaded', function () {
    const tempCanvas = document.getElementById('tempCanvas');
    const svgCanvas = document.getElementById('diagramSvg');
    const ctx = tempCanvas.getContext('2d'); // Get 2D rendering context
    let selectedTool = null;
    let isDrawing = false;
    let startX = 0;
    let startY = 0;
    let selectedItem = null;

    // Tool selection logic
    document.querySelectorAll('.tool-icon').forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const toolName = e.target.alt;

            // Set the selected tool
            switch (toolName) {
                case 'Pointer Tool':
                    selectedTool = new PointerTool(ctx, svgCanvas);
                    break;
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
        });
    });

    // Start drawing on mouse down
    tempCanvas.addEventListener('mousedown', (e) => {
        // Check if PointerTool is selected
        if (selectedTool instanceof PointerTool) {
            const { offsetX, offsetY } = e;
            console.log(`Mouse down at (${offsetX}, ${offsetY})`);
            selectedItem = selectedTool.selectItemAt(offsetX, offsetY);
            if (selectedItem) {
                startX = offsetX;
                startY = offsetY;
                isDrawing = true;
                // Show console message that item has been selected
                console.log('Item has been selected.');
                return;
            }
        } else if (selectedTool) {
            isDrawing = true;
            const rect = tempCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            selectedTool.setStartCoords(startX, startY);
        }
    });

    // Draw preview on mouse move
    tempCanvas.addEventListener('mousemove', (e) => {
        if (isDrawing && selectedItem) {
            // Show console message that item is being moved
            console.log('Moving selected item');
            const { offsetX, offsetY } = e;
            const dx = offsetX - startX;
            const dy = offsetY - startY;
            selectedTool.moveItem(dx, dy);
            startX = offsetX;
            startY = offsetY;
            ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear temp canvas  
            return;
        }
        else if (isDrawing && selectedTool.hasPreview) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear temp canvas
            
            // Directly pass startX, startY, currentX, currentY to drawShapePreview
            selectedTool.drawShapePreview(startX, startY, currentX, currentY);
        }
    });

    // Finalize the shape on mouse up
    tempCanvas.addEventListener('mouseup', (e) => {
        isDrawing = false;
        if (isDrawing) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            if (selectedTool instanceof PointerTool) {
                // Logic for PointerTool
                if (selectedItem) {
                    selectedTool.finalizeMove();
                    selectedItem = null;
                }
            } else if (selectedTool) {
                // Logic for other tools
                selectedTool.createFinal(currentX, currentY); // Add shape to svgCanvas
            }

            ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear preview
        }
    });
});