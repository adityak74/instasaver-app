import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appbar } from 'react-native-paper';
import {
  ActivityIndicator,
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { save, saveToCameraRoll } from '@react-native-community/cameraroll';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import Snackbar from 'react-native-snackbar';
import appJSON from '../app.json';
import FastImage from 'react-native-fast-image';

export default function App() {
  const [imageSource, setImageSource] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  let instagramImageRef = React.useRef(null);

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
      <SafeAreaView>
        <Appbar.Header>
            <Appbar.Content title="Instasaver" />
        </Appbar.Header>
        {submitting && <ActivityIndicator size="large" />}
        {imageSource && 
          <View>
            <FastImage
              ref={(c: any) => instagramImageRef = c}
              style={{ width: 200, height: 200 }}
              source={{
                  uri: imageSource,
                  priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Button
              title="Save to Camera Roll"
              onPress={_saveImageToCameraRoll}
            />
          </View>
        }
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
