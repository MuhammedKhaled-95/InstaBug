import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const placeholderImage = require('../assets/placeholder.png');

// This is an Item holder component which is a reusable component used when fetching movie details from the API
//  and when adding new Movie manually from MyMovie Tab.
const MovieItem = props => {
    return (<View style={styles.itemRow}>
        <Image resizeMode='cover' source={props.imagePath.includes('null') ? placeholderImage : { uri:props.imagePath }} style={styles.itemImage} />
        <View>
            <Text style={styles.itemText}>Title : {props.title}</Text>
            <Text style={styles.itemText}>Release Date : {props.date}</Text>
            <Text style={styles.overText}>Overview: {props.overview}</Text>
        </View>
    </View>);
};


const styles = StyleSheet.create({
    itemRow: {
        borderBottomColor: '#fff',
        backgroundColor:'#fff',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
        borderRadius: 20,
        paddingBottom: 10,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:3,
        shadowOpacity:0.3,
        elevation:8
    }, itemImage: {
        width: '100%',
        height: 175, 
        resizeMode: 'cover',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    }, itemText: {
        fontWeight: 'bold', 
        textDecorationLine: 'underline',
        fontStyle: 'italic', 
        fontSize: 16,
        paddingTop: 5,
        paddingLeft:10, 
    }, overText: {
        fontSize: 12,
        paddingTop: 5,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10
    }
});

export default MovieItem;