import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import {useEffect} from "react";

const useRepositories = (orderBy, keyword, first) => {
    const { data, error, loading, fetchMore, refetch, ...rest } = useQuery(GET_REPOSITORIES, {
        options: {
            fetchPolicy: 'network-and-cache',
        },
        variables: {
            orderBy: orderBy === "creation" ? "CREATED_AT" : "RATING_AVERAGE",
            orderDirection: orderBy === "ratingDesc" ? "DESC" : "ASC",
            searchKeyword: keyword,
            first: first
        }
    });

    useEffect(async() => {
        await refetch( {
                orderBy: orderBy === "creation" ? "CREATED_AT" : "RATING_AVERAGE",
                orderDirection: orderBy === "ratingDesc" ? "DESC" : "ASC",
                searchKeyword: keyword,
                first: first
        })
    }, [orderBy, keyword, first])

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }


        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                orderBy: orderBy === "creation" ? "CREATED_AT" : "RATING_AVERAGE",
                orderDirection: orderBy === "ratingDesc" ? "DESC" : "ASC",
                searchKeyword: keyword,
                first: first
            },
        });
    };

    const repositories = data ? data.repositories : null
    return { repositories, loading, fetchMore: handleFetchMore, ...rest};
};

export default useRepositories;