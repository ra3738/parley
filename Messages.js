import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const Messages = ({navigation}) => {
  const [currentMessage, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const addToMessages = () => {
    messages.push({value: currentMessage, key: messages.length.toString()});
    setMessages(messages);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      <FlatList
        data={messages}
        renderItem={({item}) => 
          <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.messageContainer}>
            <View style={styles.texts}>
              <Text style={styles.textMessage}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={60}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <TextInput 
              placeholder="Enter message ..." 
              style={styles.textInput}
              onChangeText={text => setMessage(text)}
              onSubmitEditing={() => addToMessages()} 
              />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end"
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  textMessage: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  message: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "grey",
  },
  messageContainer: {
    backgroundColor: '#80b0ff',
    padding: 5,
    marginLeft: 10,
    marginTop: 15,
    borderRadius: 15,
    alignSelf: 'flex-start'
  }
});

export default Messages;