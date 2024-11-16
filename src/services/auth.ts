import { HttpService } from '@/utils';
import { endpoint } from './endpoint';

const authService = new HttpService();

export const auth = {
  async signIn(payload: ILocalSignInRequest) {
    return (await authService.post(endpoint.auth, payload)) as ILocalSignInResponse;
  },

  async signUp(payload: ILocalSignInRequest) {
    return (await authService.post(endpoint.auth, payload)) as ILocalSignInResponse;
  },
};
