import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, View, Image, Text, Pressable, ActivityIndicator, Alert } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
import { SliderBox } from 'react-native-image-slider-box'
import { Dimensions } from 'react-native';
import { AuthContext } from '../store/auth-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';



import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { signOutHandler } from '../util/auth';

// import MyIcon from '../assets/svg/cardboard.svg'
import { fetchNews } from '../util/newsApi';
import { getProfile, uploadImage } from '../util/auth';
import { Colors } from '../constants/colors';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location"
import { getAddress } from '../util/location';
//ee5f1e5c02ea4cef872aaed4fd4ec8b4
// AIzaSyBXDzwYhZ3WsEsQQQ5l_TjGAKyjCzzSLi0

//locationpin
const Home = ({ navigation, route }) => {
    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
    };
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const authCtx = useContext(AuthContext);

    const [pickedLocation, setPickedLocation] = useState();
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();


    const test = 'test'
    const sliderWidth = 0.75 * windowWidth;


    useEffect(() => {
        async function editLocation() {
            setIsLoading(true);
            setAddress('');
            setPickedLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            });
            const processedAddressed = await getAddress(route.params.pickedLat, route.params.pickedLng);
            setAddress(processedAddressed);
            setIsLoading(false);
        }

        if (route.params) {
            console.log(route.params);
            setAddress(route.params.editedAddress);
            setPickedLocation({
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            });

        }
    }, [route.params])


    function onSelectLocation() {
        console.log("location");
        getLocationHandler()

    }

    async function onEditLocation() {
        console.log("Button", address);
        console.log(authCtx.profile);
        navigation.navigate('Map', {
            initialLat: pickedLocation.lat,
            initialLng: pickedLocation.lng,
            address: address
        });

    }

 

    async function  onBooking() {
        if (!address) {
            Alert.alert('No address selected yet', 'Please pick your location before you proceed to the next step')
        } else {
            navigation.navigate('Materials', {
                address: address,
                location: pickedLocation
            });
        }

    }

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;  //boolean
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'You need to grant location permissions to use this app');
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        setIsLoading(true);
        setAddress('');
        const hasPermission = await verifyPermissions(); //return a boolean promise

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
        // console.log(location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        const processedAddressed = await getAddress(location.coords.latitude, location.coords.longitude)
        setAddress(processedAddressed);
        console.log(address);
        setIsLoading(false);
        // console.log(location.coords.latitude);
        // console.log(location.coords.longitude);
        // console.log(pickedLocation);

    }

    function signOut() {
        signOutHandler();
        authCtx.authenticate(null);
       }


    return (
        <View style={styles.screen}>
            <View style={styles.headerContainer}>
                <View style={styles.profileContainer}>
                    <Image style={styles.profileIcon} source={require('../assets/cartoon.webp')} />
                    <Text style={styles.text}>Hello, {authCtx.profile.username}</Text>
                    <Pressable style={styles.signOutContainer} onPress={signOut}>
                <Entypo name="log-out" size={24} color={Colors.green_1} />
                </Pressable>

                </View>
                <View style={styles.sliderBoxContainer}>
                    <SliderBox
                        images={[require('../assets/trash.jpeg'), require('../assets/trash2.jpeg')]}
                        dotColor={Colors.green_3}
                        inactiveDotColor={Colors.green_1}
                        activeDotColor={Colors.green_3}
                        sliderBoxHeight={120}
                        parentWidth={sliderWidth}
                        dotStyle={styles.dot}

                        ImageComponentStyle={{
                            borderRadius: 10,
                        }}
                    />
                </View>
            </View>
            <View style={styles.locationPickerContainer}>

                <View style={styles.textContainer}>
                    <Text style={styles.text}>Ready to Recycle?</Text>
                    <Image style={styles.leafIcon} source={require('../assets/emoji/leaf.png')} />
                   
                </View>

                <Pressable style={styles.mapContainer} onPress={onSelectLocation}>
                    <View style={styles.mapContainer}>
                        <Entypo style={styles.icon} name="location-pin" size={40} color="#397439" />

                        <View style={styles.addressContainer}>
                            <Text style={styles.text}>Your location</Text>
                            <View style={styles.addressContainer2}>
                                <Text style={styles.address}>{isLoading ? <ActivityIndicator color={Colors.green_1} /> : address ? address : 'No location added'}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
                <View style={styles.buttonsContainer}>
                    <Pressable style={styles.button1Container} onPress={onSelectLocation}>

                        <Entypo name="location-pin" size={25} color='white' />
                        <Text style={[styles.text, { color: 'white' }]}>Get location</Text>


                    </Pressable>


                    <Pressable style={[styles.button1Container, !address && styles.disabledButtonContainer]} disabled={address ? false : true} onPress={onEditLocation}>
                        <FontAwesome5 name="map-marked-alt" size={20} color="white" />
                        <Text style={[styles.text, { color: 'white' }]}>Edit location</Text>
                    </Pressable>
                </View>


                <Pressable style={styles.buttonContainer} onPress={onBooking}>

                    <Text style={[styles.text, { color: 'white' }]}>Book a Pick-up</Text>

                </Pressable>


            </View>
            <View style={styles.newsContainer}>

                <Text style={styles.text}>You have recycled a total of 5 kg this month</Text>
                <CircularProgressBase
                    {...props}
                    duration={2000}
                    value={80}
                    radius={100}
                    activeStrokeColor={'#e84118'}
                    inActiveStrokeColor={'#e84118'}
                >
                    <CircularProgressBase
                        {...props}
                        duration={2000}
                        value={87}
                        radius={75}
                        activeStrokeColor={'#badc58'}
                        inActiveStrokeColor={'#badc58'}
                    >
                        <CircularProgressBase
                            {...props}
                            duration={2000}
                            value={62}
                            radius={50}
                            activeStrokeColor={'#18dcff'}
                            inActiveStrokeColor={'#18dcff'}
                        />
                    </CircularProgressBase>
                </CircularProgressBase>


            </View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: '10%',
        backgroundColor: 'white',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16,

    },
    headerContainer: {
        flex: 0.8,
        width: '100%',
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingTop: 24

    },
    profileContainer: {
        flexDirection: 'row',
        flex: 1,
        //backgroundColor:'white',
        width: '50%',
        marginLeft: 43,
        alignItems: 'center',

    },
    signOutContainer : {
        marginLeft:'30%',
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'blue'

    },
    sliderBoxContainer: {
        flex: 2.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        marginTop: 0,
    },
    locationPickerContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.green_3,
        alignItems: 'center',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
    },
    locationContainer: {
        backgroundColor: 'red'
    },
    icon: {
        flex: 1,
        marginLeft: 10,
    },
    textContainer: {
        width: '85%',
        flex: 0.6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leafIcon: {
        width: 25,
        height: 25,
    },
    mapContainer: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.95,
        shadowRadius: 8,

    },
    addressContainer: {
        marginLeft: 5,
        flexWrap: 'wrap',
        flex: 6
    },
    addressContainer2: {
        flexDirection: 'row',
    },
    address: {
        flex: 1,
        flexWrap: 'wrap',
        marginTop: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: '85%',
        justifyContent: 'space-between',

    },
    buttonContainer: {
        width: '85%',
        flex: 0.6,
        marginVertical: 10,
        backgroundColor: '#397439',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.95,
        shadowRadius: 9,
    },
    button1Container: {
        width: '48%',
        marginVertical: 10,
        backgroundColor: '#397439',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,


    },
    disabledButtonContainer: {
        width: '48%',
        marginVertical: 10,
        backgroundColor: '#737a7365',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,


    },

    button2Container: {
        flexDirection: 'row',
        // justifyContent:'space-between',
        // backgroundColor: 'red'

    },
    newsContainer: {
        flex: 1,
        width: '100%',
        // backgroundColor: 'red',
        paddingBottom: 15,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

})


    // useEffect(() => {
    //     async function fetchProfile() {
    //         const uid = authCtx.token;
    //         const fetchedProfile = await getProfile(uid);
    //         console.log('got profile', fetchedProfile);
    //         authCtx.setProfile(fetchedProfile);
    //     }
    //     fetchProfile();
    // }, [])

    // useEffect(() => {
    //     // async function handleNewsFetching() {
    //     //     const fetchedNews = await fetchNews();
    //     //    console.log(fetchedNews);
    //     // //     fetchedNews.value.map((news)=> {
    //     // //        console.log(news.title,news.url,news.image.url,news.description);
    //     // //         // setNewsList((currentList) => [...currentList, {
    //     // //         //    title: news.title,
    //     // //         //    url: news.url,
    //     // //         //    imageUrl: news.image.url,
    //     // //         //    description: news.decription,

    //     // //         // }])
    //     // //      })
    //     // //      console.log(newsList);
    //     //  }
    //     // handleNewsFetching();

    // },[newsList])