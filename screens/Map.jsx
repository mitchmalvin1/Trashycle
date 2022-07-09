import React, { useEffect, useState, useCallback } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Pressable, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Input from '../components/Auth/Input';
import IconButton from '../components/ui/IconButton';
import { Colors } from '../constants/colors';
import Modal from "react-native-modal";

const Map = ({ navigation, route }) => {


    const [modalVisible, setModalVisible] = useState(false);
    navigation.setOptions({
        headerRight: ({ tintColor }) =>
            <View style={styles.headerRightContainer}>
                <Pressable style={styles.learnMoreButton} onPress={toggleModal}>
                    <Text>?</Text>
                </Pressable>
                <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />
            </View>

    })

    const initialLocation = {
        lat: route.params.initialLat,
        lng: route.params.initialLng
    }

    const [address, setAddress] = useState(route.params.address)
    const [selectedLocation, setSelectedLocation] = useState(initialLocation); //either undefined or an obj to show marker

    console.log(route.params.initialLat, route.params.initialLng, address);




    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0052,
        longitudeDelta: 0.0051,
    }

    function selectLocationHandler(event) {

        console.log('press');
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat: lat, lng: lng })
    }


    function savePickedLocationHandler() {
        console.log('submitting', address); //useCallback prevents this savePickedLcoationHadnler fxn from getting re-created with every render
        navigation.navigate('Home', {  //pass some parameter to addplace screen
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
            editedAddress: address
        })
    }


    function submitEdit() {
        Keyboard.dismiss();
    }

    function onChangeText(changedText) {
        setAddress(changedText);
        console.log(address);
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.screen}>
            <Modal isVisible={modalVisible} backdropColor='black' backdropOpacity={0.5} animationInTiming={500} animationOutTiming={500} >
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>How to edit your location:</Text>
                    <Text style={styles.text}>1. The Input Bar and Marker has been automatically filled (GPS-based).</Text>
                    <Text style={styles.text}>2. Tap on the Input Bar at the top of the map to edit your address manually.</Text>
                    <Text style={styles.text}>3. Tap anywhere on the map to indicate your exact geographic location. </Text>
                    <Text style={styles.text}>4. A marker will be automatically placed on the location that you tapped on.</Text>
                    <Text style={styles.text}>5. Tap on the save icon at the top right ofthe page to save the edited information.</Text>
                    <Text style={styles.text}>Please also note that editing either the Input Bar or the Marker will not automatically change the other.</Text>
                    <Text style={styles.text}>The purpose of this is to allow users more flexibility to edit their address and pinpoint their location more accurately.</Text>
                    <Button title="I got it !" onPress={toggleModal} />
                </View>
            </Modal>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <MapView
                    style={styles.map}
                    initialRegion={region}
                    onPress={selectLocationHandler}
                >

                    <TextInput
                        style={styles.inputContainer}
                        value={address}
                        multiline={true}
                        onSubmitEditing={submitEdit}
                        onChangeText={onChangeText}
                    />

                    {selectedLocation && <Marker
                        title="My Location"
                        coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                    />}
                </MapView>
            </TouchableWithoutFeedback>
        </View>

    )
}

export default Map;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    headerRightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor:'red',
        // paddingHorizontal:'5%'
    },
    map: {
        flex: 1
    },
    modalContainer: {
    
        marginVertical: '10%',
        marginHorizontal: '10%',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    title: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
        marginBottom:'3%',
    },
    text: {
        textAlign: 'center',
        marginVertical: '3%',
    },
    inputContainer: {
        width: '90%',
        position: 'absolute',
        left: '5%',
        top: '2%',
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    input: {
        width: '80%',
        position: 'absolute',
        top: 50,
    },
    learnMoreButton: {
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        // position: 'absolute',
        // right: '6%',
        // top: '2.5%',
    }
})

{/* <Input customStyle={styles.input} placeholder="Postal code" value={address} style={{position:'absolute', top: 100}}/> */ }