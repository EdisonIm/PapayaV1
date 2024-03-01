import {useQuery} from '@tanstack/react-query';
import {foodApi} from '../../apis/food';

export const useGetFoodItemList = (makersId: number) => {
  const {data: foodItemList} = useQuery({
    queryKey: ['food'],
    queryFn: async () => await foodApi.getFoodList(makersId),
  });
  const result = foodItemList?.data.data;
  return {foodItemList: result};
};
