import React, { useContext, useCallback, useState } from 'react'
import { View, Image, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { signOutHandler } from '../util/auth';



const RiderHome = ({navigation}) => {

    const props = {
        activeStrokeWidth: 25,
        inActiveStrokeWidth: 25,
        inActiveStrokeOpacity: 0.2
    };

    const authCtx = useContext(AuthContext)

  

    function onPressAllJobs() {
      navigation.navigate('Jobs')
    }

    async function onPressNextPickUp(reqData) {

        navigation.navigate('Jobs', {
            goScheduled: true
        })
        // const scheduledData = await getLocalRequests('drivers',authCtx.token,'scheduled')

        // if (!scheduledData) {
        //     Alert.alert('No scheduled pickup yet','Head to the Jobs section to accept some jobs before proceeding.')
        // }
        // else {
        //     navigation.navigate('RiderMap', {
        //         ...scheduledData
        // })

   

     }
    function signOut() {
     signOutHandler();
     authCtx.authenticate(null);
    }
    return (
        <View style={styles.screen}>
            <View style={styles.profileContainer}>
                <Image style={styles.profileIcon} source={require('../assets/cartoon.webp')} />
                <Text style={styles.text}>Hello, {authCtx.profile.username}</Text>
                <Pressable style={styles.signOutContainer} onPress={signOut}>
                <Entypo name="log-out" size={24} color={Colors.green_1} />
                </Pressable>
             
            </View>
            <Pressable style={styles.pressableContainer} onPress={onPressNextPickUp}>
                <View style={styles.pressable}>
                    <MaterialIcons style={styles.icon} name="delivery-dining" size={50} color="white" />
                    <View style={styles.textContainer}>
                        <Text style={styles.innerTitle}>Current Job</Text>
                        <View style={styles.innerTextContainer}>
                            <Text style={styles.innerText}>Your next pickup location and details.</Text>
                        </View>
                    </View>
                </View>

            </Pressable>
            <Pressable style={styles.pressableContainer} onPress={onPressAllJobs} >
                <View style={styles.pressable}>
                    <AntDesign style={styles.icon} name="profile" size={50} color="white" />
                    <View style={styles.textContainer}>
                        <Text style={styles.innerTitle}>Job Assignments</Text>
                        <View style={styles.innerTextContainer}>
                            <Text style={styles.innerText}>Pending, upcoming and completed pickups.</Text>
                        </View>
                    </View>
                </View>

            </Pressable>
    
                <Text style={[styles.text, {textAlign:'center'}]}>You have gathered a total of 40  points</Text>
                <View style={styles.circularContainer}>
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

export default RiderHome;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: '20%',
        backgroundColor: 'white',
    },
    profileContainer: {
        flexDirection: 'row',
        width: '70%',
        marginLeft: 43,
        alignItems: 'center',
    

    },

    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
        borderWidth: 2,
        borderColor: 'blue'

    },
 signOutContainer : {
     marginLeft:'30%',
 },
    text: {
        fontWeight: 'bold',
        fontSize: 16,


    },
    textContainer: {
        width:'80%',
        // backgroundColor:'blue',
    },
  
    innerTitle: {
        color: 'white',
        fontWeight: '800',
        fontSize: 19,
        marginVertical: '8%',
        marginHorizontal: '5%',
    },
    innerTextContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red'
    },
    innerText: {
        color: 'white',
        fontWeight: '700',
        marginHorizontal: '5%',
    },
    icon: {
        marginVertical: '10%',
        marginRight:'3%',
    },

    pressable: {
        backgroundColor: Colors.green_2,
        flexDirection: 'row',
        // flexWrap:'wrap',
        marginVertical: '8%',
        marginHorizontal: '10%',
        paddingHorizontal: '5%',
        borderRadius: 10,
        // backgroundColor:'blue',

    },
    circularContainer: {
       alignItems:'center',
        marginTop:'10%',
        // backgroundColor:'red'
    }

})