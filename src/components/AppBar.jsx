import {View, StyleSheet, Pressable, ScrollView} from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import {AppBarTab} from "./AppBarTab";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: "black",
        opacity: .75,
    },
    button: {
        color: "white"

    }

});

const AppBar = () => {
    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab to="/">Repositories</AppBarTab>
            <AppBarTab to="signin">Sign in</AppBarTab>
        </ScrollView>
    </View>;
};

export default AppBar;