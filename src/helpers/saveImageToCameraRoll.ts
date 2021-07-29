import Snackbar from 'react-native-snackbar';
import { save } from '@react-native-community/cameraroll';

const saveImageToCameraRoll = () => async (imageSource: string) => {
  await save(imageSource);
  Snackbar.show({
    text: 'Saved image to camera roll',
    duration: Snackbar.LENGTH_SHORT,
  });
};

export default saveImageToCameraRoll;
