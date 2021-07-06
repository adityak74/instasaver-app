import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import appJSON from '../app.json';

export default function App() {
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  React.useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles((data:any)=> {
      console.log(data);
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
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
