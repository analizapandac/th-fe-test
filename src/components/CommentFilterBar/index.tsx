import React, { ChangeEvent } from 'react';

interface CommentFilterBarProps {
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const CommentFilterBar = (props: CommentFilterBarProps) => {
  const { handleQueryChange } = props;
  return (
    <input placeholder="Filter comments by name, email or body" onChange={handleQueryChange} />
  );
}

export default CommentFilterBar;