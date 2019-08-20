import { UserId } from './user-id';

export class User {
    _id?: UserId;
    name: string;
    email: string;
    favoriteAnimal: string;

    constructor(name: string, favoriteAnimal: string) {
        this.name = name;
        this.favoriteAnimal = favoriteAnimal;
    }
}
