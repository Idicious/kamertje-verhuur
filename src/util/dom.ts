import { React } from "../lib/uibuilder/UIBuilder";

/**
 * Replaces given dom node with the given component and props
 * 
 * @param el 
 * @param component 
 * @param props 
 */
export const replaceComponent = <Comp, Props>(el: Node, component: Comp, props: Props): Node => {
    const newComponent = React.createElement<Props>(component, props);
    return this.replaceElement(el, newComponent);
}

/**
 * Replaces a given dom node with a new one and returns the new one
 * 
 * @param oldNode 
 * @param newNode 
 */
export const replaceElement = (oldNode: Node, newNode: Node): Node => {
    oldNode.parentNode.replaceChild(newNode, oldNode);
    return newNode;
}