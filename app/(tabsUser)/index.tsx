import { StyleSheet, Image, Platform, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8D1FF',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },

  favo: {
    width: '250%',
    height: '90%',
    opacity: 0.4,
    position: 'absolute'
  },

  banner: {
    width: '100%',
    position: 'relative',
    top: 0,
    // maxHeight: 125,
    // aspectRatio: 1
    height: screenWidth / 3,
  }
});


export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.favo} source={require('@/assets/images/favo-de-mel.png')} resizeMode="contain"></Image>
      <Image style={styles.banner} source={require('@/assets/images/bannerPromotion.png')} resizeMode="cover"></Image>
  
      <View>
        
      </View>
      
    </SafeAreaView>
  );
}

