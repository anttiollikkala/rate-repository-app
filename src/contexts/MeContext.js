import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_ME} from "../graphql/queries";

const MeContext = React.createContext();

function MeProvider({children}) {
    const { refetch } = useQuery(GET_ME, {
        options: {
            fetchPolicy: 'network-only',
        }
    })
    const getMe = async () => {
        const me = await refetch()
        setValue([me.data, getMe, resetMe])
    }

    const resetMe = () => {
        setValue([null, getMe, resetMe])
    }

    const [value, setValue] = React.useState([null, getMe, resetMe])

    return <MeContext.Provider value={value}>{children}</MeContext.Provider>
}

function useMe() {
    return React.useContext(MeContext)
}

export { MeProvider, useMe };