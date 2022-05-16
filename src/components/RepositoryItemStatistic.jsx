import {StyleSheet, View} from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: "flex"
    },
    centered: {
        textAlign: 'center'
    }
})

export const RepositoryItemStatistic = ({label, number}) => {

    const displayNumber = number >= 1000 ? parseFloat(number/1000).toFixed(1) + "k" : number

    return <View style={styles.container}>
        <Text style={styles.centered} fontSize="subheading" fontWeight="bold">{displayNumber}</Text>
        <Text style={styles.centered} color={theme.colors.textSecondary}>{label}</Text>
    </View>
}