import { useMutation } from 'components/lib/npm';
import { loginUser, signUpUser } from '../axios/client/authentication.service';

export const useLoginUserQuery = (mutational) =>
    useMutation({
        mutationKey: ['login-user'],
        mutationFn: async (data) => await loginUser(data),
        ...mutational
    })

export const useSignUpUserQuery= (mutational) =>
    useMutation({
        mutationKey: ['sing-up-user'],
        mutationFn: async (data) => await signUpUser(data),
        ...mutational
    })