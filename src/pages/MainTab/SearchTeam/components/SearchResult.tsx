import styled, {useTheme} from 'styled-components/native';
import Typography from '../../../../components/Typography';
import {useNavigation} from '@react-navigation/native';
import {PAGE_NAME as TeamInputPage} from '../../../CreateTeam/components/TeamInput';
import {searchTeamInitAtom} from '../../../../utils/store';
import {useAtom} from 'jotai';
import {mapApi} from '../../../../apis/map';

interface IProps {
  data: any;
  from: string;
}
const SearchResult = ({data, from}: IProps) => {
  const themeApp = useTheme();
  const navigation = useNavigation<any>();
  const [, setInitCenter] = useAtom(searchTeamInitAtom);
  const goToPage = async (
    address: string,
    roadAddress: string,
    x: string,
    y: string,
  ) => {
    const res = await mapApi.getRoadAddress(Number(x), Number(y));
    if (from === '팀생성') {
      navigation.navigate(TeamInputPage, {
        address: address,
        roadAddress: roadAddress,
        zipcode: res.zipcode,
        latitude: Number(y),
        longitude: Number(x),
      });
    } else {
      // 팀 찾기
      setInitCenter({
        latitude: Number(y),
        longitude: Number(x),
      });
      navigation.goBack();
    }
  };

  return (
    <Wrap>
      {data.map((el: any, idx: number) => {
        // console.log(el);
        return (
          <Contents
            key={idx}
            onPress={() =>
              goToPage(el.address_name, el.road_address_name, el.x, el.y)
            }>
            <Typography text="Body06R" textColor={themeApp.colors.gray[2]}>
              {el.place_name ?? el.address_name}
            </Typography>
            <Typography text="CaptionR" textColor={themeApp.colors.gray[6]}>
              {el.road_address
                ? el.road_address.address_name
                : el.road_address_name?.length > 0
                ? el.road_address_name
                : el.address_name}{' '}
              {el.place_name}
            </Typography>
          </Contents>
        );
      })}
    </Wrap>
  );
};

export default SearchResult;

const Wrap = styled.ScrollView`
  background-color: white;
  flex: 1;
  margin-top: 8px;
`;

const Contents = styled.Pressable`
  padding: 16px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.gray[8]};
`;
