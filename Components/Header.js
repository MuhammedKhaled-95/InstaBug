import React from 'react';
import { StyleSheet, View,Text } from 'react-native';

// This is just a header component with a customized header color and Title.
const Header = () => {
    return (
        <View style={Styles.header}>
            <Text style={Styles.headerTitle}>Movie Repositories</Text>
        </View>
    );
};


const Styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 35,
        backgroundColor: '#31326f',
        alignItems: 'center',
        justifyContent: 'center'
    },headerTitle:{
        color:'white',
        fontSize:18
    }
});

export default Header;