import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../redux/auth';

const fakeUser: User = {
  id: '123',
  accessToken: 'token',
  refreshToken: 'refresh_token',
};

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    authenticate: builder.mutation<User, void>({
      queryFn: () => ({ data: fakeUser }),
    }),
  }),
});

export const { useAuthenticateMutation } = api;
