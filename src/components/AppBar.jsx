import {View, StyleSheet,  ScrollView} from 'react-native';
import Constants from 'expo-constants';
import {AppBarTab} from "./AppBarTab";
import {useMe} from "../contexts/MeContext";

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
    const [me] = useMe()
    return <View style={styles.container}>
        <ScrollView horizontal>
            <AppBarTab to="/">Repositories</AppBarTab>
            { !me
                ? <AppBarTab to="/signin">Sign in</AppBarTab>
                : <AppBarTab to="/signout">Sign out</AppBarTab>}
        </ScrollView>
    </View>;
};

export default AppBar;