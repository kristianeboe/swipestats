import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Footer } from '../components/tw/Footer';
import Navbar from '../components/tw/Navbar';
import { UploadArea } from '../components/UploadArea';
import { UploadProfileCard } from '../components/UploadProfileCard';
import { TinderDataJSON } from '../interfaces/DataJSON';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';

const dataProviders = [
  { id: 1, title: 'Tinder', description: 'Last message sent an hour ago', users: '621 users' },
  {
    id: 2,
    title: 'Hinge',
    description: 'Last message sent 2 weeks ago',
    users: '1200 users',
  },
  { id: 3, title: 'Bumble', description: 'Last message sent 4 days ago', users: '2740 users' },
];

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonProfile, setJsonProfile] = useState<TinderDataJSON | null>(null);

  function onAcceptedFileLoad(data: string) {
    console.log('json data', data);
    setJsonProfile(JSON.parse(data));
  }

  const [selectedDataProvider, setDataProvider] = useState(dataProviders[0]);

  return (
    <div>
      <div className="h-screen">
        {/* <Navbar simple={true} /> */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-rose-600 tracking-wide uppercase">
                Upload
              </h2>
              <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Visualize your {selectedDataProvider.title} data
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Upload your data anonymously and compare it to demographics from around the world!
              </p>
            </div>
            {!jsonProfile && (
              <RadioGroup value={selectedDataProvider} onChange={setDataProvider}>
                <RadioGroup.Label className="text-base font-medium text-gray-900 sr-only">
                  Select a data provider
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  {dataProviders.map((dataProvider) => (
                    <RadioGroup.Option
                      key={dataProvider.id}
                      value={dataProvider}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? 'border-transparent' : 'border-gray-300',
                          active ? 'ring-2 ring-rose-500' : '',
                          'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <div className="flex-1 flex">
                            <div className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {dataProvider.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm text-gray-500"
                              >
                                {dataProvider.description}
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {dataProvider.users}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          <CheckCircleIcon
                            className={classNames(
                              !checked ? 'invisible' : '',
                              'h-5 w-5 text-rose-600'
                            )}
                            aria-hidden="true"
                          />
                          <div
                            className={classNames(
                              active ? 'border' : 'border-2',
                              checked ? 'border-rose-500' : 'border-transparent',
                              'absolute -inset-px rounded-lg pointer-events-none'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>
        </div>

        <div className="">
          <div className="flex flex-col justify-center items-center">
            {jsonProfile ? (
              <UploadProfileCard dataJSON={jsonProfile} />
            ) : (
              <>
                <UploadArea onAcceptedFileLoad={onAcceptedFileLoad} />
              </>
            )}

            {/* <div>
        Files
        {files.map((f) => (
          <p key={f.name}>{f.name}</p>
        ))}
      </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
