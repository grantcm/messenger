import { MessageId } from './message-id';
import { ConversationId } from '../conversations/conversation-id';
import { UserId } from '../users/user-id';

export class Message {
    _id: MessageId;
    conversationId: ConversationId;
    sentBy: UserId;
    sentByName: string;
    contents: string;

    constructor(sentBy: UserId, sentByName: string, conversationId: ConversationId, contents: string) {
        this.sentBy = sentBy;
        this.sentByName = sentByName;
        this.conversationId = conversationId
        this.contents = contents;
    }
}
