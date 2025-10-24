export type Rating = 1 | 2 | 3 | 4 | 5

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: Rating;
  text: string;
  date: string;
}
