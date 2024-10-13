class PointerTool {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.svgCanvas = svgCanvas;
        this.selectedItem = null;
        this.movingItem = false;
    }

    selectItemAt(x, y) {
        console.log(`Selecting item at (${x}, ${y})`);
        const items = this.svgCanvas.querySelectorAll('.canvas-item');
        let groupItems = [];

        for (let item of items) {
            // Check if the item is an svg <g> group
            if (item.tagName === 'g') {
                groupItems.push(item);
            }
        }

        if (groupItems.length === 0) {
            console.log('No canvas items found');
            this.deselectItem();
            return null;
        }

        for (let groupItem of groupItems) {
            try {
                const bbox = groupItem.getBoundingClientRect();
                if (bbox.width > 0 && bbox.height > 0) {
                    console.log(`Checking item with bbox: x=${bbox.left}, y=${bbox.top}, width=${bbox.width}, height=${bbox.height}`);
                    const svgCanvasRect = this.svgCanvas.getBoundingClientRect();
                    const relativeX = x + svgCanvasRect.left;
                    const relativeY = y + svgCanvasRect.top;
                    if (relativeX >= bbox.left && relativeX <= bbox.left + bbox.width && relativeY >= bbox.top && relativeY <= bbox.top + bbox.height) {
                        this.selectedItem = groupItem;
                        console.log('Item selected:', groupItem);
                        return groupItem;
                    }
                }
            } catch (error) {
                console.error('Error getting bounding box:', error);
            }
        }

        console.log('No item selected');
        this.deselectItem();
        return null;
    }

    moveItem(dx, dy) {
        if (!this.movingItem && this.selectedItem) {
            this.selectedItem.classList.add('moving');
            this.movingItem = true;
        } else if (this.selectedItem) {
            const transform = this.selectedItem.transform.baseVal.consolidate();
            const matrix = transform ? transform.matrix : this.svgCanvas.createSVGMatrix();
            const newMatrix = matrix.translate(dx, dy);
            this.selectedItem.setAttribute('transform', `matrix(${newMatrix.a}, ${newMatrix.b}, ${newMatrix.c}, ${newMatrix.d}, ${newMatrix.e}, ${newMatrix.f})`);
            console.log(`Moved item to new position: dx=${dx}, dy=${dy}`);
        } else {
            console.log('No item selected to move');
        }
    }

    finalizeMove() {
        if (this.selectedItem) {
            this.selectedItem.classList.remove('moving');
            this.movingItem = false;
        }
    }

    deselectItem() {
        this.selectedItem = null;
        this.movingItem = false;
        console.log('Deselected item');
    }
}

export default PointerTool;