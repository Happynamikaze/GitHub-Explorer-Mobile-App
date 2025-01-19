

import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, ActivityIndicator, ScrollView, Linking, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../components/FavoritesContext'; 

const SearchRepositories = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { favorites, addFavorite, removeFavorite } = useFavorites(); 
  const [imageLoading, setImageLoading] = useState({});
  const [textChange, setTextChange] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const fetchWithTimeout = (url, options, timeout = 10000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      ),
    ]);
  };

  const fetchRepositories = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    try {
      const token = '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'; 
      const res = await fetchWithTimeout(
        `https://api.github.com/search/repositories?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorDetails = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorDetails}`);
      }

      const data = await res.json();
      setRepositories(data.items || []);
      if (data.items.length > 0) {
        setTextChange('Here are your results! 🎉');
      } else {
        setTextChange(`No results found 😿 ${"\n"} Try something else! 🔍`);
      }

    } catch (err) {
      setError(err.message || 'An error occurred.');
      setTextChange(`Unexpected Error. ${"\n"}  Please try again later. 😔`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setQuery(query);
    if (query.trim() === '') {
      setShowLoading(true);
      setTextChange('Let the exploration begin! 🌟');
    } else if(query.trim() !== '') {
      setTextChange('Finding your result...');
    } else {
      setShowLoading(false);
    }
    if (query) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        fetchRepositories();
      }, 500);
    }
  }, [query]);

  const handleImageLoad = (repoId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [repoId]: false,
    }));
  };

  const goToFavorites = () => {
    navigation.navigate('FavoritesScreen'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Repositories..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={fetchRepositories}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {showLoading && (
        <View style={styles.loadcontainer}>
          <Image source={require('../assets/images/loading.png')} style={styles.loadlogo} />
          <Text style={styles.loadtitle}>{textChange}</Text>
        </View>
      )}

      <ScrollView style={styles.repoList}>
        {repositories.map((repo) => (
          <View key={repo.id} style={styles.repoItem}>
        
            <View key={repo.id} style={styles.repoItemLine}>
              {imageLoading[repo.id] && (
                <ActivityIndicator size="small" color="#0000ff" style={styles.loader} />
              )}
              <Image
                source={{ uri: repo.owner.avatar_url, cache: 'reload' }}
                style={styles.avatar}
                onLoad={() => handleImageLoad(repo.id)}
              />
              <View key={repo.id} style={styles.repoItemLineDown}>
                <Text style={styles.repoName}>{repo.full_name}</Text>
                <View style={styles.repoDescriptionBox}>
                  <Text style={styles.repoDescription}>
                    {repo.description || 'No description available'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.repoItemDetailsDIVV}>
              <View style={styles.repoItemDetails}>
                <Text style={styles.repoDetails}>
                  Owner: <Text style={styles.ownerName}>{repo.owner.login}</Text>
                </Text>
                <Text style={styles.repoDetails}>Stars: {repo.stargazers_count}</Text>
                <Text style={styles.repoDetails}>Forks: {repo.forks_count}</Text>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.viewRepoBtn}
                onPress={() => {
                  navigation.navigate('RepositoryDetailsScreen', { repo });
                }}
              >
                <Text style={styles.btnText}>View Repository</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnsStyle, favorites.some((fav) => fav.id === repo.id) ? styles.favoriteBtn : styles.defaultBtn]}
                onPress={() => {
                  if (favorites.some((fav) => fav.id === repo.id)) {
                    removeFavorite(repo.id); 
                  } else {
                    addFavorite(repo); 
                  }
                }}
              >
                <Text style={styles.btnText}>
                  {favorites.some((fav) => fav.id === repo.id) ? 'Unfavorite' : 'Favorite'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {favorites.length > 0 && (
        <TouchableOpacity onPress={goToFavorites} style={styles.goToFavoritesBtn}>
          <Text style={styles.btnText}>Go to Favorites</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({

  loadcontainer: {
    // flex: ,
    flexDirection: 'row',

    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '##FFF',
    padding: 16,

  },
  loadlogo: {
    width: 100,
    height: 100,
    marginBottom: -20,
    marginTop: -30,

  },
  loadtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#252525',
    marginBottom: 10,
    textAlign: 'center',
  },
  subloadtitle: {
    fontSize: 16,
    color: '#252525',
    marginBottom: 20,
    textAlign: 'center',
    //   paddingHorizontal: 40,
  },

  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#f4f4f4',
  },
  repoItemLine: {
    flexDirection: 'row',
    gap: '10',
  },
  repoItemDetailsDIVV: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
  repoItemDetails: {
    flexDirection: 'row',
    gap: '10',
    marginBottom: 5,
  },
  repoItemLineDown: {
    justifyContent: 'center',
    width: '80%',

  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 8,
  },
  repoList: {
    flex: 1,
  },
  repoItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: -5,
  },
  repoDescriptionBox: {
    // width: '90%',
  },
  repoDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  repoDetails: {
    fontSize: 12,
    color: '#333',
  },
  ownerName: {
    fontWeight: 'bold',
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  goToFavoritesBtn: {
    backgroundColor: '#5319ac',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  favoritesContainer: {
    marginTop: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewRepoBtn: {
    backgroundColor: '#5319ac',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnsStyle: {
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  favoriteBtn: {
    backgroundColor: 'red',
  },
  defaultBtn: {
    backgroundColor: 'black',
  },



});

export default SearchRepositories;
