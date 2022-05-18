import {FlatList, View, StyleSheet, Pressable} from 'react-native';
import {RepositoryItem} from "./RepositoryItem";
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker'
import {useNavigate} from "react-router-native";
import Text from "./Text";
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const OrderPicker = ({orderBy, setOrderBy, setSearchQuery, searchQuery}) => {

    const options = {
        creation: "Latest repositories",
        ratingAsc: "Rating average (asc.)",
        ratingDesc: "Rating average (desc.)"
    }

    const [open, setOpen] = useState(false)

    const handleValueChange = (val) => {
        setOrderBy(val)
        setOpen(false)
    }

    const onChangeSearch = query => setSearchQuery(query);

    if (!open) {
        return <>
            <Searchbar
                style={{margin: 15, marginBottom: 0}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Pressable onPress={() => setOpen(true)}>
            <Text style={{padding: 20}} fontWeight="bold" fontSize="subheading">{options[orderBy]}</Text>
        </Pressable>
        </>
    }

    return <Picker selectedValue={orderBy} onValueChange={handleValueChange}>
        { Object.keys(options).map(key => <Picker.Item key={key} label={options[key]} value={key} />)}
    </Picker>
}

export const RepositoryListContainer = ({ repositories, orderBy, setOrderBy, searchQuery, setSearchQuery, fetchMore, navigate}) => {

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    const onEndReach = () => {
        fetchMore();
    };

    const renderItem = ({item}) => {
        return <Pressable onPress={() => navigate("/repositories/" + item.id)}>
            <RepositoryItem {...item}/>
        </Pressable>
    }

    return <FlatList
            data={repositoryNodes}
            ListHeaderComponent={<OrderPicker
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            renderItem={renderItem} />
};

const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState("creation")
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQueryDebounced] = useDebounce(searchQuery, 1000);
    const navigate = useNavigate()
    const { repositories, fetchMore } = useRepositories(orderBy, searchQueryDebounced, 8);
    return <RepositoryListContainer
        repositories={repositories}
        orderBy={orderBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fetchMore={fetchMore}
        navigate={navigate}
        setOrderBy={setOrderBy} />
    ;
};

export default RepositoryList;
