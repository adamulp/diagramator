// diagram.js
import { 
    drawRectangle, 
    createSvgRectangle, 
    drawEllipse, 
    createSvgEllipse, 
    drawTriangle, 
    createSvgTriangle, 
    clearCanvas 
} from './draw.js';

document.addEventListener('DOMContentLoaded', function () {
    const tempCanvas = document.getElementById('tempCanvas');
    const svgCanvas = document.getElementById('diagramSvg');
    const ctx = tempCanvas.getContext('2d');
    let selectedTool = null;
    let isDrawing = false;
    let isDragging = false;
    let selectedElement = null;
    let startX = 0;
    let startY = 0;

    // Function to synchronize canvas size with displayed size
    function resizeCanvas() {
        tempCanvas.width = tempCanvas.clientWidth;
        tempCanvas.height = tempCanvas.clientHeight;
    }

    // Function to synchronize SVG size and viewBox with displayed size
    function resizeSVG() {
        const width = svgCanvas.clientWidth;
        const height = svgCanvas.clientHeight;
        svgCanvas.setAttribute('width', width);
        svgCanvas.setAttribute('height', height);
        svgCanvas.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }

    // Call resize functions on window resize and initially
    window.addEventListener('resize', () => {
        resizeCanvas();
        resizeSVG();
    });
    resizeCanvas();
    resizeSVG();

    // Tool selection logic
    document.querySelectorAll('.tool-icon').forEach((icon) => {
        icon.addEventListener('click', (e) => {
            const toolName = e.target.alt;

            if (toolName === 'Save') {
                saveAsSVG();
                return; // Skip selecting a drawing tool
            }

            // Deselect other tools and add 'selected' class to the clicked tool
            document.querySelectorAll('.tool-icon').forEach((t) => t.classList.remove('selected'));
            e.target.classList.add('selected');

            // Set the selected tool
            selectedTool = toolName;
            console.log(`Selected tool: ${toolName}`);

            // Enable or disable canvas interaction based on selected tool
            if (selectedTool === 'Pointer Tool') {
                tempCanvas.classList.add('disabled'); // Disable canvas interaction
                enablePointerInteractions(); // Allow SVG element selection
            } else {
                tempCanvas.classList.remove('disabled'); // Enable canvas for drawing
            }
        });
    });

    // Event handlers for canvas drawing actions
    tempCanvas.addEventListener('mousedown', (e) => {
        if (selectedTool && selectedTool !== 'Pointer Tool') {
            isDrawing = true;
            const rect = tempCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            console.log(`Mouse Down: startX=${startX}, startY=${startY}`);
        }
    });

    tempCanvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            if (selectedTool === 'Rectangle Tool') {
                drawRectangle(ctx, startX, startY, currentX, currentY);
            } else if (selectedTool === 'Ellipse Tool') {
                drawEllipse(ctx, startX, startY, currentX, currentY);
            } else if (selectedTool === 'Triangle Tool') {
                drawTriangle(ctx, startX, startY, currentX, currentY);
            }

            console.log(`Mouse Move: currentX=${currentX}, currentY=${currentY}`);
        }
    });

    tempCanvas.addEventListener('mouseup', (e) => {
        if (isDrawing) {
            const rect = tempCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            if (selectedTool === 'Rectangle Tool') {
                createSvgRectangle(svgCanvas, startX, startY, currentX, currentY);
            } else if (selectedTool === 'Ellipse Tool') {
                createSvgEllipse(svgCanvas, startX, startY, currentX, currentY);
            } else if (selectedTool === 'Triangle Tool') {
                createSvgTriangle(svgCanvas, startX, startY, currentX, currentY);
            }

            // Stop drawing and clear the temporary canvas
            isDrawing = false;
            clearCanvas(ctx);

            console.log(`Mouse Up: currentX=${currentX}, currentY=${currentY}`);
        }
    });

    // Save SVG Functionality
    function saveAsSVG() {
        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svgCanvas);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'diagram.svg';
        link.click();
        console.log('Diagram saved as diagram.svg');
    }

    // Enable pointer interactions for all SVG elements
    function enablePointerInteractions() {
        const svgElements = svgCanvas.querySelectorAll('*');
        svgElements.forEach((element) => {
            element.addEventListener('mousedown', startDrag);
        });
    }

    // Start dragging an element
    function startDrag(e) {
        if (selectedTool === 'Pointer Tool') {
            isDragging = true;
            selectedElement = e.target;
            const rect = svgCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;

            console.log(`Dragging started for: ${selectedElement.tagName}`);

            svgCanvas.addEventListener('mousemove', dragElement);
            svgCanvas.addEventListener('mouseup', endDrag);
        }
    }

    // Dragging the selected element
    function dragElement(e) {
        if (isDragging && selectedElement) {
            const rect = svgCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;

            const dx = currentX - startX;
            const dy = currentY - startY;

            if (selectedElement.tagName === 'rect') {
                const newX = parseFloat(selectedElement.getAttribute('x')) + dx;
                const newY = parseFloat(selectedElement.getAttribute('y')) + dy;
                selectedElement.setAttribute('x', newX);
                selectedElement.setAttribute('y', newY);
            } else if (selectedElement.tagName === 'ellipse') {
                const newCx = parseFloat(selectedElement.getAttribute('cx')) + dx;
                const newCy = parseFloat(selectedElement.getAttribute('cy')) + dy;
                selectedElement.setAttribute('cx', newCx);
                selectedElement.setAttribute('cy', newCy);
            } else if (selectedElement.tagName === 'polygon') {
                // For triangles (polygon), adjust all points
                const points = selectedElement.getAttribute('points').split(' ').map(point => {
                    const [x, y] = point.split(',').map(Number);
                    return `${x + dx},${y + dy}`;
                }).join(' ');
                selectedElement.setAttribute('points', points);
            }

            startX = currentX;
            startY = currentY;

            console.log(`Element moved to: ${selectedElement.tagName} (x: ${currentX}, y: ${currentY})`);
        }
    }

    // End dragging the selected element
    function endDrag() {
        isDragging = false;
        selectedElement = null;
        svgCanvas.removeEventListener('mousemove', dragElement);
        svgCanvas.removeEventListener('mouseup', endDrag);
        console.log('Dragging ended');
    }

    // Function to select an element (used by pointer tool)
    function selectElement(element) {
        // Deselect all elements
        const svgElements = svgCanvas.querySelectorAll('*');
        svgElements.forEach((el) => el.setAttribute('stroke', 'black'));

        // Highlight selected element
        element.setAttribute('stroke', 'blue');
        console.log(`Selected element: ${element.tagName}`);
    }
});
