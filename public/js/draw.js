// Utility functions to draw and clear canvas or create SVG elements

function drawRectangle(ctx, startX, startY, currentX, currentY) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const width = currentX - startX;
    const height = currentY - startY;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(startX, startY, width, height);
  }
  
  function createSvgRectangle(svgCanvas, startX, startY, currentX, currentY) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', Math.min(startX, currentX));
    rect.setAttribute('y', Math.min(startY, currentY));
    rect.setAttribute('width', Math.abs(currentX - startX));
    rect.setAttribute('height', Math.abs(currentY - startY));
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('fill', 'transparent');
    svgCanvas.appendChild(rect);
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
    svgCanvas.appendChild(ellipse);
  }
  
  function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  
  export { drawRectangle, createSvgRectangle, drawEllipse, createSvgEllipse, clearCanvas };
  