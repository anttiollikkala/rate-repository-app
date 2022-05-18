import {Image, Pressable, StyleSheet, View} from "react-native";
import theme from "../theme";
import Text from "./Text";
import {RepositoryItemStatistic} from "./RepositoryItemStatistic";

const styles = StyleSheet.create({
    container: {
        padding: 18,
        backgroundColor: 'white'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
    statistics: {
        display: 'flex',
        flexDirection: 'row',
    },
    language: {
        borderRadius: 5,
        backgroundColor:
        theme.colors.primary,
        paddingRight: 8,
        paddingLeft: 8,
        paddingTop: 4,
        paddingBottom: 4,
        marginBottom: 5,
        color: "white",
        overflow: "hidden"
    },
    infoContainer: {
        display: "flex",
        flexDirection: 'row',
    },
    info: {
        paddingLeft: 20,
        marginBottom: 10,
        display: "flex",
        alignItems: "flex-start"
    },
    infoItem: {
        marginBottom: 7,
        paddingRight: 40,
        flexWrap: 'wrap',
    },
    openButton : {
        backgroundColor: theme.colors.primary,
        textAlign: 'center',
        color: "white",
        overflow: "hidden",
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold",
        marginTop: 15
    }
});

export const RepositoryItem = ({ showOpenBtn = false, ...item}) => {
    return <View style={styles.container} testID="repositoryItem">
            <View style={styles.infoContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: item.ownerAvatarUrl,
                    }}
                />
                <View style={styles.info}>
                    <Text fontWeight="bold" fontSize="subheading" style={styles.infoItem}>{item.fullName}</Text>
                    <Text color={theme.colors.textSecondary} style={styles.infoItem}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.statistics}>
                <RepositoryItemStatistic label="Forks" number={item.forksCount}/>
                <RepositoryItemStatistic label="Stars" number={item.stargazersCount}/>
                <RepositoryItemStatistic label="Rate" number={item.ratingAverage}/>
                <RepositoryItemStatistic label="Reviews" number={item.reviewCount}/>
            </View>
        { showOpenBtn && <Text style={styles.openButton}>Open in GitHub</Text> }
        </View>
}