## Refactoring Project File Structure with Object-Oriented Design

Let's take a fresh approach by refactoring the project into a more maintainable, object-oriented structure. This change will split classes into separate files for better modularity, which will make development more sustainable in the long run.

### Updated File Structure

```
.
├── app.js
├── LICENSE
├── package.json
├── public
│   ├── js
│   │   ├── main.js                 # Main entry point handling events, setup, etc.
│   │   ├── canvas                  # Modularized canvas components
│   │   │   ├── CanvasItem.js       # Base class for drawable items
│   │   │   ├── Shape.js            # General shape-handling utilities (base class)
│   │   │   ├── Rectangle.js        # Rectangle shape logic
│   │   │   ├── Ellipse.js          # Ellipse shape logic
│   │   │   ├── Triangle.js         # Triangle shape logic
│   │   │   └── Actor.js            # Actor-specific shape logic
│   │   └── utils
│   │       └── SvgUtils.js         # SVG utility functions for creating/modifying SVGs
│   └── styles
│       └── style.sass              # Main SASS styles
└── views
    ├── index.pug
    └── tools.pug
```

### Explanation of Classes

1. **Shape (Base Class)**: Handles common properties and methods shared by all shapes, like drawing previews and creating SVG elements.
2. **CanvasItem**: Base class for all canvas items; each item combines the preview-drawing logic on the canvas and the finalized SVG representation.
3. **Rectangle, Ellipse, Triangle, Actor**: Specific item classes that inherit from `Shape` and add specialized behaviors for each shape.
4. **SvgUtils**: Utility class to manage the creation and manipulation of SVG elements.

### Implementation Details

#### 1. `CanvasItem.js`

```javascript
export default class CanvasItem {
  constructor(ctx, svgCanvas) {
    this.ctx = ctx;
    this.svgCanvas = svgCanvas;
    this.startX = 0;
    this.startY = 0;
  }

  setStartCoords(x, y) {
    this.startX = x;
    this.startY = y;
  }
}
```

#### 2. `Shape.js`

```javascript
import CanvasItem from "./CanvasItem.js";

export default class Shape extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  // Abstract drawPreview function to be implemented by each shape type
  drawPreview() {
    throw new Error("drawPreview() must be implemented by the shape class.");
  }

  // Abstract createFinal function to be implemented by each shape type
  createFinal() {
    throw new Error("createFinal() must be implemented by the shape class.");
  }
}
```

#### 3. Shape Classes (`Rectangle.js`, `Ellipse.js`, `Triangle.js`, `Actor.js`)

##### `Rectangle.js`

```javascript
import CanvasItem from "./CanvasItem.js";
import { createSvgElement, appendSvgElement } from "../utils/SvgUtils.js";

export default class Rectangle extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  drawPreview(currentX, currentY) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const width = currentX - this.startX;
    const height = currentY - this.startY;
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(this.startX, this.startY, width, height);
  }

  createFinal(currentX, currentY) {
    const attributes = {
      x: Math.min(this.startX, currentX),
      y: Math.min(this.startY, currentY),
      width: Math.abs(currentX - this.startX),
      height: Math.abs(currentY - this.startY),
      stroke: "black",
      fill: "transparent",
    };
    const rect = createSvgElement("rect", attributes);
    appendSvgElement(this.svgCanvas, rect);
  }
}
```

##### `Ellipse.js`

```javascript
import CanvasItem from "./CanvasItem.js";
import { createSvgElement, appendSvgElement } from "../utils/SvgUtils.js";

export default class Ellipse extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  drawPreview(currentX, currentY) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const radiusX = Math.abs(currentX - this.startX) / 2;
    const radiusY = Math.abs(currentY - this.startY) / 2;
    const centerX = (currentX + this.startX) / 2;
    const centerY = (currentY + this.startY) / 2;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  createFinal(currentX, currentY) {
    const attributes = {
      cx: (currentX + this.startX) / 2,
      cy: (currentY + this.startY) / 2,
      rx: Math.abs(currentX - this.startX) / 2,
      ry: Math.abs(currentY - this.startY) / 2,
      stroke: "black",
      fill: "transparent",
    };
    const ellipse = createSvgElement("ellipse", attributes);
    appendSvgElement(this.svgCanvas, ellipse);
  }
}
```

##### `Triangle.js`

```javascript
import CanvasItem from "./CanvasItem.js";
import { createSvgElement, appendSvgElement } from "../utils/SvgUtils.js";

export default class Triangle extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  drawPreview(currentX, currentY) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.lineTo(this.startX - (currentX - this.startX), currentY);
    this.ctx.closePath();
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  createFinal(currentX, currentY) {
    const points = `${this.startX},${this.startY} ${currentX},${currentY} ${
      this.startX - (currentX - this.startX)
    },${currentY}`;
    const attributes = {
      points: points,
      stroke: "black",
      fill: "transparent",
    };
    const polygon = createSvgElement("polygon", attributes);
    appendSvgElement(this.svgCanvas, polygon);
  }
}
```

##### `Actor.js`

```javascript
import CanvasItem from "./CanvasItem.js";
import { createSvgElement, appendSvgElement } from "../utils/SvgUtils.js";

export default class Actor extends CanvasItem {
  constructor(ctx, svgCanvas) {
    super(ctx, svgCanvas);
  }

  createFinal(x, y) {
    const actorGroup = createSvgElement("g", {
      class: "actor",
      transform: `translate(${x}, ${y})`,
      stroke: "black",
      fill: "transparent",
    });

    // Head
    const head = createSvgElement("circle", {
      cx: "0",
      cy: "-30",
      r: "15",
      stroke: "black",
      fill: "white",
    });

    // Body
    const body = createSvgElement("line", {
      x1: "0",
      y1: "-15",
      x2: "0",
      y2: "20",
      stroke: "black",
    });

    // Append elements to actor group
    appendSvgElement(actorGroup, head);
    appendSvgElement(actorGroup, body);

    // Arms and legs can be added similarly...

    appendSvgElement(this.svgCanvas, actorGroup);
  }
}
```

##### `SvgUtils.js`

```javascript
// SvgUtils.js
export function createSvgElement(type, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', type);
    Object.keys(attributes).forEach((key) => {
        element.setAttribute(key, attributes[key]);
    });
    return element;
}

export function appendSvgElement(svgCanvas, element) {
    svgCanvas.appendChild(element);
}

import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Rectangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const width = currentX - this.startX;
        const height = currentY - this.startY;
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(this.startX, this.startY, width, height);
    }

    createFinal(currentX, currentY) {
        const attributes = {
            x: Math.min(this.startX, currentX),
            y: Math.min(this.startY, currentY),
            width: Math.abs(currentX - this.startX),
            height: Math.abs(currentY - this.startY),
            stroke: 'black',
            fill: 'transparent'
        };
        const rect = createSvgElement('rect', attributes);
        appendSvgElement(this.svgCanvas, rect);
    }
}

import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Ellipse extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        const radiusX = Math.abs(currentX - this.startX) / 2;
        const radiusY = Math.abs(currentY - this.startY) / 2;
        const centerX = (currentX + this.startX) / 2;
        const centerY = (currentY + this.startY) / 2;
        this.ctx.beginPath();
        this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    createFinal(currentX, currentY) {
        const attributes = {
            cx: (currentX + this.startX) / 2,
            cy: (currentY + this.startY) / 2,
            rx: Math.abs(currentX - this.startX) / 2,
            ry: Math.abs(currentY - this.startY) / 2,
            stroke: 'black',
            fill: 'transparent'
        };
        const ellipse = createSvgElement('ellipse', attributes);
        appendSvgElement(this.svgCanvas, ellipse);
    }
}
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Triangle extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawPreview(currentX, currentY) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(currentX, currentY);
        this.ctx.lineTo(this.startX - (currentX - this.startX), currentY);
        this.ctx.closePath();
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }

    createFinal(currentX, currentY) {
        const points = `${this.startX},${this.startY} ${currentX},${currentY} ${this.startX - (currentX - this.startX)},${currentY}`;
        const attributes = {
            points: points,
            stroke: 'black',
            fill: 'transparent'
        };
        const polygon = createSvgElement('polygon', attributes);
        appendSvgElement(this.svgCanvas, polygon);
    }
}
import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement } from '../utils/SvgUtils.js';

export default class Actor extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    createFinal(x, y) {
        const actorGroup = createSvgElement('g', {
            class: 'actor',
            transform: `translate(${x}, ${y})`,
            stroke: 'black',
            fill: 'transparent'
        });

        // Head
        const head = createSvgElement('circle', {
            cx: '0',
            cy: '-30',
            r: '15',
            stroke: 'black',
            fill: 'white'
        });

        // Body
        const body = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '0',
            y2: '20',
            stroke: 'black'
        });

        // Append elements to actor group
        appendSvgElement(actorGroup, head);
        appendSvgElement(actorGroup, body);

        // Arms and legs can be added similarly...

        appendSvgElement(this.svgCanvas, actorGroup);
    }
}


### Summary of Changes
- **Refactor into Classes**: We split logic into different classes and placed them in individual files for better modularity.
- **Unified `CanvasItem` Class**: Combines the drawing logic for canvas previews and the creation of SVG elements.
- **Shape-Specific Classes**: `Rectangle`, `Ellipse`, `Triangle`, and `Actor`
```
