import { FlatList, View, StyleSheet } from 'react-native';
import {RepositoryItem} from "./RepositoryItem";
import { format } from 'date-fns'
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../graphql/queries";
import {useParams} from "react-router-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    reviewItem: {
        padding: 20,
        backgroundColor: 'white',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    reviewItemLeftCol: {
        borderWidth: 3,
        borderColor: theme.colors.primary,
        flexGrow: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center'
    },
    reviewItemRating: {
        overflow: 'visible',
        textAlign: 'center'
    },
    reviewRightCol: {
        padding: 25,
        paddingTop: 0,
        paddingBottom: 0,
        flexGrow: 1
    }
});

const ReviewItem = ({review}) => {

    return <View style={styles.reviewItem}>
        <View style={styles.reviewItemLeftCol}>
            <Text style={styles.reviewItemRating} fontWeight='bold' color='primary'>{review.rating}</Text>
        </View>
        <View style={styles.reviewRightCol}>
            <Text fontWeight='bold' fontSize='subheading' style={{marginBottom: 3}}>{review.user.username}</Text>
            <Text color='textSecondary' style={{marginBottom: 10}}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text>{review.text}</Text>
        </View>

    </View>
};


const SingleRepository = () => {
    let { id } = useParams();
    const { data, fetchMore ,loading} = useQuery(GET_REPOSITORY, {
        variables: {
            repositoryId: id,
            first: 8
        },
        options: {
            fetchPolicy: 'network-and-cache',
        },
    })
    const repository = data?.repository ? data.repository : {}



    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }
        console.log("fetching more!")
        fetchMore({
            variables: {
                repositoryId: id,
                after: data?.repository.reviews.pageInfo.endCursor,
                first: 8
            },
            options: {
                fetchPolicy: 'network-and-cache',
            },
        });
    };

    const reviews = data?.repository.reviews.edges || []

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item.node} />}
            keyExtractor={(_, i) => i}
            onEndReached={handleFetchMore}
            ListHeaderComponent={() => <RepositoryItem {...repository} showOpenBtn={true} />}
        />
    );

};

export default SingleRepository;
