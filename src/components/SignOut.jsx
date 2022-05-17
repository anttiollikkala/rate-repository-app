import {useNavigate} from "react-router-native";
import {useApolloClient} from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import {useEffect} from "react";
import {useMe} from "../contexts/MeContext";


const SignOut = () => {
    let navigate = useNavigate();
    const apolloClient = useApolloClient()
    const authStorage = useAuthStorage();
    const [,,resetMe] = useMe()
    useEffect(async () => {
        await authStorage.removeAccessToken()
        await apolloClient.resetStore();
        navigate("/")
        resetMe()

    })
    return null

};

export default SignOut;