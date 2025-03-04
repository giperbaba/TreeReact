import { useCallback, useEffect, useState } from "react";
import { Node } from "../models/Node"
import { Guid } from "guid-typescript";

export const useTree = () => {
    const [tree, setTree] = useState<Node[]>([]);

    const initialTree = require("../initial-tree.json");

    useEffect(() => {
        setTree(initialTree);
    }, []);

    const addNode = useCallback((parentId: Guid | null = null) => {
        const newNode = new Node("Node", []);

        const add = (prevTree: Node[]) => {
            if (parentId == null) return [...prevTree, newNode];
            
            const addChildNode = (nodes: Node[]): Node[] => {
                return nodes.map((node) =>
                    node.id === parentId
                        ? { ...node, children: [...node.children, newNode] }
                        : { ...node, children: addChildNode(node.children) }
                );
            };
            return addChildNode(prevTree);
        }

        setTree((prevTree) => add(prevTree));
    }, []);

    const deleteNode = useCallback((id: Guid) => {
        const remove = (nodes: Node[]): Node[] => {
            return nodes
                .filter((node) => node.id !== id)
                .map((node) => ({
                    ...node,
                    children: remove(node.children),
                }));
        };

        setTree((prevTree) => remove(prevTree));
    }, []);

    const editNode = useCallback((id: Guid, newName: string) => {
        const update = (nodes: Node[]): Node[] => {
            return nodes
                .map((node) =>
                    (node.id === id)
                        ? { ...node, name: newName }
                        : { ...node, children: update(node.children) }
                )
        }

        setTree((prevTree) => update(prevTree));
    }, []);

    const resetTree = useCallback(() => setTree(initialTree), []);

    return { tree, addNode, deleteNode, editNode, resetTree };

};