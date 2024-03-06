import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Platform,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import styled, { useTheme } from 'styled-components/native';
import LocationIcon from '~assets/icons/Team/locationMark.svg';
import RefTextInput from '../../../components/RefTextInput';
import Typography from '../../../components/Typography';
import { useCreateTeam } from '../../../hooks/team';
import Header from '../../../layouts/Header';
import {
  formattedDate,
  formattedTime,
  formattedTime2,
} from '../../../utils/dateFormatter';
import { tCreateTeam } from '../../../utils/types/teamType';
import useKeyboardEvent from '../../../hooks/useKeyboardEvent';
import ImageSelect from './ImageSelect';
import { USER_ID } from '../../../config/const';

interface ButtonProps {
  isValidate: boolean;
}

export const PAGE_NAME = 'P_TEAMINPUT';
const TeamInput = ({ route }: any) => {
  const themeApp = useTheme();
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const keyboardStatus = useKeyboardEvent({ inputRef });
  const navigation = useNavigation<any>();
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [showTime, setShowTime] = useState<boolean>(false);
  const [imgURL, setImgURL] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | undefined>(new Date());

  const address = route?.params?.address;
  const roadAddress = route?.params?.roadAddress;
  const zipCode = route?.params?.zipCode;
  const latitude = route?.params?.latitude;
  const longitude = route?.params?.longitude;

  const form = useForm({
    mode: 'all',
  });

  const {
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = form;

  const name = watch('teamName');
  const dateValue = watch('date');
  const timeValue = watch('time');
  const { mutateAsync: createTeam } = useCreateTeam();
  const toggleSwitch = () => setIsEnabled(prev => !prev);

  const isValidation = name && dateValue && timeValue;

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDate(false);
    }

    // setShowDate(false);
    setDate(selectedDate);
    setValue('date', formattedDate(selectedDate));
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowTime(false);
    }
    // setShowDate(false);

    setTime(selectedTime);
    setValue('time', formattedTime(selectedTime));
  };

  const onPressPicker = (from: string) => {
    Keyboard.dismiss();
    if (from === 'date') {
      setShowDate(true);
      setShowTime(false);
    } else {
      setShowTime(true);
      setShowDate(false);
    }
  };

  const uploadImage = async () => {
    const data: tCreateTeam = {
      // TODO :  userId, deliveryType 변경
      userId: USER_ID,
      name: name,
      address: {
        zipCode: zipCode,
        address1: roadAddress,
        address2: undefined, // 상세주소
        address3: address,
        latitude: latitude ? latitude.toString() : '',
        longitude: longitude ? longitude.toString() : '',
      },
      deliveryDate: formattedDate(date, '-'),
      deliveryTime: formattedTime2(time),
      isPublic: isEnabled,
      deliveryType: 1,
    };
    const formData = new FormData();
    if (imgURL) {
      formData.append('file', {
        uri: imgURL,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    }

    // formdata 내용물 확인
    // const parts = formData.getParts();

    // parts.forEach(part => {
    //   console.log(part);
    // });
    formData.append('requestDto', {
      string: JSON.stringify(data),
      type: 'application/json',
    });

    await createTeam(formData);
    queryClient.invalidateQueries({
      queryKey: ['teamSearch', 'home', 'myTeamlist'],
    });
    navigation.navigate('T_HOME');
  };

  useEffect(() => {
    if (!dateValue && showDate) {
      setValue('date', formattedDate(date));
    }
  }, [showDate]);

  useEffect(() => {
    if (!timeValue && showTime) {
      setValue('time', formattedTime(time));
    }
  }, [showTime]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header label="팀 생성" border={false} />
      <Wrap>
        <KeyDismiss
          onPress={() => {
            Keyboard.dismiss();
            setShowDate(false);
            setShowTime(false);
          }}
        >
          <ImageSelect
            setShowDate={setShowDate}
            setShowTime={setShowTime}
            setImgURL={setImgURL}
          />
          <AddressWrap>
            <TypoWrap>
              <IconWrap>
                <LocationIcon />
              </IconWrap>
              <Typography text="Body06SB" textColor={themeApp.colors.gray[2]}>
                {roadAddress}
              </Typography>
            </TypoWrap>
          </AddressWrap>

          <FormProvider {...form}>
            <RefTextInput
              name="teamName"
              placeholder="팀 이름"
              padding="13px 24px"
              suffix={{
                isNeedDelete: true,
              }}
            />
            <Box onPress={() => onPressPicker('date')}>
              <Typography
                text="BottomButtonR"
                textColor={
                  dateValue ? themeApp.colors.gray[2] : themeApp.colors.gray[7]
                }
              >
                {dateValue ? dateValue : '날짜 선택'}
              </Typography>
            </Box>
            <Box onPress={() => onPressPicker('time')}>
              <Typography
                text="BottomButtonR"
                textColor={
                  timeValue ? themeApp.colors.gray[2] : themeApp.colors.gray[7]
                }
              >
                {timeValue ? timeValue : '시간 선택'}
              </Typography>
            </Box>
          </FormProvider>
          <SwitchWrap>
            <Typography
              text="BottomButtonR"
              textColor={themeApp.colors.gray[2]}
            >
              팀 공개여부
            </Typography>
            <Switch
              trackColor={{ false: '#E6E0E9', true: '#007AFF' }}
              //   ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </SwitchWrap>
        </KeyDismiss>
      </Wrap>
      {!keyboardStatus.isKeyboardActivate && (
        <ButtonContainer>
          <CreateButton onPress={() => uploadImage()} isValidate={isValidation}>
            <Typography
              text="BottomButtonSB"
              textColor={themeApp.colors.gray[6]}
            >
              생성하기
            </Typography>
          </CreateButton>
        </ButtonContainer>
      )}
      {showDate && (
        <DatePicker
          value={date as Date}
          display="spinner"
          onChange={onChangeDate}
          locale="ko-KR"
          style={{ backgroundColor: '#F5F5F5' }}
        />
      )}
      {showTime && (
        <DatePicker
          value={time as Date}
          mode="time"
          display="spinner"
          onChange={onChangeTime}
          locale="ko-KR"
          style={{ backgroundColor: '#F5F5F5' }}
        />
      )}
    </SafeAreaView>
  );
};

export default TeamInput;

const Wrap = styled.ScrollView`
  background-color: white;
  flex: 1;
  padding: 0px 24px;
`;

const ImageBox = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.gray[8]};
  border: 1px solid ${({ theme }) => theme.colors.gray[7]};
  height: 192px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const TypoWrap = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconWrap = styled.View`
  margin-right: 4px;
`;

const AddressWrap = styled.View`
  margin-top: 16px;
  margin-bottom: 24px;
`;

const InputWrap = styled.View`
  margin-top: 24px;
`;

const SwitchWrap = styled.View`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const KeyDismiss = styled.Pressable`
  flex: 1;
`;

const Box = styled.Pressable`
  border: 1px solid ${({ theme }) => theme.colors.gray[7]};
  padding: 13px 24px;
  border-radius: 12px;
  margin-top: 24px;
`;

const DatePickerWrap = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const IosButton = styled.Pressable`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 20px;
`;

const CreateButton = styled.Pressable<ButtonProps>`
  width: 100%;
  height: 56px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({ isValidate, theme }) =>
    isValidate ? theme.colors.blue[500] : theme.colors.gray[8]};
`;
const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 35px;
  padding-left: 24px;
  padding-right: 24px;
`;
