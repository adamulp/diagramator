// draw.js
// Utility functions to draw and clear canvas or create SVG elements

function drawRectangle(ctx, startX, startY, currentX, currentY) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(startX, startY, width, height);
}

function drawEllipse(ctx, startX, startY, currentX, currentY) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const radiusX = Math.abs(currentX - startX) / 2;
    const radiusY = Math.abs(currentY - startY) / 2;
    const centerX = (currentX + startX) / 2;
    const centerY = (currentY + startY) / 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function drawTriangle(ctx, startX, startY, currentX, currentY) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(startX, currentY); // Left point
    ctx.lineTo(currentX, currentY); // Right point
    ctx.lineTo((startX + currentX) / 2, startY); // Top point
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function createSvgRectangle(svgCanvas, startX, startY, currentX, currentY) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', Math.min(startX, currentX));
    rect.setAttribute('y', Math.min(startY, currentY));
    rect.setAttribute('width', Math.abs(currentX - startX));
    rect.setAttribute('height', Math.abs(currentY - startY));
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('fill', 'transparent');
    
    // Add event listener for selection
    rect.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click event from reaching parent
        selectElement(rect);
    });

    svgCanvas.appendChild(rect);
}

function createSvgEllipse(svgCanvas, startX, startY, currentX, currentY) {
    const centerX = (currentX + startX) / 2;
    const centerY = (currentY + startY) / 2;
    const radiusX = Math.abs(currentX - startX) / 2;
    const radiusY = Math.abs(currentY - startY) / 2;
    
    const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    ellipse.setAttribute('cx', centerX);
    ellipse.setAttribute('cy', centerY);
    ellipse.setAttribute('rx', radiusX);
    ellipse.setAttribute('ry', radiusY);
    ellipse.setAttribute('stroke', 'black');
    ellipse.setAttribute('fill', 'transparent');
    
    // Add event listener for selection
    ellipse.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click event from reaching parent
        selectElement(ellipse);
    });

    svgCanvas.appendChild(ellipse);
}

function createSvgTriangle(svgCanvas, startX, startY, currentX, currentY) {
    const points = [
        [startX, currentY], // Left point
        [currentX, currentY], // Right point
        [(startX + currentX) / 2, startY] // Top point
    ];

    const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    triangle.setAttribute('points', points.map(point => point.join(',')).join(' '));
    triangle.setAttribute('stroke', 'black');
    triangle.setAttribute('fill', 'transparent');

    // Add event listener for selection
    triangle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click event from reaching parent
        selectElement(triangle);
    });

    svgCanvas.appendChild(triangle);
}

// A function to handle selecting an element
function selectElement(element) {
    // Set all elements to default state
    const svgElements = document.querySelectorAll('#diagramSvg > *');
    svgElements.forEach(el => el.setAttribute('stroke', 'black'));

    // Highlight selected element
    element.setAttribute('stroke', 'blue');
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export { 
    drawRectangle, 
    createSvgRectangle, 
    drawEllipse, 
    createSvgEllipse, 
    drawTriangle, 
    createSvgTriangle, 
    clearCanvas 
};
