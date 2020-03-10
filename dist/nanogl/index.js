function filterRenderableNodes(node) {
    return (node.mesh !== undefined);
}
class NanoglBackend {
    constructor(gl, gltf) {
        this.gl = gl;
        this.gltf = gltf;
        this._elements = [];
        this._elementsByUid = new Map();
        this.renderables = [];
        // meshes
        // primitives
        // materials
    }
    // addElement( e : ElementImpl<BaseElement> ){
    //   this._elements.push( e );
    //   this._elementsByUid.set( e.getElement().uid, e );
    // }
    getElement(e) {
        return this._elementsByUid.get(e.uid);
    }
    hasElement(e) {
        return this._elementsByUid.has(e.uid);
    }
    createRenderables() {
        const renderableNodes = this.gltf.nodes.filter(filterRenderableNodes);
        // for ( var node of renderableNodes ) {
        //   this.renderables.push( this.createRenderable( node ) );
        // }
    }
}
