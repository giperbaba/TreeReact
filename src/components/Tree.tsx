import { useTree } from "./useTree";
import { NodeItem } from "./NodeItem";

export const Tree = () => {
    const {tree, addNode, deleteNode, editNode, resetTree} = useTree();

    return (
        <div id='tree'>
            <h1 id='text-title'>Tree</h1>
            {tree.map((node) => (
                <NodeItem key={node.id.toString()} node={node} onAdd={addNode} onDelete={deleteNode} onEdit={editNode}/>
            ))}
        <button className='tree-button'  onClick={() => addNode(null)}>Add Root Node</button>
        <button className='tree-button'  onClick={resetTree}>Reset</button>
        </div>
    )
}