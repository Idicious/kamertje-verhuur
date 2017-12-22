import { Player } from '../models/player';
import { React } from '../lib/uibuilder/UIBuilder';
import { PlayerComponent } from './player.component';
import { Room } from '../models/room';

export interface PlayerListComponentProps extends React.Props {
    players: Player[],
    activePlayer: Player,
    rooms: Room[]
}

/**
 * Player list element
 */
export class PlayerListComponent extends React.Component<PlayerListComponentProps> {
    render(): HTMLElement {
        return (
            <div className="player-list">
                {this.props.players.map(p => 
                    <PlayerComponent 
                        player={p} 
                        active={p === this.props.activePlayer}
                        rooms={[].concat.apply([], this.props.rooms)
                            .filter(r => r.owner() != null && r.owner() === p)
                            .length}
                        >
                    </PlayerComponent>
                )}
            </div>
        );
    }
}