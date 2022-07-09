import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import BackButton from '../components/ui/BackButton'
import { Colors } from '../constants/colors';
import Button from '../components/ui/Button';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { createGlobalRequest, createRequest, updateReq, uploadImage } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';

const ConfirmPickup = ({ navigation, route }) => {

    const authCtx = useContext(AuthContext);
    const day = route.params.day;
    const time = route.params.time;
    const imageUri = route.params.image;
    const categories = route.params.categories;
    const address = route.params.address;
    console.log(route.params);

    const [isLoading,setIsLoading] = useState(false);
    const [pickedImage, setPickedImage] = useState(imageUri);
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    function onTapBack() {
        navigation.goBack();
    }

    async function onTapNext() {
        setIsLoading(true);
        try {
            const bookingId = await createRequest(authCtx.token, {  //create local request
                ...route.params,
                image: pickedImage,
                phoneNumber: authCtx.profile.phoneNumber
            })
            console.log('successfully retrieved req', bookingId);
            const downloadLink = await uploadImage(pickedImage, bookingId); //get the downlaod link in firestore after uplaodingit
            console.log('Download Url: ', downloadLink);
            const response= await updateReq(authCtx.token,bookingId,downloadLink);  //req now bookingId as the node name and downloadUrl as one of its keys
            const globalResponse = await createGlobalRequest(bookingId,  { //create a global request
                ...route.params,
                image: downloadLink,
                uid : authCtx.token,
                phoneNumber: authCtx.profile.phoneNumber
            },'pending')
            navigation.navigate('Result', {
                ...route.params,
                image: pickedImage,
                bookingNo: bookingId
            })
        } catch (err) {
            console.log(err, 'failed to retrieve req');
            setIsLoading(false);
        }

    }

    async function verifyPermissions() {  //returns a promise
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;  //boolean
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions', 'You need to grant camera permissions to use this app');
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        setPickedImage(image.uri);
        console.log(pickedImage);
    }

    return (
            isLoading? <LoadingOverlay message='Adding pick-up to booking list' />  : 
            <View style={styles.screen} >
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <BackButton style={styles.backButton} onPress={onTapBack} color={Colors.green_1} />
                    <Text style={styles.title}>Book your pickup</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>{address}</Text>
                    <Text style={styles.materials}>

                        {categories.map((category, index) => {
                            if (index == route.params.categories.length - 1) {
                                return category;
                            } else {
                                return category + ', '
                            }
                        })}
                    </Text>
                </View>
                <View style={styles.timeDateContainer}>
                    <Text style={[styles.secondaryTitle]}>Select date & time</Text>
                    <View  >
                        <Text style={[styles.text, { color: 'white' }]}>{day}</Text>
                        <Text style={[styles.text, { color: 'white' }]}>{time}</Text>
                    </View>
                </View>
                <View style={styles.addPhotoContainer}>
                    <Text style={[styles.secondaryTitle]}>Add a photo</Text>
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                    <Pressable style={styles.nextButton} onPress={takeImageHandler} >
                        <Text style={styles.secondaryTitle}>Change photo</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.confirmButton} onPress={onTapNext} >
                    <Text style={styles.secondaryTitle}>Confirm pickup details</Text>
                </Pressable>

            </View>
        </View>  
    )
}

export default ConfirmPickup;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingTop: '15%',
        paddingHorizontal: '8%',

    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 15,

    },
    backButton: {
        marginRight: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20,
    },
    detailsContainer: {
        backgroundColor: Colors.green_3,
        borderRadius: 10,
        height: '10%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    text: {
        fontWeight: '500'
    },
    materials: {
        fontWeight: '800',

    },
    timeDateContainer: {
        backgroundColor: Colors.green_1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        marginVertical: '5%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: 'row',
    },
    addPhotoContainer: {
        backgroundColor: Colors.green_1,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        marginVertical: '5%',
        height: '50%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,

    },
    secondaryTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
        // marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '4%',
    },
    button: {
        backgroundColor: Colors.green_3,
        color: 'black',
        paddingHorizontal: 4,
        shadowColor: 'white',
        shawdowopacity: 0.75,
        fontSize: 12,
    },
    photoContainer: {
        backgroundColor: Colors.green_1,
        borderRadius: 10,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        marginVertical: '5%',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    nextButton: {
        backgroundColor: Colors.green_3,
        borderRadius: 10,
        marginTop: '5%',
        paddingVertical: '5%',
        // justifyContent:'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    image: {
        height: '70%',
        width: '100%',

        marginTop: '3%',
        marginBottom: '5%',
    },
    confirmButton: {
        backgroundColor: Colors.green_1,
        borderRadius: 10,
        marginTop: '8%',
        paddingVertical: '5%',
        // justifyContent:'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

})
