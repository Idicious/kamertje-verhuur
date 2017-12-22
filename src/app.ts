import { Player } from './models/player';
import { Game } from './models/game';
import { GameComponent, GameComponentProps } from './components/game.component';
import { React } from './lib/uibuilder/UIBuilder';
import { replaceComponent } from './util/dom';

window.onload = () => {
    const app = new App();
}

export class App {
    private _game = new Game();
    private _container = document.getElementById('app-container');
    private _gameElement;

    constructor() { 
        this._game.addPlayer({name: 'Player1', color: '#d9534f'});
        this._game.addPlayer({name: 'Player2', color: '#5cb85c'});

        this._game.start();
        this.renderGame();
    }

    private onReset = () => {
        this._game.reset();
        this._game.start();
        this.renderGame();
    };

    private renderGame = () => {
        if(this._container.firstChild == null) {
            var element = React.createElement<GameComponentProps>(GameComponent, {
                game: this._game, 
                onReset: this.onReset
            });

            this._container.appendChild(element);
            this._gameElement = element;
        } else {
            this._gameElement = replaceComponent(this._gameElement, GameComponent, {
                game: this._game, 
                onReset: this.onReset
            });
        }
    }
}