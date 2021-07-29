import React from 'react';
import { Button } from 'react-native';

type ButtonProps = {
  handleClick: () => void,
};

const ButtonComponent = ({ handleClick }: ButtonProps) => (
  <Button
    title="Save to Camera Roll"
    color="#ffffff"
    onPress={handleClick}
  />
);

export default ButtonComponent;
