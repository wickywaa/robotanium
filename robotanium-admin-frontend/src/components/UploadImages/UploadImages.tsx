import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { Storage } from "../../firebase/AdminFirebase";
import React from "react";

export interface IUploadImmagesButton {
  buttonName: string;
  fileName: string;
  OnUrlSave: (url: string) => void;
}

export const Uploadimages: React.FC<IUploadImmagesButton> = ({ fileName, OnUrlSave }) => {
  const photoRef = ref(Storage, fileName);

  const handleUpload = async (event: FileUploadHandlerEvent) => {
    await uploadBytes(photoRef, event.files[0])
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          OnUrlSave(url);
        });
      })
      .catch(() => {});
  };

  return (
    <div>
      <FileUpload
        uploadHandler={handleUpload}
        customUpload={true}
        multiple
        name={fileName}
        accept="image/*"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
      />
    </div>
  );
};
