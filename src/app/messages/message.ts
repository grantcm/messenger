import { MessageId } from './message-id';
import { ConversationId } from '../conversations/conversation-id';
import { UserId } from '../users/user-id';

export class Message {
    _id: MessageId;
    conversationId: ConversationId;
    sentBy: UserId;
    sentByName: string;
    contents: string;

    constructor(sentBy: string, contents: string){
        this.sentByName = sentBy;
        this.contents = contents;
    }
}
