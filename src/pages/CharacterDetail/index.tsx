import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, Text, View, Image } from 'react-native';
import api from '../../services/api';
import { styles } from './styles';
import Loading from '../../components/Loading';
import Card from '../../components/Card';

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
  thumbnail: {
    path: string;
    extension: string;
  }
}

interface Params{
  params: {
    name: string;
    id: number
  }
}

export default function Character({route}:{route:Params}){
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [loadingComics, setLoadingComics] = useState(false);
  const [character, setCharacter] = useState<Character[]>([]);
  const [comics, setComics] = useState<Comics[]>([]);

  useEffect(() => {
    navigation.setOptions({ title: route.params.name }); 
    GetCharacter();
    GetComics();
  }, []);
  
  async function GetCharacter(){
    setLoading(true);
    await api.get(`characters/${route.params.id}`)
    .then(response => {
      console.log(response.data.data.results);
      setCharacter(response.data.data.results);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    })
  }

  async function GetComics() {
    setLoadingComics(true);
    await api.get(`characters/${route.params.id}/comics`) 
    .then(response => {
      setComics(response.data.data.results);
      setLoadingComics(false);
    })
    .catch(error => {
      console.log(error);
      setLoadingComics(false);
    })
  }

  return(
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      {loading ? (
        <Loading/>
      ) : (
        <>
          {character.map(characterInfo => {
            return(
              <>
                <Image
                  key={characterInfo.id}
                  style={styles.image}
                  source={{ 
                    uri: `${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}` 
                  }} 
                />
                <View style={styles.info}>
                  <Text style={styles.h1}>{characterInfo.name}</Text>
                  {characterInfo.description 
                    ? <Text style={styles.p}>{characterInfo.description}</Text> 
                    : <Text style={styles.p}>No description available.</Text>
                  }
                </View>
              </>
            );
          })}
          {comics.length ? (
            <>
              <Text style={styles.subtitle}>Present in {comics.length} comics:</Text> 
              {comics.map(comic => {
                return(
                  <Card 
                    key={comic.id} 
                    id={comic.id} 
                    name={comic.title}
                    thumbnailPath={comic.thumbnail.path}
                    thumbnailExtension={comic.thumbnail.extension}
                  />
                );
              })}
            </>
          ) : (
            <Text>Not found comics for this character</Text>
          )}
            
        </>
      )}
    </ScrollView>
  );
}