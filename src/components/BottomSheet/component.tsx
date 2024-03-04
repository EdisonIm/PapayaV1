import React, {SetStateAction, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import styled, {useTheme} from 'styled-components/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Typography from '../Typography';
import FastImage from 'react-native-fast-image';
import LocationIcon from '~assets/icons/Team/locationMark.svg';
import TimeIcon from '~assets/icons/Team/timeCircle.svg';
import {IconWrap, TypoWrap} from '../../pages/CreateTeam/components/TeamInput';
import {tMyTeamList, tTeamMapList} from '../../utils/types/teamType';
import {useTeamUpdate} from '../../hooks/team';
import {useNavigation} from '@react-navigation/native';
import {USER_ID} from '../../config/const';

interface IProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
  data: tTeamMapList[];
  isMember: boolean;
}

const Component = ({modalVisible, setModalVisible, data, isMember}: IProps) => {
  // ref
  const themeApp = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<any>();
  const {mutateAsync: entryRoom} = useTeamUpdate();
  // variables
  const size = Platform.OS === 'ios' ? '35%' : '42%';
  const snapPoints = useMemo(() => [size, size], []);

  // callbacks

  const onPressEntryButton = async () => {
    await entryRoom({
      teamId: data[0].id,
      userId: USER_ID,
    });
    navigation.navigate('P_TEAM_INFO', {
      params: data[0].id,
    });

    setModalVisible(false);
  };

  // renders
  return (
    <Modal animationType={'fade'} transparent visible={modalVisible}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Container onPress={() => setModalVisible(false)}>
          <BottomSheet
            style={styles.container}
            //handleIndicatorStyle={{backgroundColor: '#7F7F7F'}}
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}

            // onChange={handleSheetChanges}
            // style={{
            //   borderTopColor: '#00000026',
            //   borderLeftColor: '#00000026',
            //   borderRightColor: '#00000026',
            //   borderTopWidth: 1,
            //   borderTopLeftRadius: 14,
            //   borderTopRightRadius: 14,
            //   borderLeftWidth: 1,
            //   borderRightWidth: 1,
            // }}
          >
            <ContentContainer>
              <FastImage
                source={{uri: data[0].image}}
                style={{
                  width: 70,
                  height: 70,
                  marginRight: 16,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
              <View>
                <Title>
                  <Typography
                    text="Title04SB"
                    textColor={themeApp.colors.gray[2]}
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {data[0].name}
                  </Typography>
                </Title>
                <CountWrap>
                  <CaptionWrap>
                    <Typography
                      text="CaptionR"
                      textColor={themeApp.colors.gray[4]}>
                      팀 생성자
                    </Typography>
                  </CaptionWrap>
                  <Typography
                    text="CaptionSB"
                    textColor={themeApp.colors.gray[4]}>
                    {data[0].leaderName}
                  </Typography>
                  <CaptionWrap style={{marginLeft: 16}}>
                    <Typography
                      text="CaptionR"
                      textColor={themeApp.colors.gray[4]}>
                      참여인원
                    </Typography>
                  </CaptionWrap>
                  <Typography
                    text="CaptionSB"
                    textColor={themeApp.colors.gray[4]}>
                    {data[0].userCount}/{data[0].maxMember}명
                  </Typography>
                </CountWrap>
                <TypoWrap>
                  <IconWrap>
                    <LocationIcon />
                  </IconWrap>
                  <Typography
                    text="Body06SB"
                    textColor={themeApp.colors.gray[2]}>
                    {data[0].roadNameAddress}
                  </Typography>
                </TypoWrap>
                <TypoWrap>
                  <IconWrap>
                    <TimeIcon />
                  </IconWrap>
                  <Typography
                    text="Body06SB"
                    textColor={themeApp.colors.gray[2]}>
                    {data[0].dateAndTime}
                  </Typography>
                </TypoWrap>
              </View>

              <ButtonContainer>
                <CreateButton disabled={isMember} onPress={onPressEntryButton}>
                  <Typography
                    text="BottomButtonSB"
                    textColor={themeApp.colors.gray[6]}>
                    {isMember ? '입장완료' : '입장하기'}
                  </Typography>
                </CreateButton>
              </ButtonContainer>
            </ContentContainer>
          </BottomSheet>
        </Container>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});

export default Component;

const Container = styled.Pressable`
  flex: 1;
`;

const ContentContainer = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin: 26px 24px 0px 24px;
`;
const CreateButton = styled.Pressable`
  width: 100%;
  height: 56px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.gray[8]};
`;
const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 40px;
  /* padding-left: 24px;
  padding-right: 24px; */
`;

const Title = styled.View`
  margin-bottom: 4px;
`;

const CountWrap = styled.View`
  display: flex;
  flex-direction: row;
`;

const CaptionWrap = styled.View`
  padding-right: 4px;
  margin-bottom: 26px;
`;
