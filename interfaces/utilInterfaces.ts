export type IsoDate = string;

type DateKeyString = `${number}-${number}-${number}`;

export interface DateValueMap {
  [dateKey: DateKeyString]: number;
}

export type ProviderId = 'tinder' | 'hinge' | 'bumble';
