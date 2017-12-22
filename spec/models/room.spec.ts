import { Game } from '../../src/models/game';
import { Player } from '../../src/models/player';
import { Room } from '../../src/models/room';
import { Sides } from '../../src/types/sides';

describe("Room class: ", () => {
    let game: Game;
    let player1: Player;
    let player2: Player;
    let room: Room;

    beforeEach(() => {
        game = new Game();
        player1 = {name: "Player1", color: "red"};
        player2 = {name: "Player2", color: "green"};
        room = new Room(4, 6);
    });

    it("is constructed with correct x and y values", () => {
        expect(room.x).toBe(4);
        expect(room.y).toBe(6);
    });

    it("sets a wall correctly", () => {
        expect(room.isSideComplete(Sides.Left)).toBe(false);
        expect(room.isSideComplete(Sides.Right)).toBe(false);
        expect(room.isSideComplete(Sides.Top)).toBe(false);
        expect(room.isSideComplete(Sides.Bottom)).toBe(false);

        let set = room.setWall(player1, Sides.Left);
        expect(room.isSideComplete(Sides.Left)).toBe(true);
        expect(set).toBe(true);

        set = room.setWall(player1, Sides.Left);
        expect(room.isSideComplete(Sides.Left)).toBe(true);
        expect(set).toBe(false);
    });

    it("sets the owner when the final wall is completed", () => {
        room.setWall(player1, Sides.Top);
        room.setWall(player1, Sides.Left);
        room.setWall(player1, Sides.Right);

        expect(room.owner()).toBe(undefined);

        room.setWall(player2, Sides.Bottom);

        expect(room.owner()).toBe(player2);
    });

    it("determines completeness correctly", () => {
        room.setWall(player2, Sides.Top);
        room.setWall(player1, Sides.Left);
        room.setWall(player2, Sides.Right);

        expect(room.isComplete()).toBe(false);

        room.setWall(player1, Sides.Bottom);

        expect(room.isComplete()).toBe(true);
    });
})