import { FlatList, View, StyleSheet } from 'react-native';
import {RepositoryItem} from "./RepositoryItem";
import { useState, useEffect } from 'react';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

    const { data } = useRepositories();
    // Get the nodes from the edges array
    const repositoryNodes = data.repositories
        ? data.repositories.edges.map(edge => edge.node)
        : [];


    const renderItem = ({item}) => {
        return <RepositoryItem {...item}/>
    }

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
        />
    );
};

export default RepositoryList;