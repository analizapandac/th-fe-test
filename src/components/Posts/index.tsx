import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postService } from '../../services/api';
import { PostData } from '../../types/Post';
import './Posts.styles.scss';
  
export const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = (await postService.getPosts()) as AxiosResponse<PostData[]>;
        const postResponse = response.data as PostData[];
        setPosts(postResponse);
      } catch (err) {
        console.log({ err });
        toast.error("Sorry, there was an error fetching the list of posts. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT
        });
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  const renderPosts = () => {

    if (posts.length === 0) return 'No posts found.';

    return (
      <ul>
        {(posts || []).map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id} data-cy="post-item">
              <Link to={`/posts/${id}`}>
                <div className="title">{title}</div>
                <div className="body">{body}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="postsComponent" data-cy="posts">
      <h1 className="appName">Awesome Posts</h1>
      <p className="meta">Showing {posts.length} posts.</p>
      {loading ? <p>Loading posts...</p> : renderPosts()}
    </div>
  );
}

export default Posts;