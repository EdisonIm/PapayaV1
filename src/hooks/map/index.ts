import {useQuery} from '@tanstack/react-query';
import {mapApi} from '../../apis/map';

// 도로명 주소 변환
export function useGetRoadAddress(longitude: number, latitude: number) {
  const {data: roadAddress, refetch} = useQuery({
    queryKey: ['roadAddress'],
    queryFn: async () => {
      const res = await mapApi.getRoadAddress(longitude, latitude);
      return res;
    },
  });

  return {roadAddress, refetch};
}
