import {View, Pressable, Image} from 'react-native';

const GiveRewardButton = ({setGiveRewardPopupShown}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          marginLeft: 325,
          marginTop: 600,
        }}>
        <Pressable
          onPress={() => {
            setGiveRewardPopupShown(true);
          }}>
          <Image
            height={10}
            width={10}
            style={{borderRadius: 50}}
            source={require('../../../assets/plus.png')}
          />
        </Pressable>
      </View>
    </>
  );
};
export default GiveRewardButton;
