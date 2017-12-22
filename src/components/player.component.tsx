import { Player } from '../models/player';
import { React } from '../lib/uibuilder/UIBuilder';

export interface PlayerComponentProps extends React.Props {
    player: Player,
    active: boolean,
    rooms: number
}

/**
 * Player UI Element, displays player name with background color
 * set to the color of the player.
 */
export class PlayerComponent extends React.Component<PlayerComponentProps> {
    render(): HTMLElement {
        let playerClassList = "player";
        playerClassList += this.props.active ? " active" : ""

        return (
            <div className={playerClassList} style={{backgroundColor: this.props.player.color}}>
                <span className="player-span">{this.props.player.name} ({this.props.rooms})</span>
            </div>
        );
    }
}