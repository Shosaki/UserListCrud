import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
const AddUser = ({setAddUserPopupShown, setNewUser, editItemId}) => {
  const onChangeText = (fieldName, value) => {
    switch (fieldName) {
      case 'Name':
        setLocalFormData({
          ...localFormData,
          localName: {...localFormData.localName, value: value},
        });
        break;
      case 'Email':
        setLocalFormData({
          ...localFormData,
          localEmail: {...localFormData.localEmail, value: value},
        });
        break;
      case 'Gender':
        setLocalFormData({
          ...localFormData,
          localGender: {...localFormData.localGender, value: value},
        });
        break;
    }
  };

  const initialFormData = {
    localName: {value: '', error: ''},
    localEmail: {value: '', error: ''},
    localGender: {value: '', error: ''},
  };
  const [localFormData, setLocalFormData] = useState(initialFormData);

  return (
    // ID, Name, Gender, Email, Status
    <KeyboardAvoidingView
      // keyboardVerticalOffset={-100}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={styles.container}>
      <View>
        <Text
          style={[
            styles.mainTitle,
            {
              marginBottom: 10,
            },
          ]}>
          Add User
        </Text>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => onChangeText('Name', text)}
          value={localFormData.localName.value}
          inputStyle={{color: 'white'}}
          style={[
            styles.textInput,
            {
              marginBottom: localFormData.localName.error !== '' ? 14 : 7,
              paddingLeft: 12,
            },
          ]}
        />
        <Text style={styles.errorText}>{localFormData.localName.error}</Text>

        <Text style={styles.inputTitle}>Gender</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => onChangeText('Gender', text)}
          value={localFormData.localGender.value}
          inputStyle={{color: 'white'}}
          style={[
            styles.textInput,
            {
              marginBottom: localFormData.localGender.error !== '' ? 14 : 7,
              paddingLeft: 12,
            },
          ]}
        />
        <Text style={styles.errorText}>{localFormData.localGender.error}</Text>

        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          editable
          maxLength={40}
          onChangeText={text => onChangeText('Email', text)}
          value={localFormData.localEmail.value}
          inputStyle={{color: 'white'}}
          style={[
            styles.textInput,
            {
              marginBottom: localFormData.localEmail.error !== '' ? 14 : 7,
              paddingLeft: 12,
            },
          ]}
        />
        <Text style={styles.errorText}>{localFormData.localEmail.error}</Text>
      </View>

      <Pressable
        onPress={() => {
          let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
          let patternTest = true;

          if (!pattern.test(localFormData.localEmail.value)) {
            console.log('Entering here');
            patternTest = false;
          }
          let genderTest = ['male', 'female', 'other'].includes(
            localFormData.localGender.value.toLowerCase(),
          );

          console.log(genderTest);

          if (editItemId) {
            // No Error
            if (patternTest || genderTest) {
              let updatedUser = {
                gender: localFormData.localGender.value.toLowerCase(),
                name: localFormData.localName.value,
                email: localFormData.localEmail.value,
                status: 'active',
              };

              setNewUser(updatedUser);
              setAddUserPopupShown(false);
            } else {
              if (!patternTest || localFormData.localEmail.value.length == 0)
                Error2 = 'Please enter valid Email';
              else Error2 = '';

              if (!genderTest || localFormData.localGender.value.length == 0)
                Error3 = 'Please enter valid Gender';
              else Error3 = '';

              setLocalFormData({
                ...localFormData,
                localEmail: {...localFormData.localEmail, error: Error2},
                localGender: {...localFormData.localGender, error: Error3},
              });
            }
          } else if (
            localFormData.localName.value.length != 0 &&
            localFormData.localEmail.value.length != 0 &&
            patternTest &&
            localFormData.localGender.value.length != 0 &&
            genderTest
          ) {
            let newUser = {
              gender:
                localFormData.localGender.value.length != 0
                  ? localFormData.localGender.value.toLowerCase()
                  : '',
              name:
                localFormData.localName.value.length != 0
                  ? localFormData.localName.value
                  : '',
              email:
                localFormData.localEmail.value.length != 0
                  ? localFormData.localEmail.value
                  : '',
              status: 'active',
            };

            setNewUser(newUser);
            setAddUserPopupShown(false);
          } else {
            let Error1 = '';
            let Error2 = '';
            let Error3 = '';

            if (localFormData.localName.value.length == 0)
              Error1 = 'Please enter valid Name';
            else Error1 = '';

            if (!patternTest || localFormData.localEmail.value.length == 0)
              Error2 = 'Please enter valid Email';
            else Error2 = '';

            if (!genderTest || localFormData.localGender.value.length == 0)
              Error3 = 'Please enter valid Gender';
            else Error3 = '';

            setLocalFormData({
              ...localFormData,
              localName: {...localFormData.localName, error: Error1},
              localEmail: {...localFormData.localEmail, error: Error2},
              localGender: {...localFormData.localGender, error: Error3},
            });
          }
        }}
        style={{
          height: 50,
          width: 300,
          marginTop: 10,
          borderRadius: 30,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Add User
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setAddUserPopupShown(false)}
        style={{
          height: 50,
          width: 300,
          marginTop: 20,
          borderRadius: 30,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{color: 'red', fontSize: 18, fontWeight: '500'}}>
          Cancel
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};
export default AddUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainTitle: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 23,
    color: 'white',
  },
  inputTitle: {
    fontSize: 16,
    marginLeft: 15,
    color: '#b38600',
  },
  textInput: {
    height: 55,
    padding: 0,
    marginTop: 7,
    marginBottom: 20,
    marginHorizontal: 15,
    borderWidth: 1,
    color: '#b38600',
    borderColor: '#b38600',
  },
  errorText: {
    fontSize: 12,
    marginLeft: 15,
    color: 'red',
  },
});
