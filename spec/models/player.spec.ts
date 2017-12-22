import { Player } from '../../src/models/player';

describe("Player class: ", () => {
    let player: Player;

    beforeEach(() => {
        player = new Player("Player1", "red");
    });

    it("is constructed with correct values", () => {
        expect(player.name).toBe("Player1");
        expect(player.color).toBe("red");
    });
})