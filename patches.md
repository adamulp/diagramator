## Refactoring Project File Structure with Object-Oriented Design

Let's take a fresh approach by refactoring the project into a more maintainable, object-oriented structure. This change will split classes into separate files for better modularity, which will make development more sustainable in the long run.

### Proposed File Structure

```
.
├── app.js
├── LICENSE
├── package.json
├── package-lock.json
├── public
│   ├── icons
│   ├── js
│   │   ├── main.js (Entry point for JavaScript)
│   │   ├── classes
│   │   │   ├── ObjectDrawing.js
│   │   │   ├── SvgObject.js
│   │   │   ├── CanvasItem.js
│   │   │   ├── Rectangle.js
│   │   │   ├── Ellipse.js
│   │   │   ├── Triangle.js
│   │   │   └── Actor.js
│   └── styles
│       ├── style.css
│       ├── style.css.map
│       └── style.sass
├── README.md
└── views
    ├── index.pug
    └── tools.pug
```

### Explanation of Classes

1. **ObjectDrawing**: Manages the drawing logic on the HTML canvas element (`tempCanvas`), primarily for preview while drawing.
2. **SvgObject**: Manages the creation and manipulation of SVG elements for the finalized version of the drawing.
3. **CanvasItem**: Combines both `ObjectDrawing` and `SvgObject` attributes to provide a complete representation of an item that can be drawn on the canvas and represented as SVG.
4. **Rectangle, Ellipse, Triangle, Actor**: Specific item classes that inherit from `CanvasItem` and add specialized behaviors for each shape.

### Implementation Details

#### 1. `ObjectDrawing.js`

```javascript
export default class ObjectDrawing {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawRectangle(startX, startY, currentX, currentY) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const width = currentX - startX;
    const height = currentY - startY;
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(startX, startY, width, height);
  }

  drawEllipse(startX, startY, currentX, currentY) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const radiusX = Math.abs(currentX - startX) / 2;
    const radiusY = Math.abs(currentY - startY) / 2;
    const centerX = (currentX + startX) / 2;
    const centerY = (currentY + startY) / 2;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }
  // More drawing methods for other shapes can go here...
}
```

#### 2. `SvgObject.js`

```javascript
export default class SvgObject {
  constructor(svgCanvas) {
    this.svgCanvas = svgCanvas;
  }

  createSvgRectangle(startX, startY, currentX, currentY) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", Math.min(startX, currentX));
    rect.setAttribute("y", Math.min(startY, currentY));
    rect.setAttribute("width", Math.abs(currentX - startX));
    rect.setAttribute("height", Math.abs(currentY - startY));
    rect.setAttribute("stroke", "black");
    rect.setAttribute("fill", "transparent");
    this.svgCanvas.appendChild(rect);
    return rect;
  }

  createSvgEllipse(startX, startY, currentX, currentY) {
    const ellipse = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "ellipse"
    );
    const centerX = (currentX + startX) / 2;
    const centerY = (currentY + startY) / 2;
    const radiusX = Math.abs(currentX - startX) / 2;
    const radiusY = Math.abs(currentY - startY) / 2;
    ellipse.setAttribute("cx", centerX);
    ellipse.setAttribute("cy", centerY);
    ellipse.setAttribute("rx", radiusX);
    ellipse.setAttribute("ry", radiusY);
    ellipse.setAttribute("stroke", "black");
    ellipse.setAttribute("fill", "transparent");
    this.svgCanvas.appendChild(ellipse);
    return ellipse;
  }
  // More creation methods for other shapes can go here...
}
```

#### 3. `CanvasItem.js`

```javascript
import ObjectDrawing from "./ObjectDrawing.js";
import SvgObject from "./SvgObject.js";

export default class CanvasItem {
  constructor(ctx, svgCanvas) {
    this.drawing = new ObjectDrawing(ctx);
    this.svgObject = new SvgObject(svgCanvas);
  }
}
```

#### 4. Shape Classes (`Rectangle.js`, `Ellipse.js`, `Triangle.js`, `Actor.js`)

##### `Rectangle.js`

```javascript
import CanvasItem from "./CanvasItem.js";

export default class Rectangle extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  drawPreview(startX, startY, currentX, currentY) {
    this.drawing.drawRectangle(startX, startY, currentX, currentY);
  }

  createFinal(startX, startY, currentX, currentY) {
    return this.svgObject.createSvgRectangle(
      startX,
      startY,
      currentX,
      currentY
    );
  }
}
```

##### `Ellipse.js`

```javascript
import CanvasItem from "./CanvasItem.js";

export default class Ellipse extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  drawPreview(startX, startY, currentX, currentY) {
    this.drawing.drawEllipse(startX, startY, currentX, currentY);
  }

  createFinal(startX, startY, currentX, currentY) {
    return this.svgObject.createSvgEllipse(startX, startY, currentX, currentY);
  }
}
```

### Summary of Changes

- **Refactor into Classes**: We split logic into different classes and placed them in individual files for better modularity.
- **Unified `CanvasItem` Class**: Combines the `ObjectDrawing` and `SvgObject` classes.
- **Shape-Specific Classes**: Inherit from `CanvasItem` for specific drawing and creation behavior (e.g., `Rectangle`, `Ellipse`).
- **New File Structure**: Each shape now has its own file, making it easier to manage and expand functionality.

This approach will make development more manageable, enable easier debugging, and facilitate extensions in the future. Let me know if you need specific code details or further customization!
