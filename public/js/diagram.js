import { drawRectangle, createSvgRectangle, drawEllipse, createSvgEllipse, clearCanvas } from './draw.js';

document.addEventListener('DOMContentLoaded', function () {
  const tempCanvas = document.getElementById('tempCanvas');
  const svgCanvas = document.getElementById('diagramSvg');
  const ctx = tempCanvas.getContext('2d');
  let selectedTool = null;
  let isDrawing = false;
  let startX = 0;
  let startY = 0;

  // Tool selection logic remains the same
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
    });
  });

  // Event handlers for canvas drawing actions
  tempCanvas.addEventListener('mousedown', (e) => {
    if (selectedTool) {
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
});
