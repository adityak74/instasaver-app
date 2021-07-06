import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import InstagramApi from 'simple-instagram-api';
import appJSON from '../app.json';

const INSTAGRAM_BASE_URL = 'https://www.instagram.com/p/';

export default function App() {
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');

  const [imageSource, setImageSource] = React.useState('')
  React.useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles((data:any)=> {
      console.log(data);
      const { weblink } = data[0];
      // Exmaple URL Split for Share URL
      // https://www.instagram.com/p/CQ9MJFEA6xX/?utm_medium=share_sheet
      // ["https:", "", "www.instagram.com", "p", "CQ9MJFEA6xX", "?utm_medium=share_sheet"]
      const shortCode = weblink.split('/')[4];
      InstagramApi.get(shortCode).then((result) => {
        setImageSource(result.url);
      });
    },
    (err:any)=>{
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
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        <View>
            <Text>Open up App.tsx to start working on your app! Yeah man its so good. Yes it might be working. </Text>
            <StatusBar style="auto" />
        </View>
        <ImageBackground source={imageSource}>

        </ImageBackground>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
