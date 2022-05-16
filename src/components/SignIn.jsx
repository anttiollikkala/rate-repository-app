import FormikTextInput from "./FormikTextInput";
import {Pressable, StyleSheet, View} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import Text from "./Text";
import theme from "../theme";

const initialValues = {
    username: "",
    password: ""
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 10,
    },
    button: {
        backgroundColor: theme.colors.primary,
        color: "white",
        textAlign: 'center',
        padding: 20,
    }
})

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});


const SignIn = () => {

    const handleSubmit = values => {
        console.log(values)
    }
    return <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) =>
            <View style={styles.container}>
                <FormikTextInput name="username" placeholder="username" />
                <FormikTextInput name="password" placeholder="password" secureTextEntry/>
                <Pressable onPress={handleSubmit}>
                    <Text style={styles.button} fontSize="subheading" fontWeight="bold">Sign in</Text>
                </Pressable>
            </View>
        }
    </Formik>

};

export default SignIn;