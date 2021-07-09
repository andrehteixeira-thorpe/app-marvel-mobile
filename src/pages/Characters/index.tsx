import React, { useEffect, useState } from 'react';
import { 
  FlatList,
  Text, 
  View,
  Platform,
} from 'react-native';
import api from '../../services/api';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import Message from '../../components/Message';
import { styles } from './styles';

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
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    GetCharacters();
  }, [offset]);

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
      type='Character'
      origin='Character'
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