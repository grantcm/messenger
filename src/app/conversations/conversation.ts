import { ConversationId } from './conversation-id';
import { UserId } from '../users/user-id';

export class Conversation {
    _id: ConversationId;
    participants: UserId[];

    constructor(participants: UserId[]) {
        this.participants = participants;
    }
}
