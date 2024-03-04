import instance from '../../utils/instance';
import {tApiPostDefault, tApidefault} from '../../utils/types/apiType';
import {
  tMyTeamList,
  tTeamDetailInfo,
  tTeamJoin,
  tTeamMakersList,
  tTeamMapList,
} from '../../utils/types/teamType';

export type tSelectMakers = {
  userId: number;
  teamId: number;
  makersId: number;
};
interface ITeamApiProps {
  getTeamRoomDetail: (id: number) => Promise<tApidefault<tTeamDetailInfo>>;
  getTeamMapList: (
    latitude: number,
    longitude: number,
  ) => Promise<tApidefault<Array<tTeamMapList>>>;
  patchTeam: (params: tTeamJoin) => Promise<tApidefault<tTeamJoin>>;
  createTeam: (params: FormData) => Promise<tApiPostDefault>;
  getMyTeamList: (userId: number) => Promise<tApidefault<Array<tMyTeamList>>>;
  getMakersList: (
    lat: number,
    lng: number,
  ) => Promise<tApidefault<tTeamMakersList>>;
  selectMakers: (params: tSelectMakers) => Promise<tApiPostDefault>;
}

export const teamApi: ITeamApiProps = {
  getTeamRoomDetail: async id => await instance.get(`/team/${id}`),
  getTeamMapList: async (latitude, longitude) =>
    await instance.get(
      `/team/location?latitude=${latitude}&longitude=${longitude}`,
    ),
  patchTeam: async params => await instance.patch('team', params),
  createTeam: async params =>
    await instance.post('/team', params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getMyTeamList: async userId =>
    await instance.get(`team-member?userId=${userId}`),
  getMakersList: async (lat, lng) =>
    await instance.get(`/makers?latitude=${lat}&longitude=${lng}`),
  selectMakers: async params =>
    await instance.patch('/team/makers', {
      ...params,
    }),
};
