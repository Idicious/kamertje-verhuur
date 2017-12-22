import { Game } from '../models/game';
import { Room } from '../models/room';
import { RoomComponent } from './room.component';
import { React } from '../lib/uibuilder/UIBuilder';
import { Player } from '../models/player';
import { PlayerComponent } from './player.component';
import { PlayerListComponent } from './player-list.component';
import { Sides } from '../types/sides';
import { Side } from '../types/side';
import { replaceElement, replaceComponent } from '../util/dom';

export interface GameComponentProps extends React.Props {
    game: Game
    onReset: () => void;
}

/**
 * Main UI element, displays the players and the field
 */
export class GameComponent extends React.Component<GameComponentProps> {
    private _playerList: Node;

    render(): HTMLElement {
        this._playerList = this.getPlayerList();
        return (
            <div>
                {this._playerList}
                <div className="game" onClick={ev => this.onGameClick(ev)}>
                {this.props.game.rooms().map(column => 
                    <div style="display: inline-block">
                    {column.map(room => 
                        <RoomComponent room={room}></RoomComponent>
                    )}
                    </div>
                )}
                </div>
                <button className="btn btn-warning" onClick={ev => this.resetClicked()}>Reset</button>
            </div>
        )
    }

    private resetClicked() {
        this.props.onReset();
    }

    private getPlayerList = () => {
        return (
            <PlayerListComponent 
                players={this.props.game.players()}
                rooms={this.props.game.rooms()}
                activePlayer={this.props.game.currentPlayer()}>
            </PlayerListComponent>
        )
    }

    private onGameClick(ev: MouseEvent) {
        ev.preventDefault();

        const clickedSide = Sides.getSideFromClick(ev, 5);

        if(clickedSide == null) 
            return;

        const oppositeSide = Sides.getOppositeSide(clickedSide);

        const roomElement = ev.target as Element;
        const fieldElement = ev.currentTarget as Element;

        const roomId = roomElement.getAttribute('data-id').split('-');
        const roomX = +roomId[0];
        const roomY = +roomId[1];

        const clickedRoom = this.props.game.rooms()[roomX][roomY];

        const currentPlayer = this.props.game.currentPlayer();
        const validMove = clickedRoom.setWall(currentPlayer, clickedSide);

        if(validMove) {
            const adjacentRoom = this.getAdjacentRoom(roomX, roomY, clickedSide);
            const adjacentCompleted = adjacentRoom.setWall(currentPlayer, oppositeSide);

            if(!clickedRoom.isComplete() && (!adjacentCompleted || !adjacentRoom.isComplete())) {
                this.props.game.nextPlayer();
            }

            const adjacentElement = this.getRoomElement(fieldElement, adjacentRoom.x, adjacentRoom.y);

            // Redraw rooms effected by the click
            requestAnimationFrame(() => {
                replaceComponent(roomElement, RoomComponent, {room: clickedRoom});
                replaceComponent(adjacentElement, RoomComponent, {room: adjacentRoom});

                this._playerList = replaceElement(this._playerList, this.getPlayerList());

                if(this.props.game.isGameComplete()) {
                    this.announceVictor();
                }
            });
        }
    }

    private getRoomElement(el: Element, x: number, y: number): HTMLElement {
        return el.querySelector(`[data-id="${x}-${y}"]`);
    }

    

    private announceVictor() {
        setTimeout(() => {
            const winner = this.props.game.getWinner();
            alert(`The winner is ${winner.name}!`);
        });
    }

    private getAdjacentRoom(x: number, y: number, side: Side): Room {
        switch(side) {
            case Sides.Left:
                return this.props.game.rooms()[x - 1][y];
            case Sides.Right:
                return this.props.game.rooms()[x + 1][y];
            case Sides.Top:
                return this.props.game.rooms()[x][y - 1];
            case Sides.Bottom:
                return this.props.game.rooms()[x][y + 1];
            default:
                return null;
        }
    }
}