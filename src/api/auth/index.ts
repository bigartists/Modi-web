import request from 'src/utils/axios';

export const login = async (email: string, password: string) =>
  request('/login', {
    method: 'POST',
    data: {
      username: email,
      password,
    },
  });
