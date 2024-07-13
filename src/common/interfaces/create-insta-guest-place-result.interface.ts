import { InstaGuestFolderPlace } from 'src/entities/insta-guest-folder-place.entity';

export interface CreateInstaGuestFolderPlaceResult {
  status: 'existing' | 'created';
  data: InstaGuestFolderPlace;
}
