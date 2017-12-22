import { Room } from '../models/room';
import { React } from '../lib/uibuilder/UIBuilder';
import { Sides } from '../types/sides';

/**
 * Properties given to the room component
 */
export interface RoomComponentProps extends React.Props {
    room: Room
}

/**
 * UI element of a room in the game
 */
export class RoomComponent extends React.Component<RoomComponentProps> {
    render(): HTMLElement {
        const bgColor = this.props.room.isComplete() ? this.props.room.owner().color : '';
        const classList = this.getClasses();
        const id = `${this.props.room.x}-${this.props.room.y}`;

        return (
            <div data-id={id} className={classList} style={{backgroundColor: bgColor}}>
                
            </div>
        );
    }

    /**
     * Returns a list of css classes that should be applied to the component
     * based on the state of the room.
     * 
     * @returns {string} List of css classes to be applied to the room
     */
    getClasses(): string {
        let classString = "room";

        if(this.props.room.isSideComplete(Sides.Left)) {
            classString += ' leftComplete';
        }
    
        if(this.props.room.isSideComplete(Sides.Top)) {
            classString += ' topComplete';
        }
    
        if(this.props.room.isSideComplete(Sides.Right)) {
            classString += ' rightComplete';
        }
    
        if(this.props.room.isSideComplete(Sides.Bottom)) {
            classString += ' bottomComplete';
        }
    
        return classString;
    }
}