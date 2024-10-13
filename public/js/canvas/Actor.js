import CanvasItem, { createSvgElement, appendSvgElement, createSvgGroup } from './CanvasItem.js';

export default class Actor extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    drawActor(x, y) {
        console.log(`Drawing actor at ${x}, ${y}`);
        this.setStartCoords(x, y);

        const actorGroup = createSvgGroup(this.svgCanvas, {
            class: 'actor canvas-item',
            transform: `translate(${x}, ${y})`,
            stroke: 'black',
            fill: 'transparent'
        });

        const head = createSvgElement('circle', {
            cx: '0',
            cy: '-30',
            r: '15',
            stroke: 'black',
            fill: 'white'
        });

        const body = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '0',
            y2: '20',
            stroke: 'black'
        });

        const leftArm = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '-20',
            y2: '0',
            stroke: 'black'
        });

        const rightArm = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '20',
            y2: '0',
            stroke: 'black'
        });

        const leftLeg = createSvgElement('line', {
            x1: '0',
            y1: '20',
            x2: '-15',
            y2: '40',
            stroke: 'black'
        });

        const rightLeg = createSvgElement('line', {
            x1: '0',
            y1: '20',
            x2: '15',
            y2: '40',
            stroke: 'black'
        });

        appendSvgElement(actorGroup, head);
        appendSvgElement(actorGroup, body);
        appendSvgElement(actorGroup, leftArm);
        appendSvgElement(actorGroup, rightArm);
        appendSvgElement(actorGroup, leftLeg);
        appendSvgElement(actorGroup, rightLeg);

        const label = createSvgElement('text', {
            x: '0',
            y: '60',
            'text-anchor': 'middle',
            stroke: 'black',
            fill: 'black'
        });
        label.textContent = 'Actor';
        appendSvgElement(actorGroup, label);
        this.svgGroup = actorGroup;

        appendSvgElement(this.svgCanvas, actorGroup);
    }
}