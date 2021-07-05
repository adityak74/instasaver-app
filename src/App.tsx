import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as ReactStatusBar } from 'react-native';

export default function App() {
  const _handleSearch = () => console.log('Searching');
  const _handleMore = () => console.log('Shown more');
  return (
      <SafeAreaView>
        <Appbar.Header>
            <Appbar.Content title="Instasaver" />
            <Appbar.Action icon="magnify" onPress={_handleSearch} />
            <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
        </Appbar.Header>
        <View>
            <Text>Open up App.tsx to start working on your app! Yeah man its so good</Text>
            <StatusBar style="auto" />
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
});
