export interface UserInfo {
  data?: {
    id_user: string;

    name: string;
    username: string;
    email: string;
    birth_date: string;

    avatar_image: string;
    background_image: string;

    bio: string;
    level: string;
    coins: string;
    followers: string;
  };

  error?: string;
  message?: string;
}
