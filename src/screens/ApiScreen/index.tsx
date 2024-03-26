import { View, FlatList, ActivityIndicator, TouchableOpacity, Text, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import CharacterListItem from '../../components/organisms/CharacterListItem';
import apiStyles from './styles';

interface Character {
  id: string; 
  description?: string;

}

const initialPage = 'https://66020c309d7276a755529968.mockapi.io/avengers';

const ApiScreen = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState('');

  const fetchPage = async (url: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const response = await fetch(url);
    const responseJson = await response.json();

    setItems(existingItems => {
      return [...existingItems, ...responseJson];
    });

    setNextPage(responseJson.info.next);
    setLoading(false);
  };

  const onRefresh = () => {
    setItems([]);
    setNextPage(initialPage);
    fetchPage(initialPage);
  };

  useEffect(() => {
    fetchPage(initialPage);
  }, []);

  const handlePress = (item: Character) => {

    if (item.description) {
      Alert.alert('Description', item.description);
    }
  };

  const handleLongPress = (item: Character) => {
   
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this photo?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
           
            setItems(prevItems => prevItems.filter(i => i.id !== item.id));
          }
        }
      ]
    );
  };

  return (
    <View style={apiStyles.viewContainer}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            onLongPress={() => handleLongPress(item)}
          >
            <CharacterListItem character={item} />
          </TouchableOpacity>
        )}
        onEndReached={() => {
       
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => loading && <ActivityIndicator />}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default ApiScreen;
