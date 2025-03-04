import { memo, useEffect, useState } from 'react';
import { Node } from '../models/Node'
import { Guid } from 'guid-typescript';
import "../styles/index.css"

interface NodeItemProps {
    node: Node;
    onAdd: (id: Guid) => void;
    onDelete: (id: Guid) => void;
    onEdit: (id: Guid, newName: string) => void;
    level?: number;
}

export const NodeItem = memo(({ node, onAdd, onDelete, onEdit, level = 1 }: NodeItemProps) => {
    const [newName, setNewName] = useState(node.name.trim());

    return (
        <div style={{ marginLeft: level * 10, borderLeft: "1px solid gray", paddingLeft: 10}} className='node-item'>
            <p
                contentEditable
                suppressContentEditableWarning
                onInput={(e) => {
                    setNewName(e.currentTarget.textContent || 'Node new');
                }}
                onBlur={() => {
                    onEdit(node.id, newName);
                }}
                className='node-input'>
                {node.name}
            </p>

            <button className='node-button' id='add-button' onClick={() => onAdd(node.id)}>Add</button>
            <button className='node-button' id='delete-button' onClick={() => onDelete(node.id)}>Remove</button>
            {node.children.length > 0 && (
                <div className='node-item'>
                    {node.children.map((child) => (
                        <NodeItem key={child.id.toString()} node={child} onAdd={onAdd} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
        </div>
    )
});