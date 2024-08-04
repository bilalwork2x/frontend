
import { useQuery } from '@tanstack/react-query';
import api from '@utils/api';

const KEY_FETCH_PROFILE = 'fetch-profile';



export type ApiResponse = {
  _id: string;
  email: string;
  name: string;
}

export default function useFetchProfile() {
  return useQuery({
    queryKey: [KEY_FETCH_PROFILE],
    queryFn: async (): Promise<ApiResponse> => {
      const results = await api({
        method: 'GET',
        url: `/profile`,
      });
      return results.data;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
