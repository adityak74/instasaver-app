import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import appJSON from '../../app.json';

const handleReceiveSharingIntent = (success: (data: any ) => void, error: (error: any) => void) => {
  ReceiveSharingIntent.getReceivedFiles(success, error, appJSON.expo.ios.bundleIdentifier);

  return () => {
    ReceiveSharingIntent.clearReceivedFiles();
  }
};

export default handleReceiveSharingIntent;
