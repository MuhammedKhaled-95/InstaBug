import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Dimensions, ActivityIndicator } from 'react-native';
import MovieItem from './MovieItem';

const apiURL = "http://api.themoviedb.org/3/discover/movie?api_key=acea91d2bff1c53e6604e4985b6989e2&page=";
const imageURL = "https://image.tmdb.org/t/p/w500"; // + The imagePoster URL
// This Page which contain all the Movies fetched from the API
const HomePage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);


    var getData = async () => {
        var updateURL = apiURL + currentPage; 
        if (currentPage < 501) {
            fetch(updateURL)
                .then((response) => response.json())
                .then((json) => {
                    setData(data.concat(json.results));
                    setLoading(false);
                })
                .catch((error) => {
                    setcurrentPage(currentPage - 1);
                    alert("Connection Error !!"); 
                    console.error(error);
                });
        } else {
            alert("No more movies to display !!");
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
        setcurrentPage(currentPage + 1);
        return () => {
        }
    }, []);

    var renderedMovie = ({ item }) => {
        return (<MovieItem title={item.title} imagePath={imageURL + item.poster_path}
            overview={item.overview} date={item.release_date} />);
    }

    const handleLoadMore = () => { 
        setcurrentPage(currentPage + 1);
        setLoading(true);
        getData();
    }

    return (
        <View
            style={{height:screenHeight}}>
            <View style={styles.loader} >
                <ActivityIndicator size="large" animating={isLoading} color='#000000' />
            </View>
            <FlatList
                data={data}
                renderItem={renderedMovie}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0} />
        </View>
    );
}
const screenHeight = Math.round(Dimensions.get('window').height) - 220;
const styles = StyleSheet.create({
    loader: {  
        position: 'absolute',
        width: '100%',
        bottom: 50, 
        zIndex: 1, 
    }
});


export default HomePage;