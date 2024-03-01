import instance from '../../utils/instance';
import {tApidefault} from '../../utils/types/apiType';

export type tTeamInfoListItem = {
  id: number;
  name: string;
  image: string;
  localAddress: string;
  makers: {
    id: number;
    name: string;
  };
};
interface IHomeApiProps {
  getHomeTeamList: () => Promise<tApidefault<Array<tTeamInfoListItem>>>;
}

export const homeApi: IHomeApiProps = {
  getHomeTeamList: async () => await instance.get('/team'),
};
