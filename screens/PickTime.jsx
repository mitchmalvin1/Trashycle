
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import BackButton from '../components/ui/BackButton'
import { Colors } from '../constants/colors';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Button from '../components/ui/Button';

const PickTime = ({ navigation, route }) => {

    const [chosenDateObject, setChosenDateObject] = useState({});
    const [chosenDay, setChosenDay] = useState('');
    const [chosenTime, setChosenTime] = useState('');
    const [pickedImage, setPickedImage] = useState();

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();


    let today = new Date().toISOString().slice(0, 10); //get today's date 


    function onTapBack() {
        navigation.goBack();
    }

    function onDayPress(day) {
        setChosenDateObject({
            [day.dateString]: {  //YYYY--MM-DD
                selected: true, marked: true, selectedColor: Colors.green_1
            }
        })
        setChosenDay(day.dateString)
    }

    function onTapTime(time) {
        setChosenTime(time);
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
        //console.log(image);
        setPickedImage(image.uri);
        console.log(pickedImage);
        // onTakeImage(image.uri);
    }

    function onTapNext () {
        if (!chosenDay || !chosenTime) {
            Alert.alert('No date or time selected','Please select a date.')
        } else if (!pickedImage) {
            Alert.alert('No image chosen', 'Please add an image of the items')
        }
        else {
            navigation.navigate('ConfirmPickup', {
                ...route.params, //contains address location,categories
                day: chosenDay,
                time: chosenTime,
                image: pickedImage,
                
            })
        }

    }

    return (
        <ScrollView style={styles.screen} >
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <BackButton style={styles.backButton} onPress={onTapBack} color={Colors.green_1} />
                    <Text style={styles.title}>Book your pickup</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>{route.params.address}</Text>
                    <Text style={styles.materials}>

                        {route.params.categories.map((category, index) => {
                            if (index == route.params.categories.length - 1) {
                                return category;
                            } else {
                                return category + ', '
                            }
                        })}
                    </Text>
                </View>
                <View style={styles.calendarContainer}>
                    <Text style={[styles.secondaryTitle, { marginBottom: 10 }]}>Select date & time</Text>
                    <Calendar
                        onDayPress={onDayPress}
                        minDate={today}
                        markedDates={chosenDateObject}
                    />
                    <View style={styles.buttonContainer} >
                        <Button
                            chosen={chosenTime.includes('09.00 AM - 11:30 AM')}
                            onPress={onTapTime.bind(this, '09.00 AM - 11:30 AM')}
                            customStyle={styles.button}>
                            09.00 AM - 11:30 AM
                        </Button>
                        <Button
                            chosen={chosenTime.includes('12.00 AM - 02:30 AM')}
                            onPress={onTapTime.bind(this, '12.00 AM - 02:30 AM')}
                            customStyle={styles.button}>
                            12.00 AM - 02:30 AM
                        </Button>
                    </View>
                    <View style={styles.buttonContainer} >
                        <Button
                            chosen={chosenTime.includes('03.00 PM - 05:30 PM')}
                            onPress={onTapTime.bind(this, '03.00 PM - 05:30 PM')}
                            customStyle={styles.button}>
                            03.00 PM - 05:30 PM
                        </Button>
                        <Button
                            chosen={chosenTime.includes('06.00 PM - 08:30 PM')}
                            onPress={onTapTime.bind(this, '06.00 PM - 08:30 PM')}
                            customStyle={styles.button}>
                            06.00 PM - 08:30 PM
                        </Button>
                    </View>
                </View>
                <Pressable style={styles.photoContainer} onPress={takeImageHandler} >
                    <Text style={styles.secondaryTitle}>Add a photo</Text>
                    <Text style={{ color: 'white' }}>Show us what we're picking up from you</Text>
                </Pressable>
                <Pressable style={styles.nextButton} onPress={onTapNext} >
                    <Text style={styles.secondaryTitle}>Next</Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}



export default PickTime

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
    calendarContainer: {
        backgroundColor: Colors.green_1,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        marginVertical: '5%',
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
        marginVertical: '5%',
        paddingVertical: '5%',
        // justifyContent:'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }

})

{/* <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                /> */}

