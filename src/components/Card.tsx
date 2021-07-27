import React from 'react';
import CardView from 'react-native-cardview';

type CardViewProps = {
  children?: JSX.Element | JSX.Element[],
};

const CardViewComponent = ({ children }: CardViewProps) => (
  <CardView
    cardElevation={6}
    cardMaxElevation={2}
    cornerRadius={5}
  >
    {children}
  </CardView>
);

export default CardViewComponent;
