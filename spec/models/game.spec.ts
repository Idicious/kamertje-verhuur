import { Game } from '../../src/models/game';
import { Player } from '../../src/models/player';
import { Sides } from '../../src/types/sides';

describe("Game class: ", () => {
    let game: Game;
    let player1: Player;
    let player2: Player;
    let player3: Player;

    beforeEach(() => {
        game = new Game();

        player1 = {name: "Player1", color: "red"};
        player2 = {name: "Player2", color: "green"};
        player3 = {name: "Player3", color: "teal"};
    });

    it("doesn't start with less than 2 players", () => {
        game.addPlayer(player1);
        game.start();

        expect(game.currentPlayer()).toBe(undefined);
        
        game.addPlayer(player2);
        game.start();

        expect(game.currentPlayer()).toBe(player1);
    });

    it("Initializes the game to correct size", () => {
        game.addPlayer(player1);
        game.addPlayer(player2);

        game.start();

        expect(game.rooms().length).toBe(5);
        expect(game.rooms()[0].length).toBe(5);

        game.reset();
        game.setDimensions(10, 10);
        game.start();

        expect(game.rooms().length).toBe(10);
        expect(game.rooms()[0].length).toBe(10);
    });

    it("Accepts new players when game is not started", () => {
        expect(game.players().length).toBe(0);

        game.addPlayer(player1);
        game.addPlayer(player2);

        expect(game.players().length).toBe(2);
        expect(game.players()[0]).toBe(player1);
        expect(game.players()[1]).toBe(player2);

        game.addPlayer(player3);

        expect(game.players().length).toBe(3);
        expect(game.players()[0]).toBe(player1);
        expect(game.players()[1]).toBe(player2);
        expect(game.players()[2]).toBe(player3);
    });

    it("Does not accept new players when game is started", () => {
        game.addPlayer(player1);
        game.addPlayer(player2);

        game.start();

        game.addPlayer(player3);
        expect(game.players().length).toBe(2);
    });

    it("can remove players when game is not running", () => {
        expect(game.players().length).toBe(0);

        game.addPlayer(player1);
        expect(game.players().length).toBe(1);

        game.removePlayer(player1);
        expect(game.players().length).toBe(0);
    });

    it("cannot remove players when game is running", () => {
        expect(game.players().length).toBe(0);

        game.addPlayer(player1);
        game.addPlayer(player2);

        expect(game.players().length).toBe(2);

        game.start();

        game.removePlayer(player2);
        expect(game.players().length).toBe(2);
    });

    it("asserts the victor correctly", () => {
        game.addPlayer(player1);
        game.addPlayer(player2);

        game.start();
        expect(game.isGameComplete()).toBe(false);
        expect(game.getWinner()).toBe(null);

        const rooms = [].concat.apply([], game.rooms());
        rooms.forEach(room => {
            room.setWall(player1, Sides.Bottom);
            room.setWall(player1, Sides.Left);
            room.setWall(player1, Sides.Right);
            room.setWall(player1, Sides.Top);
        });

        expect(game.isGameComplete()).toBe(true);
        expect(game.getWinner()).toBe(player1);
    });
})