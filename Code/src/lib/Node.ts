export interface INode {
  id: string;
}

/**
 * Class which represents a graph vertex
 */
export default class Node implements INode {
  id: string;
  label: string;

  constructor(identifier: string) {
    this.id = identifier;
    this.label = identifier;
  }
}

export class GroupedNode implements INode {
  public id: string;
  public label: string;
  public group: number;
  public x: number;
  public y: number;

  constructor(id: string, group: number, x: number, y: number) {
    this.id = id;
    this.label = id;
    this.x = x;
    this.y = y;
    this.group = group;
  }
}

const SEPARATION_OFFSET = 100;

export function mapToGroupedNodes(
  nodes: INode[],
  groupId: number
): GroupedNode[] {
  const result: GroupedNode[] = [];
  const halfLength = Math.floor(nodes.length / 2);

  for (let i = 1; i <= halfLength; ++i) {
    console.log({ i });
    result.push(
      new GroupedNode(
        nodes[i - 1].id,
        groupId,
        SEPARATION_OFFSET * groupId,
        SEPARATION_OFFSET * i
      )
    );
  }

  for (let i = 1 + halfLength; i <= nodes.length; ++i) {
    console.log({ i });
    result.push(
      new GroupedNode(
        nodes[i - 1].id,
        groupId,
        SEPARATION_OFFSET * (groupId + 1),
        SEPARATION_OFFSET * (i - halfLength)
      )
    );
  }

  return result;
}
