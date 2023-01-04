import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Input } from "antd";
import { HASH_TAGS } from "./constants";

const HashTags = ({ onChange = () => {} }) => {
  const theme = useTheme();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    onChange(tags.filter((tag) => tag));
  }, [tags, onChange]);

  const handleInputConfirm = (e, index) => {
    const { value } = e.target;
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {HASH_TAGS.map((tag, index) => {
          return (
            <div
              key={tag}
              style={{
                marginBottom: theme.space[4],
                marginRight: theme.space[4],
              }}
            >
              <Input
                type='text'
                prefix='#'
                placeholder={tag}
                style={{ width: tag.length * 15.5, height: 25 }}
                onBlur={(e) => handleInputConfirm(e, index)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HashTags;
