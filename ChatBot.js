import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TextInput } from 'react-native';

const ChatBot = () => {
    const flatListRef = useRef(null);
    const [messages, setMessages] = useState([
      { id: Date.now(), text: "Hi, how can I assist you?", sender: "bot", timestamp: Date.now() },
    ]);
    const [isFlatListReady, setFlatListReady] = useState(false);
  
  const handleFlatListLayout = () => {
    setFlatListReady(true);
  };
    
    const [inputText, setInputText] = useState('');
  
    const handleSend = () => {
      if (inputText.trim() !== '') {
        const newMessage = { id: Date.now(), text: inputText, sender: "user", timestamp: Date.now() }; // Include timestamp
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');
    
        // Simulate bot response after a short delay (replace with your own logic)
        setTimeout(() => {
          const botResponse = { id: Date.now() + 1, text: "I received your message.", sender: "bot", timestamp: Date.now() }; // Include timestamp
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 500);
      }
    };
      //!TODO Integrate with Api
  
    // const handleSend = async () => {
    //   if (inputText.trim() !== '') {
    //     const newMessage = { id: Date.now(), text: inputText, sender: "user", timestamp: Date.now() };
    //     setMessages((prevMessages) => [...prevMessages, newMessage]);
    //     setInputText('');
    
    //     try {
    //       // Make API call to send the user's message
    //       const response = await fetch('API_URL', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ message: inputText }),
    //       });
    
    //       // Handle the response from the API
    //       if (response.ok) {
    //         const responseData = await response.json();
    //         const botResponse = { id: Date.now() + 1, text: responseData.message, sender: "bot", timestamp: Date.now() };
    //         setMessages((prevMessages) => [...prevMessages, botResponse]);
    //       } else {
    //         console.error('API request failed');
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   }
    // };
    
    
  
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
        <View style={messageContainerStyle}>
          {isBot ? (
            <View style={styles.avatarContainer}>
              <Image source={require('./assets/robot.png')} style={styles.avatar} />
            </View>
          ) : null}
          <View style={messageBubbleStyle}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
          </View>
          {!isBot ? (
            <View style={styles.avatarContainer}>
              <Image source={require('./assets/man.png')} style={styles.avatar} />
            </View>
          ) : null}
        </View>
      );
    };
    
  
    return (
      <View style={styles.container}>
        <FlatList
    ref={flatListRef}
    data={messages}
    renderItem={renderMessage}
    keyExtractor={(item) => item.id.toString()}
    onLayout={handleFlatListLayout}
    onContentSizeChange={() => {
      if (isFlatListReady) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }}
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
    },
    messagesContainer: {
      flexGrow: 1,
    },
    botMessageContainer: {
      alignItems: 'flex-start',
      marginBottom: 8,
      flexDirection: 'row',
    },
    userMessageContainer: {
      alignItems: 'flex-end',
      marginBottom: 8,
      flexDirection: 'row',
      marginLeft: 'auto', // Align user's messages to the right
    },
    botMessageBubble: {
      backgroundColor: '#e5e5ea',
      alignSelf: 'flex-start',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      marginLeft: 8,
    },
    userMessageBubble: {
      backgroundColor: '#4fb6ff',
      alignSelf: 'flex-end',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 16,
      marginRight: 8, // Adjust the margin to separate user's messages from the avatar
    },
    messageText: {
      fontSize: 16,
      color: '#000',
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: 40,
      height: 40,
    },
    inputContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    sendButton: {
      marginLeft: 8,
      backgroundColor: '#4fb6ff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      justifyContent: 'center',
    },
    sendButtonText: {
      fontSize: 16,
      color: '#fff',
    },
  });


export default ChatBot;
