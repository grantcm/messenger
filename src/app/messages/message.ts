import { MessageId } from './message-id';
import { ConversationId } from '../conversations/conversation-id';
import { UserId } from '../users/user-id';

export class Message {
    _id: MessageId;
    conversationId: ConversationId;
    receipients: UserId[];
    sentBy: UserId;
    contents: string;

    constructor(sentBy: UserId, receipients: UserId[], conversationId: ConversationId, contents: string) {
        this.sentBy = sentBy;
        this.receipients = receipients;
        this.conversationId = conversationId
        this.contents = contents;
    }
}
