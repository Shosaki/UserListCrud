import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  SafeAreaView,
  TextInput,
  FlatList,
  Keyboard,
  Pressable,
  Image,
} from 'react-native';

import AddButton from '../Components/AddButton';
import AddUser from '../Components/AddUser';

const UserList = ({navigation, route}) => {
  useEffect(() => {
    // Needs to be nav stack reset, change later saketh
    setUserEmail(route.params.email);

    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Landing');
      return true;
    });
  }, []);

  // Read data from DB and populate incomplete todo's list
  useEffect(() => {
    const initialCall = async () => {
      let response = await fetch(
        'https://gorest.co.in/public-api/users?page=1&per_page=100',
      );
      // /public/v2/users?page=290&per_page=100

      if (response.ok) {
        let json = await response.json();
        // setUsers(json.data);
        setUserList(json.data);
      } else {
        console.log('HTTP-Error: ' + response.status);
      }
    };

    initialCall();
  }, []);

  const addUser = async () => {};

  const editToDo = async id => {
    setEditItemID(id);
    setAddUserPopupShown(true);
  };

  const Item = ({listItem}) => {
    return (
      <View
        style={[
          styles.todo,
          {
            borderColor: 'gray',
            borderWidth: 2,
          },
        ]}>
        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Id: <Text style={{fontWeight: 'normal'}}>{listItem.id}</Text>
        </Text>

        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Name: <Text style={{fontWeight: 'normal'}}>{listItem.name}</Text>
        </Text>

        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Gender: <Text style={{fontWeight: 'normal'}}>{listItem.gender}</Text>
        </Text>

        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Email: <Text style={{fontWeight: 'normal'}}>{listItem.email}</Text>
        </Text>

        <Text style={{fontSize: 16, fontWeight: '800', color: 'black'}}>
          Status: <Text style={{fontWeight: 'normal'}}>{listItem.status}</Text>
        </Text>

        <Pressable
          onPress={() => editToDo(listItem.id)}
          // 25
          style={{marginTop: 15}}>
          <Image
            style={{
              height: 24, // 22
              width: 24, // 22
            }}
            source={require('../../assets/editing.png')}
          />
        </Pressable>
      </View>
    );
  };

  const [userList, setUserList] = useState([]);
  const [editItemId, setEditItemID] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [addUserPopupShown, setAddUserPopupShown] = useState(false);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    const isEmptyObject = obj => {
      return (
        Object.getPrototypeOf(obj) === Object.prototype &&
        Object.getOwnPropertyNames(obj).length === 0 &&
        Object.getOwnPropertySymbols(obj).length === 0
      );
    };
    let result = isEmptyObject(newUser);
    let newId = 3000000 + userList.length;

    if (!result) {
      if (editItemId > 0) {
        let filteredItem = userList.filter(item => item.id == editItemId);

        let updatedUpdatedUserList = userList.filter(
          item => item.id != editItemId,
        );

        console.log('SAKK - ', filteredItem, newUser);

        let finalUserOb = {
          id: editItemId,
          name: newUser.name !== '' ? newUser.name : filteredItem[0].name,
          gender:
            newUser.gender !== '' ? newUser.gender : filteredItem[0].gender,
          email: newUser.email !== '' ? newUser.email : filteredItem[0].email,
          status: 'active',
        };
        updatedUpdatedUserList.push({...finalUserOb});
        setUserList(updatedUpdatedUserList);
        setEditItemID('');
      } else {
        userList.push({...newUser, id: newId});
      }

      setNewUser({});
    }
  }, [newUser]);

  return (
    <SafeAreaView style={styles.container}>
      {addUserPopupShown ? (
        <>
          <AddUser
            setAddUserPopupShown={setAddUserPopupShown}
            setNewUser={setNewUser}
            editItemId={editItemId}
          />
        </>
      ) : (
        <View style={styles.todoContainer}>
          <View style={{flexShrink: 0.2}}>
            <Text style={{fontSize: 28, color: 'black', alignSelf: 'center'}}>
              User List
            </Text>

            <Text
              style={{
                fontSize: 20,
                marginLeft: 12,
                marginBottom: 15,
                color: 'black',
              }}>
              User: {userEmail}
            </Text>
          </View>

          <View style={{flexShrink: 1}}>
            {userList.length === 0 ? (
              <>
                <Text
                  style={[
                    styles.flatlistHeaders,
                    {fontSize: 28, marginTop: 200},
                  ]}>
                  No Users
                </Text>
              </>
            ) : null}

            {userList.length !== 0 ? (
              <>
                {/* <Text style={styles.flatlistHeaders}>User List</Text> */}
                <FlatList
                  data={userList}
                  renderItem={({item}) => <Item listItem={item} />}
                  keyExtractor={item => item.id}
                />
              </>
            ) : null}

            <AddButton setAddUserPopupShown={setAddUserPopupShown} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default UserList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
  },
  todoContainer: {
    flex: 0.9,
    backgroundColor: 'white',
    marginTop: 70,
    marginHorizontal: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#b38600',
  },
  textInput: {
    height: 55,
    width: 265,
    paddingLeft: 30,
    marginTop: 7,
    marginLeft: 15,
    marginRight: 5,
    borderWidth: 2,
    color: '#b38600',
    borderColor: '#b38600',
    borderRadius: 10,
  },
  todo: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#b38600',
    borderRadius: 10,
  },
  flatlistHeaders: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'black',
  },
});
