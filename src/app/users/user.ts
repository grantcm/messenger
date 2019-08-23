import { UserId } from './user-id';

export class User {
    _id: UserId;
    name: string;
    email: string;
    favoriteAnimal: string;

    constructor(id: UserId, name: string, email: string, favoriteAnimal: string) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.favoriteAnimal = favoriteAnimal;
    }
}
