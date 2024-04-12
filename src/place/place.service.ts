import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  PLACES_API_BASE_URL,
  SEARCH_BY_ID_URL,
  SEARCH_BY_TEXT_URL,
} from 'src/common/constants/google-apis.constant';

@Injectable()
export class PlaceService {
  async searchByText(text: string) {
    const place = await axios.post(
      SEARCH_BY_TEXT_URL,
      { textQuery: text, languageCode: 'ko' },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.formattedAddress,places.priceLevel',
        },
      },
    );
    console.log(place.data.places[0].id);
    return this.getDetailById(place.data.places[0].id);
  }

  async getDetailById(id: string) {
    const placeDetail = await axios.get(SEARCH_BY_ID_URL + id, {
      params: { languageCode: 'ko' },
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'id,name,types,displayName,nationalPhoneNumber,formattedAddress,location,googleMapsUri,websiteUri,regularOpeningHours,displayName,primaryTypeDisplayName,goodForChildren,allowsDogs,goodForGroups,goodForWatchingSports,accessibilityOptions,photos',
      },
    });
    return placeDetail.data;
  }

  async getPlacePhoto(photoResource: string) {
    console.log(PLACES_API_BASE_URL + photoResource + '/media');
    const photo = await axios.get(
      PLACES_API_BASE_URL + photoResource + '/media',
      {
        params: {
          key: process.env.GOOGLE_API_KEY,
          maxHeightPx: 1000,
          maxWidthPx: 1000,
          skipHttpRedirect: true,
        },
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        },
      },
    );
    return { photoUri: photo.data.photoUri };
  }
}
