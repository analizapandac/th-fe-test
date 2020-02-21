import React from 'react';
import { CommentData } from '../../types/Comment';
import './Comment.styles.scss';

export const Comment = (props: CommentData) => {
  const { email, name, body } = props;

  return (
    <li className="commentComponent" data-cy="comment-item">
      <div className="author">
        <div className="avatar"></div>
        <div className="authorDetails">
          <div>{name}</div>
          <div>{email}</div>
        </div>
      </div>
      <div className="commentBody">{body}</div>
    </li>
  );
};

export default Comment;