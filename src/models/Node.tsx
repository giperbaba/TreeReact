import { Guid } from "guid-typescript";

export class Node {
    id: Guid;
    name: string;
    children: Node[];

    constructor(name: string, children: Node[]) {
        this.id = Guid.create();
        this.name = name;
        this.children = children;
    }
}