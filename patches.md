## TLDR: Patches to Implement Fixes

Below are the patch files and steps you can use to apply the updated selection functionality while retaining all existing features.

### Step 1: Create Patch Files

#### Patch for `style.sass` (file name: `style.sass.patch`):

```patch
--- a/public/styles/style.sass
+++ b/public/styles/style.sass
@@ -17,6 +17,34 @@
   .canvas-wrapper
     position: relative
     width: 100%
     height: 100%

+// Style for actor groups
+g.actor
+  cursor: pointer
+  transition: transform 0.2s, stroke 0.2s
+
+  &:hover
+    stroke: blue // Hover state to indicate interactivity
+
+  &.selected
+    stroke: blue
+    fill: rgba(0, 0, 255, 0.1) // Light blue fill to indicate selection
+
+// Adding consistent styles to lines, circles, and other shapes in actors
+line, circle, text
+  pointer-events: visiblePainted // Allow clicks on all painted elements
+
+// Bounding box for selection
+rect.bounding-box
+  fill: transparent
+  stroke: blue
+  stroke-dasharray: 5, 5
+  pointer-events: none // Bounding box is for visual purposes only
```

### Step 2: Apply the Patch

To apply the patch, save the patch file as `style.sass.patch`, and run the following command:

```bash
# Navigate to your project root directory
cd /path/to/your/project

# Apply the patch
patch public/styles/style.sass < style.sass.patch
```

This will update `style.sass` with the necessary modifications for actor selection.

### JavaScript Changes Overview (To Manually Update)

#### Changes in `diagram.js`

- Update `selectElement` to add a bounding box to selected actors.
- Ensure that the selection function works for groups (`<g>` elements).

#### Changes in `draw.js`

- Update `createSvgActor` to correctly attach selection listeners to the entire group and manage bounding box display.

These changes ensure that all features (including drawing rectangles and ellipses) are retained, while improving the interactivity and selection for actors.

Let me know if you encounter any issues or need more precise guidance!
