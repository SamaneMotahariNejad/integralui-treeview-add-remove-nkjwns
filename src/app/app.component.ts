import { Component, ViewContainerRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { IntegralUITreeView } from '@lidorsystems/integralui-web/bin/integralui/components/integralui.treeview';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
    @ViewChild('application', {read: ViewContainerRef}) applicationRef: ViewContainerRef;
    @ViewChild('treeview') treeview: IntegralUITreeView;

    public data: Array<any>;

    public disableButtons: boolean = true;
    public insertPos: number = 0;
    public removePos: number = 0;

    private itemCount: number = 3;

    private parentItem: any = null;
    private itemIndex: number = -1;

    public ctrlStyle: any = {
        general: {
            normal: 'trw-add-rmv-normal'
        }
    }

    constructor(){
        this.data = [
            { 
                id: 1,
                text: "Item 1",
                items: [
                    { id: 2, pid: 1, text: "Item 2" }
                ]
            },
            { id: 3, text: "Item 3" }
        ];
    }   
                
    createNewItem(){
        this.itemCount++;

        return { text: "Item " + this.itemCount };
    }

    addRoot(){
        let item: any = this.createNewItem();
        this.treeview.addItem(item);
    }

    addChild(){
        let item: any = this.createNewItem();

        this.treeview.addItem(item, this.treeview.selectedItem);
    }

    insertAfter(){
        let item: any = this.createNewItem();
        
        this.treeview.insertItemAfter(item, this.treeview.selectedItem);
    }

    insertBefore(){
        let item: any = this.createNewItem();
        
        this.treeview.insertItemBefore(item, this.treeview.selectedItem);
    }

    insertAt(){
        let item: any = this.createNewItem();
        
        this.treeview.insertItemAt(item, this.insertPos, this.treeview.selectedItem);
    }

    remove(){
        if (this.treeview.selectedItem)
            this.treeview.removeItem(this.treeview.selectedItem);
    }

    removeAt(){
        this.treeview.removeItemAt(this.removePos, this.treeview.selectedItem);
    }

    clear(){
        this.treeview.clearItems();
    }

    onItemAdded(e: any){
        this.treeview.refresh();
    }

    onItemRemoving(e: any){
        this.itemIndex = -1;
        this.parentItem = this.treeview.getItemParent(e.item);
        let list: Array<any> = this.treeview.getList('', this.parentItem);
        if (list && list.length > 0)
            this.itemIndex = list.indexOf(e.item);
    }

    onItemRemoved(e: any){
        this.selectNewItem();

        if (!this.treeview.selectedItem)
            this.disableButtons = true;
    }

    onClear(){
        this.disableButtons = true;
    }

    onAfterSelect(e: any){
        this.disableButtons = this.treeview.selectedItem ? false : true;
    }

    selectNewItem(){
        let list: Array<any> = this.treeview.getList('', this.parentItem);
        if (list && list.length > 0){
            if (this.itemIndex == list.length)
                this.itemIndex = list.length - 1;

            if (this.itemIndex >= 0 && this.itemIndex < list.length){
                if (this.itemIndex < list.length)
                    this.treeview.selectedItem = list[this.itemIndex];
                else
                    this.treeview.selectedItem = list[list.length-1];
            }
        }
        else if (this.parentItem)
            this.treeview.selectedItem = this.parentItem;
        else
            this.treeview.selectedItem = null;
    }
  }
