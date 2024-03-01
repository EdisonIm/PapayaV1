import Typography from '../../../../components/Typography';
import styled, {useTheme} from 'styled-components/native';
import SearchIcon from '~assets/icons/Team/search.svg';
import {PAGE_NAME as SearchAddressPage} from './Search';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  from: string;
}
const SearchButton = ({from}: IProps) => {
  const themeApp = useTheme();
  const navigation = useNavigation<any>();
  const onPress = () => {
    navigation.navigate('P_SEARCH_ADDRESS', from);
  };
  return (
    <Wrap>
      <Search onPress={onPress}>
        <SearchIconWrap>
          <SearchIcon />
        </SearchIconWrap>
        <Typography text="Body06R" textColor={themeApp.colors.gray[5]}>
          주소 검색
        </Typography>
      </Search>
    </Wrap>
  );
};

export default SearchButton;

const Wrap = styled.View`
  background-color: white;
`;
const Search = styled.Pressable`
  display: flex;
  flex-direction: row;
  background-color: ${({theme}) => theme.colors.gray[8]};
  margin: 0px 24px;
  border-radius: 8px;
  align-items: center;
  padding: 10px 8px;
`;

const SearchIconWrap = styled.View`
  padding-right: 8px;
`;
