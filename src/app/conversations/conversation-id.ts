export class ConversationId {
    _id: string;

    constructor(id: string) {
        this._id = id;
    }

    public toString = () : string => {
        return `${this._id}`;
    }
}
