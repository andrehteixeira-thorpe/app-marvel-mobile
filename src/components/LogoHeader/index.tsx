import React from 'react';
import { Image } from 'react-native';

import LogoMarvel from '../../assets/images/marvelLogo/marvel.png';

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 130, height: 52, marginTop: 10 }}
      source={LogoMarvel}
    />
  );
}