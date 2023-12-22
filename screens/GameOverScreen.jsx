import { Image, StyleSheet, Text, View } from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

export default function GameOverScreen({ rounds, userNumber, onStartNewGame }) {
  return (
    <View style={style.rootContainer}>
      <Title>VICTORY!</Title>
      <View style={style.imageContainer}>
        <Image source={require('../assets/images/success.png')} style={style.image} />
      </View>
      <Text style={style.summaryText}>
        Your phone needed <Text style={style.highlight}>{rounds}</Text> rounds to guess the number <Text style={style.highlight}>{userNumber}</Text>
      </Text>
      <PrimaryButton onPress={onStartNewGame}>New Game</PrimaryButton>
    </View>
  );

}


const style = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignContent: 'center'
  },
  imageContainer: {
    borderRadius: 150,
    height: 250,
    width: 250,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36
  },
  image: {
    width: '100%',
    height: '100%'
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500
  }
})