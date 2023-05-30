import {View, Pressable, Image} from 'react-native';

const AddButton = ({setAddUserPopupShown}) => {
  return (
    <>
      <Pressable
        style={{
          alignSelf: 'center',
          marginTop: 15,
        }}
        onPress={() => setAddUserPopupShown(true)}>
        <Image
          style={{
            borderRadius: 50,
            height: 40,
            width: 40,
            marginBottom: 7,
          }}
          source={require('../../assets/plus.png')}
        />
      </Pressable>
    </>
  );
};
export default AddButton;
