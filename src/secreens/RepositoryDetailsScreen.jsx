import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';

const RepositoryDetailsScreen = ({ route }) => {
  const { repo } = route.params;

  const openRepoInBrowser = () => {
    Linking.openURL(repo.html_url);
  };

  return (
    <ScrollView style={styles.container}>
   
      <View style={styles.header}>
        <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.repoName}>{repo.full_name}</Text>
          {/* <TouchableOpacity style={styles.button} onPress={openRepoInBrowser}>
            <Text style={styles.buttonText}>Visit Repository</Text>
          </TouchableOpacity> */}

          
                <TouchableOpacity onPress={openRepoInBrowser} style={styles.viewRepoBtn}>
                  <Text style={styles.btnText}>Visit Repository</Text>
                </TouchableOpacity>
        </View>
      </View>

   
      <View style={styles.descriptionCard}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{repo.description || 'No description provided.'}</Text>
      </View>

    
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Repository Details</Text>
        <Text style={styles.detail}>⭐ Stars: {repo.stargazers_count}</Text>
        <Text style={styles.detail}>🍴 Forks: {repo.forks_count}</Text>
        <Text style={styles.detail}>💻 Language: {repo.language || 'Not specified'}</Text>
        <Text style={styles.detail}>👤 Owner: {repo.owner.login}</Text>
        <Text style={styles.detail}>🐞 Open Issues: {repo.open_issues_count}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerText: {
    flex: 1,
    justifyContent: 'center',
  },
  repoName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
});

export default RepositoryDetailsScreen;
