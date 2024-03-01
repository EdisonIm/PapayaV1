export const getCharsPerLine = (fontSize: number, containerWidth: number) => {
  // 글자 크기와 컨테이너 너비를 이용하여 한 줄에 들어가는 글자 수 계산
  const averageCharWidth = fontSize * 0.5; // 평균 글자 폭을 대략적으로 설정
  const charsPerLine = Math.floor(containerWidth / averageCharWidth);
  return charsPerLine;
};
