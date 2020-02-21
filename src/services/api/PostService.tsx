import HttpRequest from './HttpRequest';

class PostService extends HttpRequest {
  getPosts() {
    return this.fetch('/posts');
  }

  getPost(postId: number) {
    return this.fetch(`/posts/${postId}`);
  }
}

export default PostService;