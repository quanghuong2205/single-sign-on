import { HttpService } from '@/utils';
import { endpoint } from './endpoint';

const authService = new HttpService();

export const auth = {
  async signIn(payload: SignInByEmailRequest) {
    return (await authService.post(endpoint.auth, payload)) as SignInByEmailResponse;
  },
};
