import React, { useState, useEffect, ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { commentService } from '../../services/api';
import { CommentData } from '../../types/Comment';
import Comment from '../Comment';
import CommentFilterBar from '../CommentFilterBar';
import './Comments.styles.scss';

interface CommentsProps {
  postId: number;
}

export const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        setLoading(true);
        const response = (await commentService.getCommentsByPost(props.postId)) as AxiosResponse<CommentData[]>;
        const commentsData = response.data as CommentData[];
        setComments(commentsData);
      } catch (err) {
        console.log({ err });
        toast.error("Sorry, there was an error fetching the list of comments. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: 'comment-toast'
        });
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    getComments();
  }, [props.postId]);

  const renderComments = () => {
    const filteredComments = query ? comments.filter(comment => {
      const { email, name, body } = comment;
      const normalizedQuery = query.toLowerCase();
      return email?.toLowerCase().indexOf(normalizedQuery) >= 0 || name?.toLowerCase().indexOf(normalizedQuery) >= 0 || body?.toLowerCase().indexOf(normalizedQuery) >= 0
    }) : comments;

    if (filteredComments.length === 0) return 'No comments found.';

    return (
      <ul>
        {(filteredComments || []).map((comment) => {
          return <Comment data-cy="" key={comment.id} {...comment} />
        })}
      </ul>
    );
  }

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <div className="commentsComponent">
      <div className="commentsHeader">
        <h3>Comments</h3>
        <CommentFilterBar handleQueryChange={handleQueryChange} />
      </div>
      {loading ? <p>Loading comments...</p> : renderComments()}
    </div>
  );
}

export default Comments;