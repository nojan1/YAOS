export interface IEditingComponentBase {
    save();
}

export abstract class EditingComponentBase<T> implements IEditingComponentBase{
    public items: T[] = [];
    public workingCopy: T;
    public inEditMode: boolean = false;
    public isNew: boolean = false;

    private backup: T;
    private original: T;

    public createNew() {
        this.isNew = true;
        this.inEditMode = true;
        this.workingCopy = this.emptyItemFactory();
        this.backup = null;
    }

    public edit(item: T, saveChanges: boolean){
        this.isNew = false;
        this.inEditMode = true;

        if(this.original){
            this.original = Object.assign(this.original, saveChanges ? this.workingCopy : this.backup);
        }

        this.backup = Object.assign({}, item);
        this.workingCopy = Object.assign({}, item);
        this.original = item;
    }

    public reset(){
        this.isNew = false;
        this.inEditMode = false;
        this.workingCopy = null;
        this.original = null;
        this.backup = null;
    }

    public save(){ }
    protected abstract emptyItemFactory() : T;
}