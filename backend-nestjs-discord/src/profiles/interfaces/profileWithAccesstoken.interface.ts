import { Profile } from 'src/shared/schema/profile';
export interface ProfileWithAccessToken {
  profile: Profile;
  accessToken: string;
}
