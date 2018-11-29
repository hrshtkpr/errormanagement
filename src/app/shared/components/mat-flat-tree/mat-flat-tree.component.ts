import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

/**
 * File node data with nested structure.
 * Each node has a name, and a type or a list of children.
 */
export class Node {
  children: Node[];
  name: string;
}

/** Flat node with expandable and level information */
export class FlatNode {
  constructor(
    public expandable: boolean, public name: string, public level: number) {}
}

@Component({
  selector: 'app-mat-flat-tree',
  templateUrl: './mat-flat-tree.component.html',
  styleUrls: ['./mat-flat-tree.component.scss']
})
export class MatFlatTreeComponent implements  OnInit {
  @Input() treeData: any;
  @Output() activeNodeChanged = new EventEmitter();

  activeNode: Node;

  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<Node, FlatNode>;
  dataSource: MatTreeFlatDataSource<Node, FlatNode>;
  dataChange: BehaviorSubject<Node[]>;

  constructor() {
  }


  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataChange = new BehaviorSubject<Node[]>([]);

    this.dataChange.subscribe(data => this.dataSource.data = data);
    this.dataChange.next(this._buildNodeTree(this.treeData, 0));

    this.activeNode = new Node();
  }

  transformer = (node: Node, level: number) => {
    return new FlatNode(!!node.children, node.name, level);
  }

  private _getLevel = (node: FlatNode) => node.level;

  private _isExpandable = (node: FlatNode) => node.expandable;

  private _getChildren = (node: Node): Observable<Node[]> => observableOf(node.children);

  private _buildNodeTree(obj: {[key: string]: any}, level: number): Node[] {
    return Object.keys(obj).reduce<Node[]>((accumulator, key) => {
      const value = obj[key];
      const node = new Node();
      node.name = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this._buildNodeTree(value, level + 1);
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  onClick(flatNode: FlatNode) {
    if (this.activeNode.name === flatNode.name) {
      return;
    }
    this.activeNode.name = flatNode.name;
    this.activeNodeChanged.emit(this.activeNode);
  }
}
