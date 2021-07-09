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

interface iComic{
  id: number;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

interface iComic {
  id: number
  title: string;
  modified: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
  dates: Array<{
    date: string;
    type: string;
  }>
  prices: Array<{
    price: number;
    type: string;
  }>
}

const LIMIT = 20;

export default function Character(){
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState<iComic[]>([]);
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    GetComics();
  }, [offset]);

  async function GetComics() {
    setLoading(true);
    setTxtError('');
    await api.get('comics', {
      params: {
        nameStartsWith: name === '' ? null : name,
        orderBy: 'title',
        limit: LIMIT,
        offset: offset
      }
    })
    .then(response => {
      setComics([...comics, ...response.data.data.results]);
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
      <Text style={styles.h1}>Comics</Text>
    </View>
  );

  const renderItem = ({item}:{item:iComic}) => (
    <Card 
      key={item.id} 
      id={item.id} 
      name={item.title}
      thumbnailPath={item.thumbnail.path}
      thumbnailExtension={item.thumbnail.extension}
      type='Comic'
      origin='Comic'
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
          data={comics}
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