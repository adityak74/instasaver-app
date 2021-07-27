import React, { FunctionComponent, ReactNode } from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import {
  branch,
  compose,
  withHandlers,
  renderComponent,
} from 'recompose';

import appJSON from '../app.json';
import styles from './styles';
import sentrySetup from './sentry';
import Header from './components/Header';
import Spinner from './components/Spinner';
import Card from './components/Card';
import saveImageToCameraRoll from './helpers/saveImageToCameraRoll';
import Buttom from './components/Button';
import Image from './components/Image';
import receiveSharingIntent from './helpers/receiveSharingIntent';


sentrySetup(true);

interface handlerProps {
  receiveShareSuccess: Function,
  receiveShareError: Function,
};

type receiveShareSuccessProps = {
  setSubmitting: (submitting: boolean) => void,
  setImageSource: (imageSource: string | null) => void,
};

type AppProps = {
  children?: ReactNode,
  receiveShareSuccess: (data: any) => void,
  receiveShareError: (error: any) => void,
};

type PropsWithChildren = AppProps & { children?: ReactNode };

const AppComponent: FunctionComponent<PropsWithChildren> = ({
  receiveShareSuccess,
  receiveShareError,
}) => {
  const [imageSource, setImageSource] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    receiveSharingIntent(receiveShareSuccess, receiveShareError);
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

type EnhanceProps = {
  submitting: boolean,
};

const enhance = compose(
  branch(({ submitting }: EnhanceProps) => submitting, renderComponent(Spinner)),
  withHandlers<receiveShareSuccessProps, handlerProps>({
    receiveShareSuccess: ({
      setSubmitting,
      setImageSource,
    }: receiveShareSuccessProps) => async (data: any) => {
      const { weblink } = data[0];
      setSubmitting(true);
      setImageSource(null);
      const response = await fetch('https://instasaver-api.herokuapp.com/get-instagram-post-data', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          instagramUrl: weblink,
        }),
      });
      const responseJSON = await response.json();
      setImageSource(responseJSON.data.url);
      setSubmitting(false);
    },
    receiveShareError: () => (error: any) => console.log(error),
  }),
);

export default enhance(AppComponent);
