import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import {
  compose,
  withHandlers,
} from 'recompose';
import Snackbar from 'react-native-snackbar';

import styles from './styles';
import sentrySetup from './sentry';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Card from './components/Card';
import saveImageToCameraRoll from './helpers/saveImageToCameraRoll';
import Buttom from './components/Button';
import Image from './components/Image';
import receiveSharingIntent from './helpers/receiveSharingIntent';
import requestHelper from './helpers/request';
import {
  handlerProps,
  AppProps,
  PropsWithChildren,
  receiveShareSuccessProps,
} from './types';

sentrySetup(true);

const AppComponent: React.FC<PropsWithChildren> = ({
  receiveShareSuccess,
  receiveShareError,
}: AppProps) => {
  const [imageSource, setImageSource] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    return receiveSharingIntent(receiveShareSuccess, receiveShareError);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header />
      {submitting && <Spinner />}
      {imageSource && 
        <Card>
          <View style={styles.container}>
            <Image
              source={imageSource}
            />
            <View style={styles.buttonView}>
              <Buttom
                handleClick={saveImageToCameraRoll}
              />
            </View>
          </View>
        </Card>
      }
    </SafeAreaView>
  );
}

const enhance = compose(
  withHandlers<receiveShareSuccessProps, handlerProps>({
    receiveShareSuccess: ({
      setSubmitting,
      setImageSource,
    }: receiveShareSuccessProps) => async (data: any) => {
      const { weblink } = data[0];
      setSubmitting(true);
      setImageSource(null);
      const response = await requestHelper(
        'POST',
        'https://instasaver-api.herokuapp.com/get-instagram-post-data', 
        JSON.stringify({
          instagramUrl: weblink,
        }));
      const responseJSON = await response.json();
      setImageSource(responseJSON.data.url);
      setSubmitting(false);
    },
    receiveShareError: () => (error: any) => Snackbar.show({
      text: 'Error parsing instagram URL',
      duration: Snackbar.LENGTH_SHORT,
    }),
  }),
);

export default enhance(AppComponent);
