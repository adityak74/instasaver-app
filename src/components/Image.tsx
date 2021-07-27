import React from 'react';
import styles from '../styles';
import FastImage from 'react-native-fast-image';

const {
  priority,
  resizeMode,
} = FastImage;

const { normal } = priority;
const { contain } = resizeMode;

type ImageComponentProps = {
  source: string
};

const ImageComponent = ({ source }: ImageComponentProps) => (
  <FastImage
    style={styles.fastImageView}
    source={{
      priority: normal,
      uri: source,
    }}
    resizeMode={contain}
  />
);

export default ImageComponent;
