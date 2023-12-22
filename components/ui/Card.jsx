import { StyleSheet, View } from 'react-native'
import Colors from '../../constants/colors'

export default function Card({ children }) {
  return <View style={styles.cardContainer}>{children}</View>
}

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    margin: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 6,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 6,
    shadowOpacity: 1,

  },
})  