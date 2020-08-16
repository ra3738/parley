import React from 'react';
import {
  StyleSheet,
  FlatList,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const ChatScreen = ({navigation}) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
          ]}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={styles.appButtonContainer}>
              <Image style={styles.profilepic} source={require('./lake.jpg')}/>
              <View style={styles.texts}>
                <Text style={styles.nameText}>{item.key}</Text>
                <Text style={styles.lastMessage}>abc</Text>
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    profilepic: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
    },
    texts: {
      flexDirection: 'column',
    },
    appButtonContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#e6e4e1',
      padding: 10,
      flexDirection: 'row',
      // alignItems: 'center',
    },
    nameText: {
      paddingLeft: 20,
      paddingTop: 5,
      paddingBottom: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
    lastMessage: {
      paddingLeft: 20,
      fontSize: 14,
    }
  });

  export default ChatScreen;