import React from 'react';
import { View, Text, Image } from 'react-native';
import { Character } from '../types';
import cardStyles from '../../GlobalStyles/cardStyles';

type CharacterListItemProps = {
  character: Character;
};

const CharacterListItem: React.FC<CharacterListItemProps> = ({ character }) => {
  return (
    <View style={cardStyles.container}>
      <Text style={cardStyles.name}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={cardStyles.image} />
    </View>
  );
};

export default CharacterListItem;