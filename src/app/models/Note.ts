export class Note {

    static empty(): Note {

        return new Note("","",new Date());
    }

    private id: number;
    private title: string;
    private content: string;
    private date: Date;

    constructor( title:string, content: string, date: Date) {

        this.date = date;
        this.title = title;
        this.content = content;
    }

    public setId( id: number ) : void {

        this.id = id;
    }

    public setTitle ( title: string ): void {
        
        this.title = title;
    }

    public setContent ( content : string ): void {
        
        this.content = content;
    }

    public setDate ( date: Date ): void {
        
        this.date = date;
    }

    public getId() : number {
        
        return this.id;
    }

    public getTitle() : string {
        
        return this.title;
    }

    public getContent(): string {
        
        return this.content;
    }

    public getDate() : Date {
        
        return this.date;
    }

    toJSON() {
        return {
            title: this.title,
            content: this.content
        }
    }

}

export interface NoteLiteral {
    id: number,
    title: string,
    content: string,
    date: string
}