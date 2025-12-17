import {CommentUser} from './comment.ts';

export interface Review {
  id: string;
  userName: string;
  user: CommentUser;
  rating: number;
  text: string;
  date: string;
}
