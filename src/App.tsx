import React from 'react';
import { Appbar } from 'react-native-paper';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { save } from '@react-native-community/cameraroll';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import CardView from 'react-native-cardview';
import Snackbar from 'react-native-snackbar';
import appJSON from '../app.json';
import FastImage from 'react-native-fast-image';
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://4e12512b3920456280975bae77b94592@o563780.ingest.sentry.io/5704093",
  enableNative: false
});

export default function App() {
  const [imageSource, setImageSource] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);

  const _saveImageToCameraRoll = async () => {
    await save(imageSource);
    Snackbar.show({
      text: 'Saved image to camera roll',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  React.useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(async (data:any) => {
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
    (err:any) => {
      console.log(err);
    },
    appJSON.expo.ios.bundleIdentifier
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    }
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Appbar.Header>
          <Appbar.Content title="Instasaver" />
      </Appbar.Header>
      {submitting &&
        <View style={styles.centerSpinner}>
          <ActivityIndicator size="large" />
        </View>
      }
      {imageSource && 
        <CardView
          cardElevation={6}
          cardMaxElevation={2}
          cornerRadius={5}
          >
            <View style={styles.container}>
              <FastImage
                style={styles.fastImageView}
                source={{
                  priority: FastImage.priority.normal,
                  uri: imageSource,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={styles.buttonView}>
                <Button
                  title="Save to Camera Roll"
                  color="#ffffff"
                  onPress={_saveImageToCameraRoll}
                />
              </View>
            </View>
        </CardView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  centerSpinner: {
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  buttonView: {
    backgroundColor: '#2196F3',
    marginTop: 20,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: '#cccccc'
  },
  fastImageView: {
    height: (Dimensions.get('window').height / 3),
    width: Dimensions.get('window').width,
  },
});
