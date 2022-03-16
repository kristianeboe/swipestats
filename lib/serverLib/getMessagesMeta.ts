import differenceInDays from 'date-fns/differenceInDays';
import { Messages } from '../../interfaces/TinderDataJSON';

export function getMessagesMeta(messagesRaw: Messages[]) {
  const meta = {
    nrOfConversations: messagesRaw.length,
    longestConversation: 0,
    longestConversationInDays: 0, //days
    averageConversationLength: 0,
    averageConversationLengthInDays: 0, //days
    medianConversationLength: 0,
    medianConversationLengthInDays: 0, // days
    nrOfOneMessageConversations: 0,
    percentOfOneMessageConversations: 0,
    nrOfGhostingsAfterInitialMessage: 0,
    //nrOfGhostings
  };

  if (messagesRaw.length === 0) return meta;

  const conversationLengths: { days: number; messages: number }[] = [];

  messagesRaw.forEach((conversation) => {
    const messagesSent = conversation.messages.length;

    meta.averageConversationLength += messagesSent;

    if (messagesSent === 0) {
      meta.nrOfGhostingsAfterInitialMessage += 1;
      conversationLengths.push({
        days: 0,
        messages: 0,
      });
    } else {
      if (messagesSent === 1) {
        meta.nrOfOneMessageConversations += 1;
      }

      // "Tue, 30 Nov 2021 06:09:58 GMT"
      const conversationStartDate = new Date(conversation.messages[0].sent_date);
      const conversationEndDate = new Date(conversation.messages[messagesSent - 1].sent_date);
      const conversationLength = differenceInDays(conversationStartDate, conversationEndDate);

      conversationLengths.push({
        days: conversationLength,
        messages: messagesSent,
      });

      if (messagesSent > meta.longestConversation) {
        meta.longestConversation = messagesSent;
      }

      if (conversationLength > meta.longestConversationInDays) {
        meta.longestConversationInDays = conversationLength;
      }

      meta.averageConversationLengthInDays += conversationLength;
    }
  });

  meta.medianConversationLengthInDays = conversationLengths.sort((a, b) => a.days - b.days)[
    Math.floor(conversationLengths.length / 2)
  ].days; // fake median

  meta.medianConversationLength = conversationLengths.sort((a, b) => a.messages - b.messages)[
    Math.floor(conversationLengths.length / 2)
  ].messages; // fake median

  meta.averageConversationLength = Number(
    Number(meta.averageConversationLength / meta.nrOfConversations)
  );

  meta.averageConversationLengthInDays = Number(
    Number(meta.averageConversationLengthInDays / meta.nrOfConversations)
  );

  meta.percentOfOneMessageConversations =
    (meta.nrOfOneMessageConversations / meta.nrOfConversations) * 100;

  return meta;
}
