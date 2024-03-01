import instance from '../../utils/instance';

const id = 'ieb9w2oo8h';
const key = 'fsGS0hLBYiw6ZJCPjamikcfT13I0Tq8hNmg4dXSl';
const kakaoKey = 'f21533176fe107f543e4c03040a2f6e3';
export const mapApi = {
  getRoadAddress: async (longitude: number, latitude: number) => {
    const output = 'json';
    const orders = 'roadaddr,addr';
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&output=${output}&orders=${orders}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );

    const data = await res.json();

    const roadAddress =
      data?.results &&
      data?.results?.length > 0 &&
      data.results[0]?.region?.area1?.name +
        ' ' +
        (data.results[0]?.region?.area2?.name &&
          data.results[0]?.region?.area2?.name) +
        ' ' +
        (data?.results[0]?.land
          ? (data.results[0].land?.name === undefined
              ? data.results[0]?.region?.area3?.name
              : '') +
            (data.results[0].land?.name ? data.results[0].land?.name : '') +
            ' ' +
            (data.results[0].land?.number1
              ? data.results[0].land.number1
              : '') +
            (data.results[0].land.number2 !== ''
              ? '-' + data.results[0].land?.number2
              : ' ')
          : '');
    const zipcode = data.results[0]?.land
      ? data.results[0].land.addition1.value
      : '';
    const ress = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${roadAddress}&X-NCP-APIGW-API-KEY-ID=${id}&X-NCP-APIGW-API-KEY=${key}`,
    );
    const result = await ress.json();

    if (result.addresses.length > 0) {
      const addressParts = result.addresses[0].jibunAddress.split(' ');
      const jibunAddress = addressParts.slice(0, 4).join(' ');
      return {
        roadAddress: roadAddress,
        zipcode: zipcode,
        address: jibunAddress,
      };
    }
    return {roadAddress: roadAddress, zipcode: zipcode, address: roadAddress};
  },
  searchObject: async (query: string, lat: number, lng: number) => {
    // const lat = 37.49703;
    // const lng = 127.028191;
    const sort = 'distance';
    console.log(lat, lng);
    const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&x=${lng}&y=${lat}&sort=${sort}`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const result = await res.json();

    if (result.documents.length > 0) {
      return result.documents;
    }
    const addrApiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${query}&x=${lng}&y=${lat}&sort=${sort}`;

    const addrRes = await fetch(addrApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${kakaoKey}`,
      },
    });
    const addrResult = await addrRes.json();

    return addrResult.documents;
  },
};
