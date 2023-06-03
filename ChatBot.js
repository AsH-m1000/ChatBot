import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TextInput, Animated } from 'react-native';

const ChatBot = () => {
  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([
    { id: Date.now(), text: "Hi, how can I assist you?", sender: "bot", timestamp: Date.now() },
  ]);
  const [isFlatListReady, setFlatListReady] = useState(false);
  const [inputText, setInputText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: Date.now(), text: inputText, sender: "user", timestamp: Date.now() };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');

      // Simulate bot response after a short delay (replace with your own logic)
      setTimeout(() => {
        const botResponse = { id: Date.now() + 1, text: "I received your message.", sender: "bot", timestamp: Date.now() };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === 'bot';
    const messageContainerStyle = isBot ? styles.botMessageContainer : styles.userMessageContainer;
    const messageBubbleStyle = isBot ? styles.botMessageBubble : styles.userMessageBubble;

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedHours = hours < 10 ? '0' + hours : hours;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      return `${formattedHours}:${formattedMinutes}`;
    };

    return (
      <Animated.View style={[messageContainerStyle, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.topContainer}>
          <View style={styles.avatarContainer}>
            <Image source={isBot ? require('./assets/robot.png') : require('./assets/man.png')} style={styles.avatar} />
          </View>
          <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
        </View>
        <View style={messageBubbleStyle}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
     <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id.toString()}
      onLayout={() => setFlatListReady(true)}
      onContentSizeChange={() => {
        if (isFlatListReady) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      }}
      showsVerticalScrollIndicator={false} // Set this prop to false
    />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    overflow: 'hidden',
    marginRight: 8,

    justifyContent: 'center', // Align image vertically
    alignItems: 'center', // Align image horizontally
    resizeMode:"contain"
  },
  avatar: {
    width: 40,
    height: 40,
  },
  botMessageContainer: {
    marginBottom: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    marginBottom: 8,
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: 'auto',
    // backgroundColor:"black"
  },
  botMessageBubble: {
    backgroundColor: '#E2E6ED',
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginLeft: 36,
  },
  userMessageBubble: {
    backgroundColor: '#4FB6FF',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 36,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#4FB6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default ChatBot;
