import React, { useEffect, useState, useCallback } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, Keyboard, TouchableWithoutFeedback, Pressable, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Input from '../components/Auth/Input';
import IconButton from '../components/ui/IconButton';
import { Colors } from '../constants/colors';
import Modal from "react-native-modal";
import call from 'react-native-phone-call'

const Map = ({ navigation, route }) => {
    console.log('hmm',route.params);
    const [modalVisible, setModalVisible] = useState(false);
    navigation.setOptions({
        headerRight: ({ tintColor }) =>
            <View style={styles.headerRightContainer}>
                <Pressable style={styles.learnMoreButton} onPress={toggleModal}>
                    <Text>?</Text>
                </Pressable>

            </View>

    })

    const initialLocation = {
        lat: route.params.location.lat,
        lng: route.params.location.lng
    }

    const region = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0352,
        longitudeDelta: 0.0351,
    }


    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    async function onPressCall(phoneNo) {
        try {
            const response = await call({
                number: phoneNo, // String value with the number to call
                prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call
            })
        } catch(err) {
            console.log('failed to call ',phoneNo, err);
        }
  
    }

    function onPressCalc() {
        navigation.navigate('Calculator',{
            ...route.params
        })
    }

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
                <MapView
                    style={styles.map}
                    initialRegion={region}
                >
                     <Marker
                        title="My Location"
                        coordinate={{ latitude: initialLocation.lat, longitude: initialLocation.lng }}
                    />
                </MapView>
                <View style={styles.footerContainer}>
                   <Text style={styles.text}>{route.params.address}</Text>
                   <Text style={styles.text}>{route.params.categories.map((category, index) => {
              if (index == route.params.categories.length - 1) {
                return category;
              } else {
                return category + ', '
              }
            })}</Text>
            <Text style={styles.text}>{route.params.day}, {route.params.time}</Text>
            <View style={styles.buttonsContainer}>
            <Pressable style={styles.contactContainer} onPress={onPressCall.bind(this,route.params.phoneNumber)}>
               <Text style={styles.buttonText}>Contact</Text>
            </Pressable>
            <Pressable style={styles.calcContainer} onPress={onPressCalc}>
               <Text style={styles.buttonText}>Calculator</Text>
            </Pressable>

            </View>
                </View>
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
        marginVertical: '1%',
        fontWeight:'500',
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
    },
    footerContainer : {
        flex:0.3,
        backgroundColor:Colors.green_3,
        borderTopColor: Colors.green_3,
        paddingHorizontal:'5%',
        paddingVertical:'3%',
        borderTopWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
    },
    buttonsContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'5%',
    },
    contactContainer: {
        borderRadius:10,
        backgroundColor:Colors.green_1,
        justifyContent:'center',
        alignItems:'center',
        width:'45%',
        height:30,
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,

    },
    calcContainer: {
        borderRadius:10,
        backgroundColor:Colors.blue_1,
        justifyContent:'center',
        alignItems:'center',
        width:'45%',
        height:30,
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
        
    },
    buttonText: {
        fontWeight:'500',
        color:'white',
        fontSize:18
    }
})

