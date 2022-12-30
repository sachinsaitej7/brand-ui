import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Modal, Upload, App } from "antd";

import { useUploadImage, useDeleteImage } from "./hooks";

// images
import { ReactComponent as UploadImagePlaceholder } from "../../assets/home/image-placeholder.svg";

const StyledUpload = styled(Upload)`
  .ant-upload-select {
    width: 56px !important;
    height: 56px !important;
  }
  .ant-upload-list-item-container {
    width: 56px !important;
    height: 56px !important;
  }
`;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImages = ({ limit = 8, onSuccess }) => {
  const theme = useTheme();
  const { message } = App.useApp();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const { uploadImage, uploadImageLoading, error } = useUploadImage();
  const { deleteImage, deleteImageLoading } = useDeleteImage();

  useEffect(() => {
    error && message.error(error.message);
  }, [error, message]);

  useEffect(() => {
    if (!uploadImageLoading && !deleteImageLoading) {
      onSuccess(fileList.filter((file) => file.status === "done"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // remove file from fileList
  const handleRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
    try {
      await deleteImage(file);
    } catch (err) {
      message.error(err.message);
    }
  };

  const beforeUpload = (file) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`);
      return null;
    }
    return true;
  };

  // customeRequest for firebase upload in antd upload component
  const handleUpload = async ({ file, onSuccess, onProgress, onError }) => {
    try {
      const handleError = (err) => {
        handleRemove(file);
        onError(err);
      };
      await uploadImage(file, { onSuccess, onProgress, onError: handleError });
    } catch (err) {
      message.error(err.message);
      console.log(err);
      onError(err);
    }
  };

  return (
    <>
      <StyledUpload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept='image/*'
        beforeUpload={beforeUpload}
        customRequest={handleUpload}
        onRemove={handleRemove}
        progress={{
          strokeColor: {
            "0%": theme.colors.secondary,
            "100%": theme.colors.primary,
          },
          format: (percent) => `${parseFloat(percent.toFixed(0))}%`,
        }}
        maxCount={limit}
        disabled={uploadImageLoading || deleteImageLoading}
        multiple
      >
        {fileList.length >= limit ? null : (
          <UploadImagePlaceholder width={"56px"} height={"56px"} />
        )}
      </StyledUpload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default UploadImages;
