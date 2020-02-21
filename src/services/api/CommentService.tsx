import HttpRequest from './HttpRequest';

class CommentService extends HttpRequest {
  getCommentsByPost(postId: number) {
    return this.fetch('/comments', { postId });
  }
}

export default CommentService;