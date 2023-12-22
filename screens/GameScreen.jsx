import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import { MIN, MAX } from "../constants/settings";
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';
import Colors from '../constants/colors';


function generateRandomBetween(min, max, exclude) {
  const rndNumber = Math.floor(Math.random() * (max - min) + min);

  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNumber;
}

let minBoundary = MIN;
let maxBoundary = MAX + 1;


export default function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(MIN, MAX + 1, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
      return;
    }
  }, [currentGuess, userNumber, guessRounds, onGameOver]);

  useEffect(() => {
    minBoundary = MIN;
    maxBoundary = MAX + 1;
  }, []);

  function nextGuessHandler(direction) { //direction =>  'lower' | 'greater'
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert('Lier!', "You know that's wrong...", [{ text: 'Sorry!', style: 'cancel' }]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRnd = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRnd);
    setGuessRounds([newRnd, ...guessRounds]);


  }

  const roundsLength = guessRounds.length;

  return <View style={style.screen}>
    <Title>Opponent's Guess</Title>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionText style={style.instructionText}> Higher or Lower?</InstructionText>
      <View style={style.buttonsContainer}>
        <View style={style.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color={Colors.primary800} />
          </PrimaryButton>
        </View>
        <View style={style.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color={Colors.primary800} />
          </PrimaryButton>
        </View>
      </View>
    </Card>
    <View style={style.listContainer}>
      {/* {guessRounds.map(r => <Text key={r}>{r}</Text>)} */}
      <FlatList data={guessRounds} renderItem={(itemData) => (
        <GuessLogItem
          roundNumber={roundsLength - itemData.index}
          guess={itemData.item}
        />
      )} keyExtractor={(itemData) => itemData} />
    </View>

  </View>
}

const style = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12
  },
  //todo: move all these buttons in a shared component together with StartGameScreen
  buttonsContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    padding: 3
  }
});