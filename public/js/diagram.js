import CanvasItem from './canvas/CanvasItem.js';
import Shape from './canvas/Shape.js';
import Rectangle from './canvas/Rectangle.js';
import Ellipse from './canvas/Ellipse.js';
import Triangle from './canvas/Triangle.js';
import Actor from './canvas/Actor.js';
import PointerTool from './tooling/PointerTool.js';

document.addEventListener('DOMContentLoaded', function () {
    const svgCanvas = document.getElementById('svgCanvas');
    const svgLayer = document.getElementById('svgLayer');
    const svgContext = svgCanvas.getContext('2d'); // Get 2D rendering context
    let selectedTool = null;
    let isDrawing = false;
    let isMoving = false;
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
                    selectedTool = new PointerTool(svgContext, svgLayer);
                    break;
                case 'Rectangle Tool':
                    selectedTool = new Rectangle(svgContext, svgLayer);
                    break;
                case 'Ellipse Tool':
                    selectedTool = new Ellipse(svgContext, svgLayer);
                    break;
                case 'Triangle Tool':
                    selectedTool = new Triangle(svgContext, svgLayer);
                    break;
                case 'Actor Tool':
                    selectedTool = new Actor(svgContext, svgLayer);
                    break;
                default:
                    selectedTool = null;
            }
        });
    });

    // Start drawing on mouse down
    svgCanvas.addEventListener('mousedown', (e) => {
        // Check if PointerTool is selected
        if (selectedTool instanceof PointerTool) {
            const { offsetX, offsetY } = e;
            console.log(`Mouse down at (${offsetX}, ${offsetY})`);
            selectedItem = selectedTool.selectItemAt(offsetX, offsetY);

            if (!isMoving && selectedItem !== null) {
                isMoving = true;
                console.log('Item has been selected and is moving.');
            }

            if (isMoving) {
                startX = offsetX;
                startY = offsetY;
                return;
            }

        } else if (selectedTool instanceof CanvasItem) {
            isDrawing = true;
            const rect = svgCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            selectedTool.setStartCoords(startX, startY);
        }
    });

    // Draw preview on mouse move
    svgCanvas.addEventListener('mousemove', (e) => {
        if (isMoving) {
            console.log('Moving selected item');
            const { offsetX, offsetY } = e;
            const dx = offsetX - startX;
            const dy = offsetY - startY;
            selectedTool.moveItem(dx, dy);
            startX = offsetX;
            startY = offsetY;
        }
        if (isDrawing && selectedTool.hasPreview) {
            const rect = svgCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            svgContext.clearRect(0, 0, svgCanvas.width, svgCanvas.height);
            selectedTool.drawShape(startX, startY, currentX, currentY);
        }
    });

    // Finalize the shape on mouse up
    svgCanvas.addEventListener('mouseup', (e) => {
        if (isDrawing) {
            const rect = svgCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            if (selectedTool instanceof Shape) {
                selectedTool.drawShape(startX, startY, currentX, currentY);
            } else if (selectedTool instanceof Actor) {
                console.log(`startX=${startX}, startY=${startY}, currentX=${currentX}, currentY=${currentY}`);
                selectedTool.drawActor(startX, startY);
                selectedTool.svgGroup = null;
            }

            svgContext.clearRect(0, 0, svgCanvas.width, svgCanvas.height);
            selectedTool.previewElement = null;
        }
        if (isMoving) {
            selectedTool.finalizeMove();
        }
        isMoving = false;
        isDrawing = false;
    });
});