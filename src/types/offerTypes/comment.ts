export interface CommentUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface Comment {
  id: string;
  date: string;
  user: CommentUser;
  comment: string;
  rating: number;
}

export interface CommentData {
  comment: string;
  rating: number;
}
