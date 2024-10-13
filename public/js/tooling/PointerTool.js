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
        console.log(`Found ${items.length} items`);
        for (let item of items) {
            const bbox = item.getBBox();
            console.log(`Checking item with bbox: ${JSON.stringify(bbox)}`);
            if (x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height) {
                this.selectedItem = item;
                console.log('Item selected:', item);
                return item;
            }
        }
        console.log('No item selected');
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
}

export default PointerTool;