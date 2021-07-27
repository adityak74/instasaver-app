import {
  Dimensions,
  StyleSheet
} from 'react-native';

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

export default styles;
