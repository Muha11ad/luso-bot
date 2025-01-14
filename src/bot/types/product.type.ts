import { ITranslation } from './translation.type';

export interface IImage {
  id: string;
  imageUrl: string;
  product_id: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  Images: IImage[];
  created_at: Date;
  available: boolean;
  category_id: string;
  characteristic_id: string;
  instruction: ITranslation;
  Characteristic: ICharacteristic;
}

export interface ICharacteristic {
  age: string;
  brand: string;
  volume: String;
  product_id: string;
  gender: ITranslation;
  made_in: ITranslation;
  expiration_date: Date;
  caution: ITranslation;
  purpose: ITranslation;
  skin_type: ITranslation;
  ingredients: ITranslation;
  application_time: ITranslation;
}

