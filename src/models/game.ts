import { Room } from './room';
import { Player } from './player';
import { Sides } from '../types/sides';

/**
 * Main class of the game, keeps track of the players,
 * rooms and current player.
 */
export class Game {
    private _players: Player[] = [];

    /**
     * List of players in the game
     */
    public players = () => this._players;

    private _rooms: Room[][] = [];

    /**
     * List of rooms in the game
     */
    public rooms = () => this._rooms;

    private _currentPlayer: Player;

    /**
     * Active player in the game
     */
    public currentPlayer = () => this._currentPlayer;

    private _width: number = 5;
    private _height: number = 5;
    private _playerIndex = 0;

    private _gameActive = false;

    /**
     * Sets the dimensions of the playing field for the next time
     * it's started.
     * 
     * @param width 
     * @param height 
     */
    setDimensions(width: number, height: number) {
        this._width = width;
        this._height = height;
    }

    /**
     * Moves the game to the next player
     */
    nextPlayer() {
        if(this._gameActive) { 
            const nextIndex = ++this._playerIndex % this.players().length;
            this._currentPlayer = this.players()[nextIndex];
        }
    }

    /**
     * Adds a player to the game
     * 
     * @param name 
     * @param color 
     */
    addPlayer(player: Player) {
        if(!this._gameActive) {
            this._players.push(player);
        }
    }

    /**
     * Removes a player from the game
     * 
     * @param name 
     */
    removePlayer(player: Player) {
        if(!this._gameActive) {
            this._players = this._players.filter(p => p !== p);
        }
    }

    /**
     * Initializes the game with the given width and height of the field
     * 
     * @param width 
     * @param height 
     */
    start() {
        if(!this._gameActive && this._players.length > 1) {
            this.reset();
            this._gameActive = true;
            this._currentPlayer = this._players[this._playerIndex];
        }
    }

    /**
     * Resets the playing field
     */
    reset() {
        this._gameActive = false;
        this._playerIndex = 0;
        this._currentPlayer = null;
        this.initializeField()
    }

    private initializeField() {
        const rooms = [];
        for(let x = 0; x < this._width; x++) {
            const heightArr = [];
            for(let y = 0; y < this._height; y++) {
                const room = new Room(x, y);
                heightArr.push(room);

                if(x == 0) {
                    room.setWall(null, Sides.Left);
                }
                if(x == this._width - 1) {
                    room.setWall(null, Sides.Right);
                }
                if(y == 0) {
                    room.setWall(null, Sides.Top);
                }
                if(y == this._height - 1) {
                    room.setWall(null, Sides.Bottom);
                }
            }
            rooms[x] = heightArr;
        }
        this._rooms = rooms;
    }
}