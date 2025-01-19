import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useFavorites } from '../components/FavoritesContext'; 

const FavoritesScreen = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites(); 

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.Text_center}>No favorite repositories yet</Text>
      ) : (
        <ScrollView style={styles.repoList}>
          {favorites.map((repo) => (
            <View key={repo.id} style={styles.repoItem}>
            
              <View key={repo.id} style={styles.repoItemLine}>
                <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
                <View style={styles.repoItemLineDown}>
                  <Text style={styles.repoName}>{repo.full_name}</Text>
                  <Text style={styles.repoDescription}>
                    {repo.description || 'No description available'}
                  </Text>
                </View>
              </View>

         
              <View style={styles.repoItemDetailsDIVV}>
                <Text style={styles.repoDetails}>
                  Owner: <Text style={styles.ownerName}>{repo.owner.login}</Text>
                </Text>
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
                  style={styles.removeBtn}
                  onPress={() => removeFavorite(repo.id)} 
                >
                  <Text style={styles.btnText}>Remove from Favorites</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    backgroundColor: '#f4f4f4',
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
  repoItemLine: {
    flexDirection: 'row',
    gap: 10,
  },
  repoItemLineDown: {
    justifyContent: 'center',
    width: '80%',
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  repoDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  Text_center: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '252525',
    marginVertical: 6,
  },

  repoItemDetailsDIVV: {
    flexDirection: 'row',
    justifyContent: 'start',
  },
  repoDetails: {
    fontSize: 12,
    color: '#333',
  },
  ownerName: {
    fontWeight: 'bold',
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
  removeBtn: {
    backgroundColor: 'red',
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
});

export default FavoritesScreen;
