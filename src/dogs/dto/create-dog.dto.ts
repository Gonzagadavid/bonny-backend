enum DogSize {
  BIG = 'BIG',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
}

enum DogFell {
  SHORT = 'SHORT',
  LONG = 'LONG',
}

export class CreateDogDto {
  name: string;
  age: number;
  size: DogSize;
  breed: string;
  fellColor: string;
  fell: DogFell;
  temperament: string;
  situation: string;
  history: string;
  imageProfile: string;
  images: string[];
  available: boolean;
}
