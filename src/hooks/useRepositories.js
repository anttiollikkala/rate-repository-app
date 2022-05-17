import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import {useEffect, useState} from "react";
const useRepositories = () => {

    const [repositories, setRepositories] = useState([])

    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        options: {
            fetchPolicy: 'network-and-cache',
        }
    });

    useEffect(() => {
        if (!data) refetch().then(({data}) => setRepositories(data))
    },[data])

    return {data: repositories, loading, refetch };
};

export default useRepositories;