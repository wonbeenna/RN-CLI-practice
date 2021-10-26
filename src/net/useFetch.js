// swr = 데이터에 대한 캐싱/재검증
// window.fetch, axios.get

import axios from 'axios';
import useSWR, {mutate} from 'swr';

function getQueryString(params = {}) {
  const qs = [];

  for (const key in params) {
    qs.push(`${key}=${params[key]}`);
  }

  return qs.join('&');
}

export const fetcher = function (url) {
  return axios.get(url).then(res => res.data);
};

export const prefetch = function (url, params = {}) {
  const uri = `${url}?${getQueryString(params)}`;
  return mutate(uri, fetcher(uri));
};

export default function useFetch(url, params = {}) {
  return useSWR(`${url}?${getQueryString(params)}`, fetcher);
}
