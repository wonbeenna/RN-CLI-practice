import axios from 'axios';
import React, {useCallback, useEffect} from 'react';
import BoxOfficeItem from '../components/BoxOfficeItem';
import useFetch, {prefetch} from '../net/useFetch';
import Paragraph from '../components/ui/Paragraph';
import {ActivityIndicator} from 'react-native';

export default function BoxOffice() {
  const url =
    'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  const {data, error} = useFetch(url, {
    key: 'f7a883ef24d9a417674a8aeaccb5e5f2',
    targetDt: '20211024',
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || [];
    (async function () {
      for (const rank of ranks) {
        prefetch(
          'https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json',
          {
            key: 'f7a883ef24d9a417674a8aeaccb5e5f2',
            movieCd: rank.movieCd,
          },
        );
      }
    })();
  }, [data]);

  if (error) {
    return <Paragraph>{JSON.stringify(error)}</Paragraph>;
  }
  if (!data) {
    return <ActivityIndicator />;
  }

  const ranks = data?.boxOfficeResult?.dailyBoxOfficeList || [];

  return (
    <>
      {ranks.map(item => (
        <BoxOfficeItem data={item} key={item.rnum} />
      ))}
    </>
  );
}
