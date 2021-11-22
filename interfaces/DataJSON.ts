export interface TinderDataJSON {
  User: User;
  Usage: Usage;
  Campaigns: Campaigns;
  Purchases: Purchases;
  Photos: string[];
  Spotify: Spotify;
  Messages: Message[];
  StudentVerifications: StudentVerifications;
}

export interface Usage {
  app_opens: AppOpens;
  swipes_likes: SwipesLikes;
  swipes_passes: SwipesPasses;
  matches: Matches;
  messages_sent: MessagesSent;
  messages_received: MessagesReceived;
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

interface User {
  active_time: Date;
  age_filter_max: number;
  age_filter_min: number;
  bio: string;
  birth_date: Date;
  city: City;
  connection_count: number;
  create_date: Date;
  education: string;
  email: string;
  full_name: string;
  gender: string;
  gender_filter: string;
  instagram: Instagram;
  spotify: Instagram; // no
  interested_in: string;
  interestsc: Interest[];
  ip_address: string;
  is_traveling: boolean;
  jobs: Job[];
  name: string;
  pos: Pos;
  schools: School[];
  travel_location_info: TravelLocationInfo[];
  travel_pos: TravelPos;
  username: string;
  phone_id: string;
  college: any[];
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

type DateKeyString = `${number}-${number}-${number}`;
export interface AppOpens {
  [dateKey: DateKeyString]: number;
}

export interface SwipesLikes {
  [dateKey: DateKeyString]: number;
}

export interface SwipesPasses {
  [dateKey: DateKeyString]: number;
}

export interface Matches {
  [dateKey: DateKeyString]: number;
}

export interface MessagesSent {
  [dateKey: DateKeyString]: number;
}

export interface MessagesReceived {
  [dateKey: DateKeyString]: number;
}

export interface Message2 {
  to: number;
  from: string;
  message: string;
  sent_date: string;
  type: string;
  fixed_height: string;
}

export interface Message {
  match_id: string;
  messages: Message2[];
}
