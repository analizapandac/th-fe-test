import PostService from './PostService';
import CommentService from './CommentService';

const postService = new PostService('https://jsonplaceholder.typicode.com');
const commentService = new CommentService('https://jsonplaceholder.typicode.com');

export { postService, commentService };