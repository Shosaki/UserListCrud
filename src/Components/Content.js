import {useState, useEffect} from 'react';
import {View} from 'react-native';

import ToggleBar from './ContentComponents/ToggleBar';
import Rewards from './ContentComponents/Rewards';
import GiveRewardButton from './ContentComponents/GiveRewardButton';
import GiveReward from './AddUser';
import moment from 'moment';

const Content = ({newReward, setNewReward}) => {
  const [giveRewardPopupShown, setGiveRewardPopupShown] = useState(false);
  const [selectedView, setSelectedView] = useState(1);

  let initialData = [
    {
      id: '1',
      src: 'https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg',
      message: 'Big thanks for your help on the outage today!!',
      rewardTo: 'David Greene',
      rewardFrom: 'John Chen',
      rewardTime: '4 hrs ago',
    },
    {
      id: '2',
      src: 'https://th.bing.com/th/id/OIP.KdBSw8TPL34eU6T7bjhpAAHaLH?pid=ImgDet&rs=1',
      message:
        'Thanks for your help in creating the product overview deck. Your help to show cases in those scenarios really helped in closing the loop on the story.',
      rewardTo: 'Jane Doe',
      rewardFrom: 'James Pritchett',
      rewardTime: 'Jan 12, 2021',
    },
    {
      id: '3',
      src: 'https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?pid=ImgDet&rs=1',
      message:
        'Amazing work delivering the critical issue fix on the weekend, Thanks a lot !!',
      rewardTo: 'Alex Brown',
      rewardFrom: 'Jane Doe',
      rewardTime: 'Feb 1, 2021',
    },
    {
      id: '4',
      src: 'https://c.pxhere.com/photos/08/7a/male_portrait_profile_social_media_cv_young_elegant_suit-459413.jpg!d',
      message:
        'Great presentation on the new feature, looks like a huge value add!',
      rewardTo: 'Jane Doe',
      rewardFrom: 'Chris Andersen',
      rewardTime: 'June 3, 2021',
    },
  ];

  const [DATA, setData] = useState(initialData);

  useEffect(() => {
    let newId = String(DATA.length + 1);

    let currentDate = moment().clone().date();
    let currentMonth = moment().clone().month();
    let currentYear = moment().clone().year();
    currentMonth = moment(currentMonth + 1, 'M').format('MMMM');
    let displayDate = `${currentMonth} ${currentDate}, ${currentYear}`;

    let newRewardMessage = {
      id: newId,
      src: 'https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?pid=ImgDet&rs=1',
      message: newReward.message,
      rewardTo: newReward.rewardTo,
      rewardFrom: 'Jane Doe',
      rewardTime: displayDate,
    };
    if (
      newRewardMessage?.message?.length !== 0 &&
      newRewardMessage?.message?.length !== undefined
    ) {
      setData([...DATA, {...newRewardMessage}]);
    }
  }, [newReward.message]);

  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
      }}>
      {giveRewardPopupShown ? (
        <>
          <GiveReward
            setGiveRewardPopupShown={setGiveRewardPopupShown}
            setNewReward={setNewReward}
          />
        </>
      ) : (
        <>
          <ToggleBar
            selectedView={selectedView}
            setSelectedView={setSelectedView}
          />

          <Rewards DATA={DATA} selectedView={selectedView} />

          <GiveRewardButton setGiveRewardPopupShown={setGiveRewardPopupShown} />
        </>
      )}
    </View>
  );
};
export default Content;
