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

function createSvgActor(svgCanvas, x, y) {
    const actorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    actorGroup.setAttribute('class', 'actor');
    actorGroup.setAttribute('transform', `translate(${x}, ${y})`);
    actorGroup.setAttribute('stroke', 'black');
    actorGroup.setAttribute('fill', 'transparent');

    // Head
    const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute('cx', '0');
    head.setAttribute('cy', '-30');
    head.setAttribute('r', '15');
    head.setAttribute('stroke', 'black');
    head.setAttribute('fill', 'white');
    actorGroup.appendChild(head);

    // Body
    const body = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    body.setAttribute('x1', '0');
    body.setAttribute('y1', '-15');
    body.setAttribute('x2', '0');
    body.setAttribute('y2', '30');
    body.setAttribute('stroke', 'black');
    actorGroup.appendChild(body);

    // Left Arm
    const leftArm = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftArm.setAttribute('x1', '0');
    leftArm.setAttribute('y1', '0');
    leftArm.setAttribute('x2', '-20');
    leftArm.setAttribute('y2', '10');
    leftArm.setAttribute('stroke', 'black');
    actorGroup.appendChild(leftArm);

    // Right Arm
    const rightArm = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightArm.setAttribute('x1', '0');
    rightArm.setAttribute('y1', '0');
    rightArm.setAttribute('x2', '20');
    rightArm.setAttribute('y2', '10');
    rightArm.setAttribute('stroke', 'black');
    actorGroup.appendChild(rightArm);

    // Left Leg
    const leftLeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    leftLeg.setAttribute('x1', '0');
    leftLeg.setAttribute('y1', '30');
    leftLeg.setAttribute('x2', '-15');
    leftLeg.setAttribute('y2', '60');
    leftLeg.setAttribute('stroke', 'black');
    actorGroup.appendChild(leftLeg);

    // Right Leg
    const rightLeg = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    rightLeg.setAttribute('x1', '0');
    rightLeg.setAttribute('y1', '30');
    rightLeg.setAttribute('x2', '15');
    rightLeg.setAttribute('y2', '60');
    rightLeg.setAttribute('stroke', 'black');
    actorGroup.appendChild(rightLeg);

    // Add Label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', '0');
    label.setAttribute('y', '75');
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '14px');
    label.textContent = 'Actor';
    actorGroup.appendChild(label);

    // Add event listener for selection
    actorGroup.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent click event from reaching parent
        selectElement(actorGroup);
    });

    svgCanvas.appendChild(actorGroup);
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
    createSvgActor,
    clearCanvas 
};
