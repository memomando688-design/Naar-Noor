/** Raw review shape returned by the API */
export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  source: string | null;
  createdAt: string;
}

/** Enriched view model used by the reviews section component */
export interface ReviewView {
  id: string;
  text: string;
  author: string;
  initial: string;
  rating: number;
  stars: number[];
  source: string | null;
  date: string;
}
