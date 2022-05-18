import FormikTextInput from "./FormikTextInput";
import {Pressable, StyleSheet, View} from "react-native";
import {Formik} from 'formik';
import * as yup from 'yup';
import Text from "./Text";
import theme from "../theme";
import {useSignIn} from "../hooks/useSignIn";
import {useNavigate} from "react-router-native";

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

export const SignInForm = ({handleSubmit}) => {
    return <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => <View style={styles.container}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" secureTextEntry/>
            <Pressable onPress={handleSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold">Sign in</Text>
            </Pressable>
        </View>
        }
    </Formik>
}

const SignIn = () => {
    let navigate = useNavigate();
    const [signIn] = useSignIn();
    const handleSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
            navigate("/")
        } catch (e) {
            console.log(e);
        }
    }
    return <SignInForm handleSubmit={handleSubmit}/>

};

export default SignIn;