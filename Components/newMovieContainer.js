import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Movie from "../MovieModel";

// This is a customizable component for adding a new 
// movie with Input fields and the Image Picker library to choose from the phone gallery 

const placeholderImage = require('../assets/placeholder.png');
const newMovieContainer = props => {

    const [overView, setOverView] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={Styles.containerView}>
            <View style={Styles.FirstContainer}>
                <View style={Styles.imageContainer}>
                    {image === null ?
                        <Image source={placeholderImage} style={Styles.imageStyle}></Image>
                        : image && <Image source={{ uri: image }} style={Styles.imageStyle} />}
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Button title="Choose Image" onPress={pickImage} />
                </View>
            </View>
            <View style={Styles.InputContainer}>
                <TextInput
                    style={Styles.inputStyle}
                    placeholder={"Title"} 
                    onChangeText={title=>setTitle(title)}
                />
                <TextInput
                    style={Styles.inputStyle}
                    placeholder={"Release Date"}
                    onChangeText={date=>setDate(date)}
                />
                <TextInput
                    style={Styles.inputStyle}
                    placeholder={"Overview"}
                    onChangeText={overView=>setOverView(overView)}
                />
            </View>
            <View style={Styles.buttonContainer}>
                <Button title="Confirm" onPress={()=> {props.ConfirmPressed(new Movie(overView,title,image,date))}} />
                <Button title="Cancel" color="red" onPress={props.CancelPress} />
            </View>
        </View>
    );
};


const Styles = StyleSheet.create({
    containerView: {
        borderRadius: 20,
        backgroundColor: "white",
        marginBottom: 20,
        marginTop: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        shadowOpacity: 0.3,
        elevation: 8
    }, FirstContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    }, InputContainer: {
        paddingBottom: 10,
    }, imageStyle: {
        width: '100%',
        height: '100%',
    }, imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 50,
        margin: 10,
        backgroundColor: '#C5CEE0',
        borderWidth: 1,
        overflow: 'hidden',
    }, inputStyle: {
        height: 40,
        marginTop: 5,
        paddingLeft: 20,
        borderRadius: 20,
        borderBottomWidth: 1,
    }, buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 10,
        paddingBottom: 10,
    }
});

export default newMovieContainer;