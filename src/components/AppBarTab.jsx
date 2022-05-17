import Text from "./Text";
import {StyleSheet} from "react-native";
import { Link } from 'react-router-native';
import useAuthStorage from "../hooks/useAuthStorage";

const styles = StyleSheet.create({
    button: {
        color: "white",
        marginRight: 15
    }
});

export const AppBarTab = ({children, to}) => {
    return <Link to={to}>
        <Text style={styles.button} fontWeight="bold">{children}</Text>
    </Link>
}