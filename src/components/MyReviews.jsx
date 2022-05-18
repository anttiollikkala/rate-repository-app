import {useMe} from "../contexts/MeContext";
import {Alert, FlatList, Pressable, StyleSheet, View} from "react-native";
import Text from "./Text";
import {format} from "date-fns";
import theme from "../theme";
import {Touchable} from "react-native-web";
import {useNavigate} from "react-router-native";
import {useMutation} from "@apollo/client";
import {DELETE_REVIEW} from "../graphql/mutations";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    reviewItem: {
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    reviewInfo: {
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
    },
    buttonsContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    button: {
        padding: 15,
        borderRadius: 5,
        textAlign: 'center',
        flexGrow: 1,
        backgroundColor: 'grey'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    buttonSpacer: {
        flexGrow: 0,
        width: 10
    }
});

const ReviewItem = ({review, getMe}) => {
    const navigate = useNavigate()

    const [deleteReview] = useMutation(DELETE_REVIEW)

    const handleViewRepository = (id) => {
        navigate("/repositories/" + id)
    }

    const handleDeleteReview = (id) => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [{
                text: "Cancel",
                style: "cancel"
            }, {
                text: "OK",
                onPress: async () => {
                    await deleteReview({
                        variables: {
                            deleteReviewId: id
                        }
                    })
                    await getMe()
                }
            }
        ])
    }

    return <View style={styles.reviewItem}>
        <View style={styles.reviewInfo}>
            <View style={styles.reviewItemLeftCol}>
                <Text style={styles.reviewItemRating} fontWeight='bold' color='primary'>{review.rating}</Text>
            </View>
            <View style={styles.reviewRightCol}>
                <Text fontWeight='bold' fontSize='subheading' style={{marginBottom: 3}}>{review.repository.fullName}</Text>
                <Text color='textSecondary'
                      style={{marginBottom: 10}}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
        <View style={styles.buttonsContainer}>
            <Pressable style={[styles.button, {backgroundColor: theme.colors.primary}]} onPress={() => handleViewRepository(review.repository.id)}>
                <Text style={styles.buttonText} fontWeight='bold'>View repository</Text>
            </Pressable>
            <View style={styles.buttonSpacer}/>
            <Pressable style={[styles.button, {backgroundColor: 'red'}]} onPress={() => handleDeleteReview(review.id)}>
                <Text style={styles.buttonText} fontWeight='bold'>Delete review</Text>
            </Pressable>
        </View>
    </View>
};

const MyReviews = () => {
    const [{me}, getMe] = useMe()
    return <FlatList
        data={me.reviews.edges}
        renderItem={({item}) => <ReviewItem review={item.node} getMe={getMe}/>}
        keyExtractor={(_, i) => i}
    />
}

export default MyReviews