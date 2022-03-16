import { DateValueMap, IsoDate } from './utilInterfaces';

interface TinderDataJSONBase {
  Usage: Usage;
  Campaigns: Campaigns;
  Experiences: Experiences;
  Purchases: Purchases;
  Photos: string[]; // just the name of the phots, not URIs
  Spotify: Spotify;
  Messages: Messages[];
  RoomsAndInteractions: RoomsAndInteractions;
  SwipeNotes: any[];
  StudentVerifications?: StudentVerifications;
}

export interface AnonymizedTinderDataJSON extends TinderDataJSONBase {
  User: AnonymizedTinderUser;
}

export interface FullTinderDataJSON extends TinderDataJSONBase {
  User: FullTinderUser;
}

export interface Usage {
  app_opens: DateValueMap;
  swipes_likes: DateValueMap;
  swipes_passes: DateValueMap;
  superlikes: DateValueMap;
  matches: DateValueMap;
  messages_sent: DateValueMap;
  messages_received: DateValueMap;
  advertising_id: {
    [date: string]: string; // empty string
  };
  idfa: {
    [date: string]: string; // empty string
  };
}

interface TinderUserBase {
  // TODO: Probably move all Date to IsoDate
  active_time: Date;
  age_filter_max: number;
  age_filter_min: number;
  birth_date: IsoDate;
  create_date: IsoDate;

  gender: string;
  gender_filter: string;
  interested_in: string;
  bio?: string;
  city?: City;
  connection_count?: number;
  education: string; // I think this is depreciated

  interests: Interest[];
  ip_address: string;
  is_traveling: boolean;
  jobs: Job[];

  pos: Pos;
  schools: School[];
  travel_location_info: TravelLocationInfo[];
  client_registration_info?: {
    platform: 'ios' | 'android' | string;
  };
  travel_pos: TravelPos;

  college: any[];
  user_interests?: string[]; //  "Fashion","Grab a drink","Cooking","Brunch","Wine"
  sexual_orientations?: string[]; // ['str']
}

interface AnonymizedTinderUser extends TinderUserBase {
  instagram: boolean;
  spotify: boolean;
}

interface FullTinderUser extends TinderUserBase {
  email: string;
  full_name: string;
  name: string;
  username: string;
  phone_id: string;
  instagram?: Instagram;
  spotify?: Spotify;
}

export interface Experiences {
  [key: string]: any;
}

export interface RoomsAndInteractions {
  rooms: [
    {
      role: null;
      is_active: boolean; // almost always true
      is_open: boolean; // almost always true
      room_type: 'sync_swipe' | string;
      created_at: string; // not iso date, but close
      interactions: any[];
    }
  ];
}

interface StudentVerifications {
  entries: any[];
}

interface Campaigns {
  current_campaigns: any[];
  expired_campaigns: any[];
}

interface Coords {
  lat: number;
  lon: number;
}

interface City {
  name: string;
  region: string;
  coords: Coords;
}

interface Photo {
  image: string;
  thumbnail: string;
  ts: string;
  link: string;
}

interface Instagram {
  completed_initial_fetch: boolean;
  last_fetch_time: Date;
  media_count: number;
  photos: Photo[];
  profile_picture: string;
  username: string;
}

interface Interest {
  // facebook interest
  id: string;
  created_time: Date;
  name: string;
}

interface Company {
  displayed: boolean;
  name: string;
}

interface Title {
  displayed: boolean;
  name: string;
}

interface Job {
  company: Company;
  title: Title;
}

interface Pos {
  at: string;
  lat: number;
  lon: number;
}

interface School {
  displayed: boolean;
  name: string;
}

interface AdministrativeAreaLevel1 {
  long_name: string;
  short_name: string;
}

interface AdministrativeAreaLevel2 {
  long_name: string;
  short_name: string;
}

interface Country {
  long_name: string;
  short_name: string;
}

interface Locality {
  long_name: string;
  short_name: string;
}

interface PostalCode {
  long_name: string;
  short_name: string;
}

interface Route {
  long_name: string;
  short_name: string;
}

interface StreetNumber {
  long_name: string;
  short_name: string;
}

interface TravelLocationInfo {
  administrative_area_level_1: AdministrativeAreaLevel1;
  administrative_area_level_2: AdministrativeAreaLevel2;
  country: Country;
  locality: Locality;
  postal_code: PostalCode;
  route: Route;
  street_number: StreetNumber;
  lat: number;
  lon: number;
}

interface TravelPos {
  lat: number;
  lon: number;
}

interface Pos2 {
  lat: number;
  lon: number;
}

interface Subscription {
  status: string;
  terms: number;
  product_type: string;
  create_date: Date;
  expire_date: Date;
  platform: string;
  pos: Pos2;
}

export interface Purchases {
  subscription: Subscription[];
  consumable: any[];
  boost_tracking: any[];
  super_like_tracking: any[];
}

export interface Spotify {
  spotify_connected: boolean;
}

export interface Message {
  to: number; // match id - 1
  from: string; // "You"
  message: string; // should maybe clean this from HTML to string. Lot's of "don&rsquo;t" // new Date() actually works well to parse it
  sent_date: string; // not iso string, but close "Tue, 30 Nov 2021 05:08:21 GMT"
  type?: string; // "gif"
  fixed_height?: string; // url (to gif)
}

export interface Messages {
  match_id: string;
  messages: Message[];
}
