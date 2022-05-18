import {Formik} from 'formik';
import * as yup from 'yup';
import {Pressable, StyleSheet, View} from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import {useMutation} from "@apollo/client";
import {AUTHENTICATE, CREATE_REVIEW} from "../graphql/mutations";
import {useNavigate} from "react-router-native";

const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
}

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, "Minimum value is 0")
        .max(100, "Maximum value is 100")
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


const CreateReview = () => {
    const navigate = useNavigate()
    const [submit] = useMutation(CREATE_REVIEW)

    const onSubmit = async (values) => {
        try {
            const {data} = await submit({
                variables: {
                    review: {...values, rating: parseInt(values.rating)}
                }
            })
            navigate("/repositories/" + data.createReview.repository.id)
        } catch (e) {
            console.log(e)
        }


    }

    return <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({handleSubmit}) => <View style={styles.container}>
            <FormikTextInput name="ownerName" placeholder="Owner name"/>
            <FormikTextInput name="repositoryName" placeholder="Repository name"/>
            <FormikTextInput name="rating" placeholder="Rating"/>
            <FormikTextInput name="text" placeholder="Review" multiline/>
            <Pressable onPress={handleSubmit}>
                <Text style={styles.button} fontSize="subheading" fontWeight="bold">Sign in</Text>
            </Pressable>
        </View>
        }
    </Formik>
}

export default CreateReview