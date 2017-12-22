import { Player } from './player';
import { Sides } from '../types/sides';
import { Side } from '../types/side';



/**
 * Class representing a room in the game
 */
export class Room {
    /**
     * Index 0 - 3: left, top, right, bottom
     */
    private walls: boolean[] = [false, false, false, false];

    private _owner: Player;

    constructor(public x: number, public y: number) {}

    public owner() {
        return this._owner;
    }

    /**
     * Completes a side of the room, returns whether or not a side was completed
     * by calling this method.
     * 
     * @param player
     * @param side 
     */
    setWall(player: Player, side: Side): boolean {
        // If side is already completed nothing should happen so return false
        if(this.isSideComplete(side)) {
            return false;
        }

        this.completeSide(side);

        // If this completed the wall set the owner
        if(this.walls.every(wall => wall)) {
            this._owner = player;
        }

        return true;
    }

    /**
     * Returns whether or not the room is complete
     */
    public isComplete = (): boolean => {
        return this.owner() != null && this.walls.every(wall => wall);
    }

    /**
     * Returns whether the given side is complete
     */
    public isSideComplete(side: Side): boolean {
        switch(side) {
            case Sides.Left:
                return this.walls[0] === true;
            case Sides.Top:
                return this.walls[1] === true;
            case Sides.Right:
                return this.walls[2] === true;
            case Sides.Bottom:
                return this.walls[3] === true;
            default:
                return true;
        }
    }

    private completeSide(side: Side) {
        switch (side) {
            case Sides.Left:
                this.walls[0] = true;
                break;
            case Sides.Top:
                this.walls[1] = true;
                break;
            case Sides.Right:
                this.walls[2] = true;
                break;
            case Sides.Bottom:
                this.walls[3] = true;
                break;
            default:
                throw new TypeError('Room - setWall: Side must be left, top, right or bottom');
        }
    }
}