class PointerTool {
    constructor(ctx, svgCanvas) {
        this.ctx = ctx;
        this.svgCanvas = svgCanvas;
        this.selectedItem = null;
    }

    selectItemAt(x, y) {
        console.log(`Selecting item at (${x}, ${y})`);
        const groupItems = this.svgCanvas.querySelectorAll('.canvas-item');

        if (groupItems.length === 0) {
            console.log('No group items found');
            this.selectedItem = null;
            return null;
        }

        for (let groupItem of groupItems) {
            const bbox = groupItem.getBBox();
            console.log(`Checking item with bbox: ${JSON.stringify(bbox)}`);
            if (x >= bbox.x && x <= bbox.x + bbox.width && y >= bbox.y && y <= bbox.y + bbox.height) {
                this.selectedItem = groupItem;
                // log css id and class info of items under cursor
                console.log('Item selected:', groupItem);
            }
        }
        return groupItems;
    }

    moveItem(dx, dy) {
        if (this.selectedItem && !this.selectedItem.classList.contains('moving')) {
            this.selectedItem.classList.add('moving');
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
        }
        this.selectedItem = null;
    }
}

export default PointerTool;