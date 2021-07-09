import React from 'react';
import { 
  Text, 
  Image,
  TouchableOpacity, 
  View,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../global/styles/theme';
import { Entypo } from '@expo/vector-icons';

type Character = {
  id: number;
  name: string;
  thumbnailPath: string;
  thumbnailExtension: string;
  type: string;
  origin: string;
}

export default function Card(props:Character) {
  const navigation = useNavigation();
  return(
    <TouchableOpacity 
      style={styles.card}
      onPress={ () => {
        props.origin === props.type ? (
          navigation.navigate(props.type === 'Character' ? 'CharacterDetail' : 'ComicDetail', {
            id: props.id,
            name: props.name 
          })
        ) : (
          navigation.navigate(props.type === 'Character' ? 'Characters' : 'Comics', {
            screen: props.type === 'Character' ? 'CharacterDetail' : 'ComicDetail',
            initial: false,
            params: { 
              id: props.id,
              name: props.name 
            },
          })
        )
      }}
    >
      <Image
        style={styles.cardImage}
        source={{ 
          uri: `${props.thumbnailPath}.${props.thumbnailExtension}` 
        }} 
      />
      <View style={styles.cardContent}>
        <Text style={styles.characterName}>{props.name}</Text>
      </View>
      <Entypo name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: theme.colors.blackLight,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 74,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 8,
  },
  cardContent: {
    borderRadius: 8,
    minHeight: 74,
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  cardImage: {
    width: 110, 
    height: '100%',
    minHeight: 100,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    resizeMode: 'cover'
  },
  characterName: {
    fontFamily: theme.fonts.marvelBold,
    fontSize: 22,
    color: theme.colors.black,
  }
})