
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'water' | 'land';
}

export enum ViewState {
  HOME = 'HOME',
  ADVISOR = 'ADVISOR',
  PHILOSOPHY = 'PHILOSOPHY',
  SHOP = 'SHOP',
  TRACKING = 'TRACKING',
  ACTIVITY_DETAIL = 'ACTIVITY_DETAIL'
}