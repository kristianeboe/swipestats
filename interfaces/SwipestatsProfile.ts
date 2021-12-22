// /profile/:id should return this fully formed

import { AnonymizedTinderDataJSON } from './TinderDataJSON';
import { DateValueMap } from './utilInterfaces';

export interface SwipestatsProfile {
  id: string; // global id
  // how to deal with multiple dating apps though?
  tinderId: string; // unique id based on hash
  hingeId: string;
  bumbleId: string;

  usage: {
    appOpens: DateValueMap;
    matches: DateValueMap;
    swipeLikes: DateValueMap;
    swipePasses: DateValueMap;
    messagesSent: DateValueMap;
    messagesReceived: DateValueMap;
  };
  anonymizedTinderJson: AnonymizedTinderDataJSON;
}
