export interface UserInfo {
  id_user?: string;

  data?: {
    name: string,
    username: string,
    email: string,
    birth_date: string;

    avatarImage: string;
    backgroundImage: string;

    bio: string;
    level: string;
    coins: string;
    friends: string;
  }

  error?: string;
  message?: string;
}
