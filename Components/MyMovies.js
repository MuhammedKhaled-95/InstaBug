import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button, Dimensions } from 'react-native';
import MovieItem from './MovieItem';
import MovieContainer from './newMovieContainer';
import Movie from '../MovieModel'

//This page contains the section for allowing users to manually add movies through input text and inserting photos from gallery. 
const MyMovies = () => {
    const [userMovies, setuserMovies] = useState([]);
    const [isVisible, SetContainerVisibility] = useState(false);
    const [isBtnVisible, SetBtnVisibilty] = useState(true);


    var renderedMovie = ({ item }) => {
        return (<MovieItem title={item.title} imagePath={item.poster}
            overview={item.overview} date={item.date} />);
    }

    const AddnewMovie = () => {
        SetContainerVisibility(!isVisible);
        SetBtnVisibilty(false);
    }

    function ConfirmPressed(input) {
        if (input.title === "" || input.overview === "" || input.date === "") {
            alert("Missing Data Fields");
        } else {
            SetContainerVisibility(false);
            SetBtnVisibilty(true);
            var newMovie = new Movie(input.overview, input.title, "" + input.poster, input.date);
            setuserMovies(userMovies.concat(newMovie));
        }
    }

    function CancelPress() {
        SetContainerVisibility(false);
        SetBtnVisibilty(true);
    }

    return (
        <View style={Styles.mainContainer}>
            {isBtnVisible ? <Button title="Add New Movie" style={Styles.btnStyle} onPress={AddnewMovie} /> : null}
            {isVisible ? <MovieContainer ConfirmPressed={ConfirmPressed}
                CancelPress={CancelPress} /> : null}
            <FlatList data={userMovies}
                renderItem={renderedMovie}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0}
                style={Styles.flatlistStyle}
            />
        </View>
    );
};


const screenHeight = Math.round(Dimensions.get('window').height) - 150;
const Styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: screenHeight,
    }, flatlistStyle: {
        marginTop: 20,
    }
});

export default MyMovies;