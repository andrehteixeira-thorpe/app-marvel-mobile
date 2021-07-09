import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View, Image } from 'react-native';
import api from '../../services/api';
import { styles } from './styles';
import Loading from '../../components/Loading';
import Card from '../../components/Card';
import Message from '../../components/Message';

interface Character{
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

interface Comics {
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

interface Params{
  params: {
    name: string;
    id: number
  }
}
export default function Comic({route}:{route:Params}){
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingComics, setLoadingComics] = useState(false);
  const [character, setCharacter] = useState<Character[]>([]);
  const [comics, setComics] = useState<Comics[]>([]);
  const [txtError, setTxtError] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: route.params.name }); 
    GetCharacter();
    GetComics();
  }, [route.params.id]);

  async function GetComics() {
    setLoadingComics(true);
    await api.get(`comics/${route.params.id}`) 
    .then(response => {
      setComics(response.data.data.results);
      setLoadingComics(false);
    })
    .catch(error => {
      console.log(error);
      if(error.request.status === 429){
        setTxtError('You have exceeded your rate limit in marvel API. Please try again later')
      }
      setLoadingComics(false);
    })
  }

  async function GetCharacter(){
    setLoading(true);
    await api.get(`comics/${route.params.id}/characters`)
    .then(response => {
      setCharacter(response.data.data.results);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      if(error.request.status === 429){
        setTxtError('You have exceeded your rate limit in marvel API. Please try again later')
      }
      setLoading(false);
    })
  }
  return(
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      {loading 
        ? <Loading/>
        : txtError 
            ? <Message text={txtError}/>
            : (
                <>
                  {comics.map(comic => {
                    return(
                      <View key={comic.id}>
                        <Image
                          style={styles.image}
                          source={{ 
                            uri: `${comic.thumbnail.path}.${comic.thumbnail.extension}` 
                          }} 
                        />
                        <View style={styles.info}>
                          <Text style={styles.h1}>{comic.title}</Text>
                          {comic.description 
                            ? <Text style={styles.p}>{comic.description}</Text> 
                            : <Text style={styles.p}>No description available.</Text>
                          }
                          {comic.prices[0].price ? (
                            <Text style={styles.pBold}>
                              Print price: $ {comic.prices[0].price}
                            </Text>
                          ) : <></>}
                        </View>
                      </View>
                    );
                  })}
                  {loadingComics 
                    ? <Loading/>
                    : character.length 
                      ? (
                          <>
                            <Text style={styles.subtitle}>{character.length} {character.length > 1 ? 'characters' : 'character'} present in this comic:</Text> 
                            {character.map(characterInfo => {
                              return(
                                <Card 
                                  key={characterInfo.id} 
                                  id={characterInfo.id} 
                                  name={characterInfo.name}
                                  thumbnailPath={characterInfo.thumbnail.path}
                                  thumbnailExtension={characterInfo.thumbnail.extension}
                                  type='Character'
                                  origin='Comic'
                                />
                              );
                            })}
                          </>
                        ) 
                      : <Text style={styles.subtitleNotFound}>Characters not found for this comic</Text>
                    }
                </>
              )
      }
    </ScrollView>
  );
}