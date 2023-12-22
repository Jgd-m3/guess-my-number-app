import { StyleSheet, Text } from "react-native";
import Colors from '../../constants/colors';

function Title({ children }) {
  return <Text style={style.title}>{children}</Text>
}

export default Title;

const style = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    // fontWeight: 'bold',
    color: Colors.primary500,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: Colors.primary800,
    backgroundColor: Colors.accent500,
    padding: 12,
    marginTop: 10,
    borderRadius: 12,

  }
});