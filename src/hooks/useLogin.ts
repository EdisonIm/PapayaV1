import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ILogin} from '../utils/types/loginType';
import {loginApis} from '../apis/loginApi';

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (data: ILogin) => {
        const response = await loginApis.login(data);
        return response.data;
      },
      onSuccess: (data: ILogin) => {
        // 뮤테이션 성공 시 실행할 작업을 정의할 수 있습니다.
        console.log('로그인 성공:', data);
      },
      onError: (error: Error) => {
        // 뮤테이션 실패 시 실행할 작업을 정의할 수 있습니다.
        console.error('로그인 실패:', error);
      },
    },
    queryClient,
  );
}
