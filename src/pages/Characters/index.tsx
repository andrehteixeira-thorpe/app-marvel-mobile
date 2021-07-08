import React, { useEffect, useState } from 'react';
import { 
  Button,
  FlatList,
  Keyboard,
  Text, 
  TextInput,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import api from '../../services/api'
import { Ionicons } from '@expo/vector-icons';

import Loading from '../../components/Loading';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import Card from '../../components/Card';
import Message from '../../components/Message';

interface iCharacter{
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

const LIMIT = 20;

export default function Character(){
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    GetCharacters();
  }, [offset]);

  console.log('Name ', name);

  async function GetCharacters() {
    setLoading(true);
    setTxtError('');
    await api.get('characters', {
      params: {
        nameStartsWith: name === '' ? null : name,
        orderBy: 'name',
        limit: LIMIT,
        offset: offset
      }
    })
    .then(response => {
      setCharacters([...characters, ...response.data.data.results]);
      setLoading(false);
    })
    .catch(error => {
      console.log(error.request);
      if(error.request.status === 429){
        setTxtError('You have exceeded your rate limit in marvel API. Please try again later')
      }
      setLoading(false);
    })
  }

  const header = () => (
    <View style={styles.title}>
      <Text style={styles.h1}>Characters</Text>
    </View>
  );

  const renderItem = ({item}:{item:iCharacter}) => (
    <Card 
      key={item.id} 
      id={item.id} 
      name={item.name}
      thumbnailPath={item.thumbnail.path}
      thumbnailExtension={item.thumbnail.extension}
    />
  );

  const renderLoader = () => (
    loading
    ? <Loading/>
    : null
  );

  const loadMoreItens = () => (
    setOffset(offset + LIMIT)
  );

  return(
    <View style={styles.container}>
      {txtError ? (
        <Message text={txtError}/>
        ) : (
        <FlatList
          data={characters}
          renderItem={renderItem}
          ListHeaderComponent={header}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItens}
          onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
        />    
      )}
    </View>
  );
}