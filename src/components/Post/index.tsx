import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostData } from '../../types/Post';
import { postService } from '../../services/api';
import Comments from '../Comments';
import './Post.styles.scss';

const initPost = {
  id: 0,
  userId: 0,
  title: '',
  body: ''
};

export const Post = () => {
  let { postId } = (useParams() as any) as { postId: number };

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostData>(initPost);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await postService.getPost(postId);
        const postResponse = response.data as PostData;
        setPost(postResponse);
      } catch (err) {
        toast.error("Sorry, there was an error fetching the current post. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: 'post-toast'
        });
        setPost(initPost);
      } finally {
        setLoading(false);
      }
    };

    

    getData();
  }, [postId]);

  const { title, body } = post;

  return (
    <div className="postComponent" data-cy="post">
      <Link to="/">Back</Link>
      {loading ? <p>Loading post...</p> : (<><h1>{title}</h1>
        <article>{body}</article>
        <div data-cy="comments-wrapper"><Comments postId={postId} /></div></>)}
    </div>
  );
};

export default Post;