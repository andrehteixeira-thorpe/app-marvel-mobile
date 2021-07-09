import React, { useEffect, useState } from 'react';
import { 
  Button,
  ScrollView,
  Keyboard,
  Text, 
  TextInput,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

import Loading from '../../components/Loading';
import Message from '../../components/Message';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import Card from '../../components/Card';


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

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [txtError, setTxtError] = useState('');
  const [activeFilter, setActiveFilter] = useState('character');


  function Teste() {
    console.log(searchText, 'in', activeFilter);
    setName(searchText);
    setOffset(0);
    // SearchCharacters();
    // Keyboard.dismiss();
  }

  async function SearchCharacters() {
    setLoading(true);
    setCharacters([]);
    setTxtError('');
    await api.get('characters', {
      params: {
        nameStartsWith: name === '' ? null : name,
        orderBy: 'name',
        limit: LIMIT, // Testar pesquisa sem limit
        offset: offset
      }
    })
    .then(response => {
      setCharacters(response.data.data.results);
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
          onSubmitEditing={Teste}
          placeholder={
            activeFilter === 'character' 
              ? "Search character" 
              : "Search comic"
          }
          value={searchText}
          onChangeText={setSearchText}
        />
        <Button 
          color={theme.colors.primary}
          title='Search' 
          onPress={() => {
           Teste()
          }} 
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

      {txtError 
        ? <Message text={txtError} /> 
        : characters.length 
          ? <Text>Com character</Text>
          : <Message text='Search for character or comic.'/>
      }
      
    </ScrollView>
  );
}