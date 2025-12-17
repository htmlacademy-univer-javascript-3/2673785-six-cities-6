export interface Review {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
  userName: string;
}

interface User {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface ReviewData {
  comment: string;
  rating: number;
}
