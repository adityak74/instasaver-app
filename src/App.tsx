import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as ReactStatusBar } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import { ios } from '../app.json';

export default function App() {
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  // To get All Recived Urls
  ReceiveSharingIntent.getReceivedFiles(files => {
    // files returns as JSON Array example
    //[{ filePath: null, text: null, weblink: null, mimeType: null, contentUri: null, fileName: null, extension: null }]
  }, 
  (error) => {
    console.log(error);
  }, 
  ios.bundleIdentifier // share url protocol (must be unique to your app, suggest using your apple bundle id)
  );
  // To clear Intents
  ReceiveSharingIntent.clearReceivedFiles();
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
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
