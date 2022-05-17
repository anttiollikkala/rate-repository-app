import {useMutation} from "@apollo/client";
import {AUTHENTICATE} from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import {useMe} from "../contexts/MeContext";

export const useSignIn = () => {
    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage();
    const [,getMe] = useMe()
    const [mutate, result] = useMutation(AUTHENTICATE);
    const signIn = async ({username, password}) => {
        const {data} = await mutate({
                variables: {
                    credentials: {
                        username,
                        password,
                    }
                },

            }
        )
        await authStorage.setAccessToken(data.authenticate.accessToken)
        await apolloClient.resetStore();
        await getMe()
        return {data}
    };

    return [signIn, result];
};