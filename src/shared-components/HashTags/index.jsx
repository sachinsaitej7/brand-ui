import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

const HashTags = ({ onChange = () => {} }) => {
  const theme = useTheme();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
        key={tag}
        style={{
          margin: theme.space[2] + " " + theme.space[2],
          fontSize: theme.fontSizes[2],
          padding: theme.space[2] + " " + theme.space[3],
        }}
      >
        {`# ${tag}`}
      </Tag>
    );
    return tagElem;
  };

  const tagChild = tags.map(forMap);

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {tagChild}
        {inputVisible && (
          <Input
            ref={inputRef}
            type='text'
            size='small'
            style={{
              width: 84,
              margin: theme.space[2] + " " + theme.space[2],
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
            autoFocus
          />
        )}
        {!inputVisible && tags.length < 6 && (
          <Tag
            onClick={showInput}
            style={{
              margin: theme.space[2] + " " + theme.space[2],
              fontSize: theme.fontSizes[1],
              padding: theme.space[2] + " " + theme.space[3],
            }}
          >
            <PlusOutlined />
            Add HashTag
          </Tag>
        )}
      </div>
    </>
  );
};

export default HashTags;
