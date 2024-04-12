import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
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
    const placeDetail = await axios.get(SEARCH_BY_ID_URL + '/' + id, {
      params: { languageCode: 'ko' },
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_API_KEY,
        'X-Goog-FieldMask':
          'id, displayName, formattedAddress, types, nationalPhoneNumber, places.location, places.googleMapsUri, places.websiteUrl, places.regularOpeningHours, places.primaryTypeDisplayName, places.goodForChildren, places.allowDogs, places.accessibilityOptions, photos',
      },
    });
    return placeDetail.data;
  }
}
