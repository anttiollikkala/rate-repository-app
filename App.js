import Main from './src/components/Main';
import {NativeRouter} from 'react-router-native';
import {ApolloProvider} from '@apollo/client';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
import AuthStorageContext from './src/contexts/AuthStorageContext';
import {MeProvider} from "./src/contexts/MeContext";

const App = () => {
    return <NativeRouter>
        <ApolloProvider client={apolloClient}>
            <AuthStorageContext.Provider value={authStorage}>
                <MeProvider>
                    <Main/>
                </MeProvider>
            </AuthStorageContext.Provider>
        </ApolloProvider>
    </NativeRouter>;
};

export default App;