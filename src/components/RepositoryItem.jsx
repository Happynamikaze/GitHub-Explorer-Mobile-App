import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RepositoryItem = ({ repo, onPress, onFavorite }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{repo.full_name}</Text>
      <Text style={styles.description}>{repo.description || 'No description'}</Text>
      <Text>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</Text>
    </View>
    <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
      <Text style={styles.favoriteText}>❤️</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, alignItems: 'center', borderBottomWidth: 1 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: 'bold' },
  description: { color: 'gray' },
  favoriteButton: { padding: 10 },
  favoriteText: { fontSize: 18, color: 'red' },
});

export default RepositoryItem;
