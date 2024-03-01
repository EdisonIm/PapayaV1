import instance from '../../utils/instance';
import {tApidefault} from '../../utils/types/apiType';
import {tFoodListItem} from '../../utils/types/foodTyps';

interface IFoodApiProps {
  getFoodList: (makersId: number) => Promise<tApidefault<tFoodListItem[]>>;
}

export const foodApi: IFoodApiProps = {
  getFoodList: async makersId =>
    await instance.get(`food?makersId=${makersId}`),
};
