export interface UserInfo {
  data?: {
    name: string,
    username: string,
    email: string,
    bio: string;

    avatarImage: string;
    backgroundImage: string;

    socials: {
      telegram?: string;
      facebook?: string;
      twitter?: string;
      twitch?: string;
    }
  }

  message?: string;
}
