import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatBot from './ChatBot';

const HomeScreen = ({ navigation }) => {
  const handleOpenChatBot = () => {
    navigation.navigate('ChatBot');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome to the ChatBot App!</Text>
      <TouchableOpacity style={styles.chatButton} onPress={handleOpenChatBot}>
        <Image source={require('./assets/chatbot.png')} style={styles.chatButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const ChatBotScreen = () => {
  return <ChatBot />;
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default App;
