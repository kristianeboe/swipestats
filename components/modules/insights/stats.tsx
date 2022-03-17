/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { CursorClickIcon, MailOpenIcon, UsersIcon } from '@heroicons/react/outline';
import { classNames } from '../../../lib/utils';
import { TinderProfile } from '@prisma/client';

// https://flowbite.com/docs/customize/dark-mode/
// TODO: Dark mode

interface MessageStat {
  id: string;
  name: string;
  stat: string;
  icon: JSX.Element;
  change?: string;
  changeType: 'increase' | 'decrease';
}

const stats = [
  {
    id: 1,
    name: 'Total Subscribers',
    stat: '71,897',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Avg. Open Rate',
    stat: '58.16%',
    icon: MailOpenIcon,
    change: '5.4%',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Avg. Click Rate',
    stat: '24.57%',
    icon: CursorClickIcon,
    change: '3.2%',
    changeType: 'decrease',
  },
];

const metaKeys = [
  'nrOfConversations',
  'longestConversation',
  'medianConversationLength',
  'averageConversationLength',
  'longestConversationInDays',
  'nrOfOneMessageConversations',
  //   'medianConversationLengthInDays',
  //   'averageConversationLengthInDays',
  'nrOfGhostingsAfterInitialMessage',
  'percentOfOneMessageConversations',
] as const;

interface MessagesMeta {
  nrOfConversations: number;
  longestConversation: number;
  medianConversationLength: number;
  averageConversationLength: number;
  longestConversationInDays: number;
  nrOfOneMessageConversations: number;
  medianConversationLengthInDays: number;
  averageConversationLengthInDays: number;
  nrOfGhostingsAfterInitialMessage: number;
  percentOfOneMessageConversations: number;
}

const metaNames = {
  nrOfConversations: '# of conversations',
  longestConversation: '',
  medianConversationLength: '',
  averageConversationLength: '',
  longestConversationInDays: '',
  nrOfOneMessageConversations: '',
  //   medianConversationLengthInDays: '',
  //   'averageConversationLengthInDays': '' ,
  nrOfGhostingsAfterInitialMessage: '',
  percentOfOneMessageConversations: '',
};

export default function Stats(props: { profiles: TinderProfile[] }) {
  const [me, ...others] = props.profiles as (TinderProfile & { messagesMeta: MessagesMeta })[];

  const messageStats = metaKeys.map((key) => ({
    id: key,
    icon: UsersIcon,
  }));

  return (
    <div>
      {/* <pre>{JSON.stringify(me.messagesMeta)}</pre> */}
      {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3> */}

      <dl className="my-8 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {messageStats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white  px-4  sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt className="">
              <div className="absolute bg-rose-500 rounded-md p-0 sm:p-3 hidden sm:block">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-0 sm:ml-16 text-sm font-medium text-gray-500 truncate">{item.id}</p>
            </dt>
            <dd className="ml-0 sm:ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {me.messagesMeta[item.id].toFixed(0)}
              </p>
              {/* <p
                className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                </span>
                {item.change}
              </p> */}
              {/* <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {' '}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div> */}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
