type EventCategory = 'Marketing' | 'Upload' | 'Insights' | 'Global';

type MarketingAction =
  | 'Banner Dismissed'
  | 'Email reminder Viewed'
  | 'Email reminder Submitted'
  | 'Email reminder Reset';

type FileAction =
  | 'File reading Rejected'
  | 'File reading Initialized'
  | 'File reading Aborted'
  | 'File reading Failed'
  | 'File reading Succeeded';

type ProfileAction =
  | 'Profile Anonymised Successfully'
  | 'Profile Anonymised Failed'
  | 'Profile Upload Initialized'
  | 'Profile Created'
  | 'Profile Updated';

type InsightsAction = 'Compared with an id' | 'Compared with a segment' | 'Changed data view';

type OtherAction = 'Provider waitlist Signed up';

type CTA_ACTION = 'Get Dataset CTA' | 'Try Roast CTA';

type ResearchActions =
  | 'Research select Small Sample'
  | 'Research select Full package'
  | 'Research select Reach out';

export type AnalyticsAction =
  | MarketingAction
  | FileAction
  | ProfileAction
  | InsightsAction
  | OtherAction
  | CTA_ACTION
  | ResearchActions
  | 'page_view';
