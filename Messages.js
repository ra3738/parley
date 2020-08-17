import React, {Component} from 'react';
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
} from 'react-native';
import io from "socket.io-client"

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }

  componentDidMount() {
    this.socket = io("http://localhost:3000");
    this.socket.on("chat message", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, {value: msg, key: this.state.chatMessages.length.toString()}] });
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={this.state.chatMessages}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => navigation.navigate('Chats')} style={styles.messageContainer}>
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
                value={this.state.chatMessage}
                onSubmitEditing={() => this.submitChatMessage()}
                onChangeText={chatMessage => {
                  this.setState({ chatMessage });
                }}
                />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
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
    marginRight: 10,
    marginTop: 15,
    borderRadius: 13,
    alignSelf: 'flex-end'
  }
});