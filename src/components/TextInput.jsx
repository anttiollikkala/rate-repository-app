import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from "../theme";

const styles = StyleSheet.create({
    element: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.background,
        borderRadius: 5,

    }
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = [styles.element, style];

    return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;