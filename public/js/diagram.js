// public/js/diagram.js

document.addEventListener('DOMContentLoaded', function () {
    const tools = document.querySelectorAll('.tool-icon');
    let selectedTool = null;
  
    tools.forEach(tool => {
      tool.addEventListener('click', (event) => {
        tools.forEach(t => t.classList.remove('selected'));
        event.target.classList.add('selected');
        selectedTool = event.target.alt; // For example, 'Arrow Tool'
        console.log(`Selected tool: ${selectedTool}`);
      });
    });
  
    const canvas = document.getElementById('diagramCanvas');
    const ctx = canvas.getContext('2d');
  
    // Example of using the selected tool to draw
    canvas.addEventListener('mousedown', (e) => {
      if (selectedTool === 'Line Tool') {
        // Implement logic to start drawing a line
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
        canvas.addEventListener('mousemove', drawLine);
      }
    });
  
    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', drawLine);
    });
  
    function drawLine(e) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  });
  