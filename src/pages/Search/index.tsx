import React, { useState } from 'react';
import { 
  Button,
  ScrollView,
  Text, 
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

import Loading from '../../components/Loading';
import Message from '../../components/Message';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import Card from '../../components/Card';


interface iSearch{
  id: number;
  name: string;
  title: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  }
}

const LIMIT = 100;

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<iSearch[]>([]);
  const [offset, setOffset] = useState(0);
  const [txtError, setTxtError] = useState('');
  const [activeFilter, setActiveFilter] = useState('character');
  const [msg, setMsg] = useState('Search for character or comic.');

  async function Search() {
    setLoading(true);
    setSearchResult([]);
    setTxtError('');
    if(!searchText){
      AlertMsg('Atenção', 'Digite um termo para a busca');
      setLoading(false);
      return;
    }
    await api.get(activeFilter === 'character' ? 'characters' : 'comics', {
      params: {
        nameStartsWith: activeFilter === 'character' 
                          ? searchText 
                          : null,
        titleStartsWith:  activeFilter === 'comic' 
                          ? searchText 
                          : null,
        orderBy: activeFilter === 'character' ? 'name' : 'title',
        limit: LIMIT,
        offset: offset
      }
    })
    .then(response => {
      setSearchResult(response.data.data.results);
      setMsg(!response.data.data.results.length ? 'No results for the search term.' : msg );
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

  const AlertMsg = (title:string, msg:string) =>
    Alert.alert(
      title,
      msg,
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

  return(
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{
        flexGrow: 1
      }}
    >
      <View style={styles.searchSection}>
        <Ionicons 
          name="ios-search" 
          size={20} 
          color={searchText 
            ? theme.colors.black 
            : theme.colors.blackLight
          } 
        />
        <TextInput
          clearButtonMode='always'
          style={styles.input}
          returnKeyLabel='search'
          returnKeyType='search'
          onSubmitEditing={Search}
          placeholder={
            activeFilter === 'character' 
              ? "Search character" 
              : "Search comic"
          }
          value={searchText}
          onChangeText={setSearchText}
        />
        {Platform.OS === 'android' 
          && searchText 
              ? <Ionicons name="ios-close-circle" style={styles.clearButton} size={24} onPress={() => setSearchText('')} />
              : <></>
        }
        
        <Button 
          color={theme.colors.primary}
          title='Search' 
          onPress={ Search } 
        />
      </View>
      <View style={styles.filter}>
        <TouchableOpacity 
          style={
            activeFilter === 'character' 
              ? styles.btFilterActive 
              : styles.btFilter
          }
          onPress={() => setActiveFilter('character')}
        >
          <Text 
            style={
              activeFilter === 'character' 
                ? styles.txtBtFilterActive 
                : styles.txtBtFilter
            }
          >
            Character
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={
            activeFilter === 'comic' 
              ? styles.btFilterActive 
              : styles.btFilter
          }
          onPress={() => setActiveFilter('comic')}
        >
          <Text 
            style={
              activeFilter === 'comic' 
                ? styles.txtBtFilterActive 
                : styles.txtBtFilter
            }
          >
            Comic
          </Text>
        </TouchableOpacity>
      </View>
      
      
      {loading 
      ? <Loading/>
      : txtError 
          ? <Message text={txtError} /> 
          : searchResult.length 
            ? searchResult.map(result => {
                return(
                  <Card 
                    key={result.id} 
                    id={result.id}
                    name={activeFilter === 'character' ? result.name : result.title}
                    thumbnailPath={result.thumbnail.path}
                    thumbnailExtension={result.thumbnail.extension}
                    type={activeFilter === 'character' ? 'Character' : 'Comic'}
                    origin='Search'
                  />
                );
              })
            : <Message text={msg} />
      }
      
    </ScrollView>
  );
}