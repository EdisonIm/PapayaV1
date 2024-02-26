import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

let socket: Socket | undefined;

const useSocket = (): [Socket | undefined, () => void] => {
  // `state.user`의 존재 여부를 안전하게 확인
  const user = useSelector((state: RootState) => state.user);
  const isLoggedIn = !!user?.email;

  const disconnect = useCallback(() => {
    if (socket) {
      console.log('Disconnecting socket.');
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  // `socket` 인스턴스가 없고, 사용자가 로그인 상태일 때 소켓 연결을 초기화
  if (!socket && isLoggedIn) {
    console.log('Connecting socket.');
    // 환경 변수 값이 제대로 설정되었는지 확인 (예: `Config.API_URL_PAPAYATEST`가 `undefined`가 아닌지)
    const socketUrl = Config.API_URL_PAPAYATEST || 'http://3.36.115.202:8080';
    socket = SocketIOClient(socketUrl, {
      transports: ['websocket'],
    });
  }

  return [socket, disconnect];
};

export default useSocket;
