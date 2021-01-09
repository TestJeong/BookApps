import axios from 'axios';
import {API_KEY_KAKAO} from '@env';

const KaKao_Book_API = async (term) => {
  try {
    const AAP = await axios.get(
      `https://dapi.kakao.com/v3/search/book?target=title&`,
      {
        params: {
          query: term,
          size: 50,
        },

        headers: {
          Authorization: `KakaoAK ${API_KEY_KAKAO}`,
        },
      },
    );
    return AAP.data.documents;
  } catch (e) {
    console.log('API에러', e);
  }
};

export default KaKao_Book_API;
