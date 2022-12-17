import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { getFirebase } from "../../firebase";

const { storage } = getFirebase();

// upload image hook into firebase storage
export const useUploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadImage = async (
    uploadFile,
    { onSuccess, onProgress, onError }
  ) => {
    setUploading(true);
    const fileName = `${uploadFile.name}-${Date.now()}`;
    // store in brand-images folder
    const storageRef = ref(storage, `brand-images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadFile, {
      contentType: uploadFile.type,
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        onProgress({ percent: progress });
      },
      (error) => {
        console.log(error, "error");
        onError(error);
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const url = downloadURL.replace(
            "https://firebasestorage.googleapis.com",
            "https://ik.imagekit.io/jg7ousac2"
          );
          onSuccess({
            downloadURL: url,
            uploadFile,
          });
          setUploading(false);
        });
      }
    );
  };
  return { uploadImage, uploading, progress, error };
};

// delete image hook from firebase storage
export const useDeleteImage = () => {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteImage = async (file) => {
    setDeleting(true);
    const storageRef = ref(storage, file.name);
    try {
      await deleteObject(storageRef);
      setDeleting(false);
    } catch (err) {
      setError(err);
    }
  };

  return { deleteImage, deleting, error };
};
