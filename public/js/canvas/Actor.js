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