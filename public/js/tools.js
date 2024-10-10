export class Tool {
    constructor(name, tempCanvas, svgCanvas) {
      this.name = name;
      this.tempCanvas = tempCanvas; // The temporary canvas used for drawing
      this.svgCanvas = svgCanvas;   // The SVG where final elements are stored
    }
  
    onMouseDown(event, ctx) {
      console.log(`${this.name} tool activated with mouse down.`);
    }
  
    onMouseMove(event, ctx) {
      console.log(`${this.name} tool mouse move.`);
    }
  
    onMouseUp(event, ctx) {
      console.log(`${this.name} tool mouse up.`);
    }
  }
  
  export class RectangleTool extends Tool {
    onMouseDown(event, ctx) {
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      console.log('Rectangle drawing started.');
    }
  
    onMouseMove(event, ctx) {
      if (this.startX !== undefined && this.startY !== undefined) {
        const currentX = event.offsetX;
        const currentY = event.offsetY;
        const width = currentX - this.startX;
        const height = currentY - this.startY;
  
        // Clear the canvas and draw the temporary rectangle
        ctx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.startX, this.startY, width, height);
      }
    }
  
    onMouseUp(event, ctx) {
      const currentX = event.offsetX;
      const currentY = event.offsetY;
      const width = currentX - this.startX;
      const height = currentY - this.startY;
  
      // Create the final SVG rectangle and append it to the SVG canvas
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', Math.min(currentX, this.startX));
      rect.setAttribute('y', Math.min(currentY, this.startY));
      rect.setAttribute('width', Math.abs(width));
      rect.setAttribute('height', Math.abs(height));
      rect.setAttribute('stroke', 'black');
      rect.setAttribute('fill', 'transparent');
  
      this.svgCanvas.appendChild(rect);
  
      console.log('Rectangle drawing ended.');
  
      // Reset the starting coordinates
      this.startX = undefined;
      this.startY = undefined;
    }
  }
  
  export class EllipseTool extends Tool {
    onMouseDown(event, ctx) {
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      console.log('Ellipse drawing started.');
    }
  
    onMouseMove(event, ctx) {
      if (this.startX !== undefined && this.startY !== undefined) {
        const currentX = event.offsetX;
        const currentY = event.offsetY;
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (currentX + this.startX) / 2;
        const centerY = (currentY + this.startY) / 2;
  
        // Clear the canvas and draw the temporary ellipse
        ctx.clearRect(0, 0, this.tempCanvas.width, this.tempCanvas.height);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  
    onMouseUp(event, ctx) {
      const currentX = event.offsetX;
      const currentY = event.offsetY;
      const radiusX = Math.abs(currentX - this.startX) / 2;
      const radiusY = Math.abs(currentY - this.startY) / 2;
      const centerX = (currentX + this.startX) / 2;
      const centerY = (currentY + this.startY) / 2;
  
      // Create the final SVG ellipse and append it to the SVG canvas
      const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      ellipse.setAttribute('cx', centerX);
      ellipse.setAttribute('cy', centerY);
      ellipse.setAttribute('rx', radiusX);
      ellipse.setAttribute('ry', radiusY);
      ellipse.setAttribute('stroke', 'black');
      ellipse.setAttribute('fill', 'transparent');
  
      this.svgCanvas.appendChild(ellipse);
  
      console.log('Ellipse drawing ended.');
  
      // Reset the starting coordinates
      this.startX = undefined;
      this.startY = undefined;
    }
  }
  