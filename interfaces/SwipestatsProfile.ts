// /profile/:id should return this fully formed

import { AnonymizedTinderDataJSON } from './TinderDataJSON';
import { DateValueMap } from './utilInterfaces';

export interface SwipestatsProfile {
  id: string; // global id
  // how to deal with multiple dating apps though?
  tinderId: string; // unique id based on hash
  hingeId: string;
  bumbleId: string;

  tinderProfile: {
    appOpens: DateValueMap;
    matches: DateValueMap;
    swipeLikes: DateValueMap;
    swipePasses: DateValueMap;
    messagesSent: DateValueMap;
    messagesReceived: DateValueMap;
  };
  anonymizedTinderJson: AnonymizedTinderDataJSON;
}

export interface OLD_MONGO_Profile {
  _id: string;
  userId: string;
  conversations: {
    match_id: string; // Match 739
    messages: {
      message?: string;
      to: number; // same as match_id, but one less // 738
      from: string; // "You"
      sent_date: string; // ISO date string
    }[];
  }[];
  conversationsMeta: {
    nrOfConversations: number; //739
    longestConversation: number; // 133
    longestConversationInDays: number; // 683.5574421296296
    averageConversationLength: number; // 8.56021650879567
    averageConversationLengthInDays: number; // 10.236619931839824
    medianConversationLength: number; // 3
    medianConversationLengthInDays: number; // 0.08113425925925925
    nrOfOneMessageConversations: number; // 226
    percentOfOneMessageConversations: number; // 30.581867388362653
    nrOfGhostingsAfterInitialMessage: number; // 66
  };
  appOpens: DateValueMap;
  matches: DateValueMap;
  messages: {
    sent: DateValueMap;
    received: DateValueMap;
  };
  messagesReceived: DateValueMap;
  messagesSent: DateValueMap;
  swipeLikes: DateValueMap;
  swipePasses: DateValueMap;
  swipes: {
    likes: DateValueMap;
    passes: DateValueMap;
  };
  user: {
    birthDate: string; // iso string
    ageFilterMin: number;
    ageFilterMax: number;
    cityName: string;
    country: string;
    createDate: string; // iso date
    education: string; // "Has high school and/or college education"
    gender: 'M' | 'F';
    interestedIn: 'M' | 'F';
    genderFilter: 'M' | 'F';
    instagram: boolean;
    spotify: boolean;
    educationLevel: string; // "Has high school and/or college education"
    schools: {
      displayed: boolean;
      name: string;
      id?: string;
      type?: string; // College
      year?: number;
    }[];
    jobs: [
      {
        companyDisplayed: boolean;
        titleDisplayed: boolean;
        title: string | boolean;
      }
    ];
  };
}
