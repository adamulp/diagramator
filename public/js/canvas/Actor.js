import CanvasItem from './CanvasItem.js';
import { createSvgElement, appendSvgElement, createSvgGroup } from '../utils/SvgUtils.js';

export default class Actor extends CanvasItem {
    constructor(ctx, svgCanvas) {
        super(ctx, svgCanvas);
    }

    createFinal(x, y) {
        // Create the actor SVG group
        const actorGroup = createSvgGroup(this.svgCanvas, {
            class: 'actor',
            transform: `translate(${x}, ${y})`,
            stroke: 'black',
            fill: 'transparent'
        });
        createSvgElement('g', {
            class: 'actor',
            transform: `translate(${x}, ${y})`,
            stroke: 'black',
            fill: 'transparent'
        });

        // Add the head to the actor group.
        const head = createSvgElement('circle', {
            cx: '0',
            cy: '-30',
            r: '15',
            stroke: 'black',
            fill: 'white'
        });

        //Add the body to the actor group.
        const body = createSvgElement('line', {
            x1: '0',
            y1: '-15',
            x2: '0',
            y2: '20',
            stroke: 'black'
        });

        //Add arms and legs similarly...
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

        // Append elements to actor group
        appendSvgElement(actorGroup, head);
        appendSvgElement(actorGroup, body);
        appendSvgElement(actorGroup, leftArm);
        appendSvgElement(actorGroup, rightArm);
        appendSvgElement(actorGroup, leftLeg);
        appendSvgElement(actorGroup, rightLeg);

        // Add Label
        const label = createSvgElement('text', {
            x: '0',
            y: '60',
            'text-anchor': 'middle',
            stroke: 'black',
            fill: 'black'
        });
        label.textContent = 'Actor';
        appendSvgElement(actorGroup, label);

        appendSvgElement(this.svgCanvas, actorGroup);
    }
}