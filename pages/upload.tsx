import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadArea } from '../components/UploadArea';
import { UploadProfileCard } from '../components/UploadProfileCard';
import { TinderDataJSON } from '../interfaces/DataJSON';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jsonProfile, setJsonProfile] = useState<TinderDataJSON | null>(null);

  function onAcceptedFileLoad(data: string) {
    console.log('json data', data);
    setJsonProfile(JSON.parse(data));
  }

  return (
    <div>
      {jsonProfile ? (
        <div>
          <UploadProfileCard dataJSON={jsonProfile} />
          <pre>{JSON.stringify(jsonProfile, undefined, 2)}</pre>
        </div>
      ) : (
        <UploadArea onAcceptedFileLoad={onAcceptedFileLoad} />
      )}

      <div>
        Files
        {files.map((f) => (
          <p key={f.name}>{f.name}</p>
        ))}
      </div>
    </div>
  );
}
