import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {homeApi} from '../../apis/home';
import {tSelectMakers, teamApi} from '../../apis/team';
import {tTeamJoin} from '../../utils/types/teamType';
import {Alert} from 'react-native';

export const useHomeTeamList = () => {
  const {data: teamList} = useQuery({
    queryKey: ['home', 'team'],
    queryFn: async () => {
      const team = await homeApi.getHomeTeamList();
      return team.data.data;
    },
  });

  return {teamList};
};

export const useTeamRoomDetail = (id: number) => {
  const {data: teamDetail} = useQuery({
    queryKey: ['teamDetail', 'team'],
    queryFn: async () => {
      const team = await teamApi.getTeamRoomDetail(id);
      return team.data.data;
    },
  });

  return {teamDetail};
};

export const useTeamMapList = (latitude: number, longitude: number) => {
  const {data: teamMapList} = useQuery({
    queryKey: ['teamSearch', 'team'],
    queryFn: async () => {
      const team = await teamApi.getTeamMapList(latitude, longitude);
      return team.data.data;
    },
  });

  return {teamMapList};
};

export const useTeamUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: tTeamJoin) => {
      const mutation = await teamApi.patchTeam(params);
      return mutation;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['teamSearch']});
    },
    onError: err => {
      Alert.alert('', err.message, [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
  });
};
export const useCreateTeam = () => {
  return useMutation({
    mutationFn: async (params: FormData) => await teamApi.createTeam(params),
    onSuccess(data, variables, context) {
      console.log(data);
    },
    onSettled(data, error, variables, context) {
      console.log(data, error);
    },
    onError(error, variables, context) {
      Alert.alert('', error.message, [
        {
          text: '확인',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
      console.log(error.message);
    },
  });
};
export const useMyTeamList = (userId: number) => {
  const {data: myTeamlist} = useQuery({
    queryKey: ['myTeamlist', 'team'],
    queryFn: async () => {
      const team = await teamApi.getMyTeamList(userId);
      return team.data.data;
    },
  });

  return {myTeamlist};
};

export const useTeamMakersList = (lat: number, lng: number) => {
  const {data: myTeamMakerslist} = useQuery({
    queryKey: ['myTeamMakerslist', 'team'],
    queryFn: async () => {
      const teamMakers = await teamApi.getMakersList(lat, lng);
      return teamMakers.data.data;
    },
  });

  return {myTeamMakerslist};
};

export const useTeamSelectMakers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: tSelectMakers) => {
      const mutation = await teamApi.selectMakers(params);
      return mutation;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teamSearch'],
      });
      queryClient.invalidateQueries({
        queryKey: ['teamDetail', 'team'],
      });
    },
  });
};
