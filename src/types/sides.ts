import { Side } from './side';

export class Sides {
    public static readonly Left = 'left';
    public static readonly Right = 'right';
    public static readonly Top = 'top';
    public static readonly Bottom = 'bottom';

    /**
     * Returns which side a click event took place in relation to the target,
     * the margin parameter determines how many pixels inside the element are counted.
     * 
     * @param ev
     * @param margin
     */
    public static getSideFromClick = (ev: MouseEvent, margin: number): Side => {
        const element = (ev as Event).srcElement;

        if(ev.offsetX < margin) {
            return Sides.Left;
        }
        if(ev.offsetY < margin) {
            return Sides.Top;
        }
        if(ev.offsetX > element.clientWidth - margin) {
            return Sides.Right;
        }
        if(ev.offsetY > element.clientHeight - margin) {
            return Sides.Bottom;
        }

        return null;
    }

    /**
     * 
     * @param side 
     */
    public static getOppositeSide = (side: Side) => {
        switch(side) {
            case Sides.Left:
                return Sides.Right;
            case Sides.Right:
                return Sides.Left;
            case Sides.Top:
                return Sides.Bottom;
            case Sides.Bottom:
                return Sides.Top;
            default:
                return null;
        }
    }
}