import {Formik} from 'formik';
import * as yup from 'yup';
import {Pressable, StyleSheet, View} from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import {useMutation} from "@apollo/client";
import {AUTHENTICATE, CREATE_REVIEW, SIGN_UP} from "../graphql/mutations";
import {useNavigate} from "react-router-native";
import {useSignIn} from "../hooks/useSignIn";

const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
}

const validationSchema = yup.object().shape({
    username: yup.string().required().min(1).max(30),
    password: yup.string().required('Password is required').min(5).max(50),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
});

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


const SignUp = () => {
    const navigate = useNavigate()
    const [submit, result] = useMutation(SIGN_UP)
    const [signIn] = useSignIn()
    const onSubmit = async ({username, password}) => {
        try {
            await submit({
                variables: {
                    user: {
                        username, password
                    }
                }
            })
            await signIn({username, password})
            navigate("/")
        } catch (e) {
            console.log(e)
        }


    }

    return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username"/>
            <FormikTextInput name="password" placeholder="Password"/>
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation"/>
            <Pressable onPress={handleSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold">Sign in</Text>
            </Pressable>
        </View>
        }
    </Formik>
}

export default SignUp