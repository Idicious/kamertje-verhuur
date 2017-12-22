/**
 * Class representing a player in the game, has a name and a color
 */
export class Player {
    public name: string;
    public color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}