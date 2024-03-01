import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import styled from 'styled-components/native';
import SearchIcon from '~assets/icons/Team/search.svg';
import {useState} from 'react';
import Header from '../../../../layouts/Header';
import Location from './Location';
import SearchResult from './SearchResult';
import {mapApi} from '../../../../apis/map';
import {useNavigation} from '@react-navigation/native';
import {createTeamInitAtom, searchTeamInitAtom} from '../../../../utils/store';
import {useAtom} from 'jotai';

interface InputProps {
  focus?: boolean; // 이런 식으로 Props에 대한 타입을 지정합니다.
}
export const PAGE_NAME = 'P_SEARCH_ADDRESS';
const Search = ({route}: any) => {
  const from = route?.params;

  const navigation = useNavigation<any>();
  const [focus, setFocus] = useState<boolean>(true);
  const [text, setText] = useState<string>('');
  const [data, setData] = useState([]);
  const [initCenter, setInitCenter] = useAtom(searchTeamInitAtom);
  const [createInitCenter, setCreateInitCenter] = useAtom(createTeamInitAtom);

  const onSearchPress = async () => {
    const res = await mapApi.searchObject(
      text,
      from === '팀찾기' ? initCenter.latitude : createInitCenter.latitude,
      from === '팀찾기' ? initCenter.longitude : createInitCenter.longitude,
    );
    setData(res);
  };

  return (
    <Wrap>
      <Header label={from === '팀생성' ? '팀 생성' : '팀찾기'} border={false} />
      <View>
        <SearchIconWrap>
          <SearchIcon />
        </SearchIconWrap>

        <Input
          focus={focus}
          value={text}
          onChangeText={text => setText(text)}
          onSubmitEditing={onSearchPress}
          // autoFocus={true}
          placeholder="주소 검색"
          placeholderTextColor="#88888E"
          onFocus={() => setFocus(true)}
        />
      </View>
      <View onTouchEnd={() => navigation.goBack()}>
        <Location
          setInitCenter={
            from === '팀찾기' ? setInitCenter : setCreateInitCenter
          }
        />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setFocus(false);
        }}>
        <Contents>{data && <SearchResult data={data} from={from} />}</Contents>
      </TouchableWithoutFeedback>
    </Wrap>
  );
};

export default Search;

const Wrap = styled.View`
  background-color: white;
  flex: 1;
`;
const SearchIconWrap = styled.View`
  padding-right: 8px;
  position: absolute;
  left: 32px;
  z-index: 1;
  top: 13px;
`;

const Input = styled.TextInput<InputProps>`
  /* height: 22px; */
  font-size: 14px;
  font-family: 'Pretendard-Regular';
  color: ${({theme}) => theme.colors.gray[2]};
  align-items: center;
  background-color: gold;
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.gray[8]};
  margin: 0px 24px 8px 24px;
  border-radius: 8px;
  padding: 10px 0px;
  padding-left: 32px;
  height: 44px;

  border: ${({focus}) => (focus ? '1px solid #007AFF' : '#F5F5F5')};
`;

const Contents = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.gray[8]};
`;
