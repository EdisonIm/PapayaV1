import instance from '../utils/instance';
import {ILogin} from '../utils/types/loginType';

export const loginApis = {
  login: async (params: ILogin) =>
    await instance.post<ILogin>(`/api/v1/login`, params),
};
