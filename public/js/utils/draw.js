// draw.js
// Utility functions to draw previews on canvas or create SVG elements

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

export {
    drawRectangle,
    drawEllipse,
    drawTriangle
};