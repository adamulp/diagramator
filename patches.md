## Full Manual Changes with Versions and File Alignment

Let’s focus on making complete, versioned changes to avoid misalignment and confusion. I will outline all changes clearly for each file so you can work seamlessly, without having to piece things together. This way, every edit is easy to follow, versioned, and applied in full.

### Step 1: Complete Version Updates for Each File

#### File 1: `style.sass` (Full Updated Version)

Replace the entire `public/styles/style.sass` file content with the following:

```sass
html, body
  height: 100%
  margin: 0
  padding: 0
  font-family: Arial, sans-serif
  background-color: #f0f0f0

.layout-container
  display: flex
  height: 100vh // Full viewport height

.toolbar
  width: 80px // Adjust to fit your icons comfortably
  background-color: #333
  color: #fff
  padding: 1rem
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem // Adds spacing between the toolbar icons

  img.tool-icon
    width: 40px
    height: 40px
    cursor: pointer
    transition: transform 0.2s

    &:hover
      transform: scale(1.1)

.canvas-wrapper
  position: relative
  width: 100%
  height: 100%

  canvas#tempCanvas
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: transparent
    z-index: 1
    &.disabled
      pointer-events: none // Prevent canvas from blocking interaction when disabled

  svg#diagramSvg
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 2

    // Style for actor groups
    g.actor
      cursor: pointer
      transition: transform 0.2s, stroke 0.2s

      &:hover
        stroke: blue // Hover state to indicate interactivity

      &.selected
        stroke: blue
        fill: rgba(0, 0, 255, 0.1) // Light blue fill to indicate selection

    // Adding consistent styles to lines, circles, and other shapes in actors
    line, circle, text
      pointer-events: visiblePainted // Allow clicks on all painted elements

    // Bounding box for selection
    rect.bounding-box
      fill: transparent
      stroke: blue
      stroke-dasharray: 5, 5
      pointer-events: none // Bounding box is for visual purposes only
```

### Step 2: Full JavaScript Updates with Context

#### File 2: `diagram.js` (Full Updated Version)

Replace the entire content of `public/js/diagram.js` with:

```javascript
import {
  drawRectangle,
  createSvgRectangle,
  drawEllipse,
  createSvgEllipse,
  drawTriangle,
  createSvgTriangle,
  createSvgActor,
  clearCanvas,
} from "./draw.js";

document.addEventListener("DOMContentLoaded", function () {
  const tempCanvas = document.getElementById("tempCanvas");
  const svgCanvas = document.getElementById("diagramSvg");
  let ctx = tempCanvas.getContext("2d");
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
    svgCanvas.setAttribute("width", width);
    svgCanvas.setAttribute("height", height);
    svgCanvas.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  // Call resize functions on window resize and initially
  window.addEventListener("resize", () => {
    resizeCanvas();
    resizeSVG();
    ctx = tempCanvas.getContext("2d"); // Ensure the context is always correct after resizing
  });
  resizeCanvas();
  resizeSVG();

  // Tool selection logic
  document.querySelectorAll(".tool-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const toolName = e.target.alt;

      if (toolName === "Save") {
        saveAsSVG();
        return; // Skip selecting a drawing tool
      }

      // Deselect other tools and add 'selected' class to the clicked tool
      document
        .querySelectorAll(".tool-icon")
        .forEach((t) => t.classList.remove("selected"));
      e.target.classList.add("selected");

      // Set the selected tool
      selectedTool = toolName;
      console.log(`Selected tool: ${toolName}`);

      // Enable or disable canvas interaction based on selected tool
      if (selectedTool === "Pointer Tool") {
        tempCanvas.classList.add("disabled"); // Disable canvas interaction
        enablePointerInteractions(); // Allow SVG element selection
      } else {
        tempCanvas.classList.remove("disabled"); // Enable canvas for drawing
        disablePointerInteractions(); // Disable pointer interactions
        ctx = tempCanvas.getContext("2d"); // Ensure canvas context is correct
      }
    });
  });

  // Event handlers for canvas drawing actions
  tempCanvas.addEventListener("mousedown", (e) => {
    if (selectedTool && selectedTool !== "Pointer Tool") {
      isDrawing = true;
      const rect = tempCanvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      console.log(`Mouse Down: startX=${startX}, startY=${startY}`);
    }
  });

  tempCanvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
      const rect = tempCanvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (selectedTool === "Rectangle Tool") {
        drawRectangle(ctx, startX, startY, currentX, currentY);
      } else if (selectedTool === "Ellipse Tool") {
        drawEllipse(ctx, startX, startY, currentX, currentY);
      }

      console.log(`Mouse Move: currentX=${currentX}, currentY=${currentY}`);
    }
  });

  tempCanvas.addEventListener("mouseup", (e) => {
    if (isDrawing) {
      const rect = tempCanvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      if (selectedTool === "Rectangle Tool") {
        createSvgRectangle(svgCanvas, startX, startY, currentX, currentY);
      } else if (selectedTool === "Ellipse Tool") {
        createSvgEllipse(svgCanvas, startX, startY, currentX, currentY);
      }

      // Stop drawing and clear the temporary canvas
      isDrawing = false;
      ctx = tempCanvas.getContext("2d"); // Ensure context after clearing
      clearCanvas(ctx);

      console.log(`Mouse Up: currentX=${currentX}, currentY=${currentY}`);
    }
  });

  // Enable pointer interactions for all SVG elements
  function enablePointerInteractions() {
    const svgElements = svgCanvas.querySelectorAll("*");
    svgElements.forEach((element) => {
      element.addEventListener("mousedown", startDrag);
    });
  }

  // Disable pointer interactions
  function disablePointerInteractions() {
    const svgElements = svgCanvas.querySelectorAll("*");
    svgElements.forEach((element) => {
      element.removeEventListener("mousedown", startDrag);
    });
  }

  // Start dragging an element
  function startDrag(e) {
    if (selectedTool === "Pointer Tool") {
      isDragging = true;
      selectedElement = e.target.closest(
        "g, rect, ellipse, polygon, line, circle, text"
      ); // Include group elements
      if (!selectedElement) return; // Clicked on empty space

      const rect = svgCanvas.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;

      console.log(`Dragging started for: ${selectedElement.tagName}`);

      svgCanvas.addEventListener("mousemove", dragElement);
      svgCanvas.addEventListener("mouseup", endDrag);
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

      if (selectedElement.tagName === "g") {
        const transform = selectedElement.transform.baseVal.getItem(0);
        transform.setTranslate(
          transform.matrix.e + dx,
          transform.matrix.f + dy
        );
      }

      startX = currentX;
      startY = currentY;

      console.log(
        `Element moved to: ${selectedElement.tagName} (x: ${currentX}, y: ${currentY})`
      );
    }
  }

  // End dragging the selected element
  function endDrag() {
    isDragging = false;
    selectedElement = null;
    svgCanvas.removeEventListener("mousemove", dragElement);
    svgCanvas.removeEventListener("mouseup", endDrag);
    console.log("Dragging ended");
  }
});
```

### Summary

- **Full File Versions**: Provided full versions of `style.sass` and `diagram.js` for better clarity.
- **No Patches**: Replace the file contents completely to ensure alignment, preserving all features.

Let me know if this approach works better for you, or if you need further modifications or support!
