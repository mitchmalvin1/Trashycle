import React, { useEffect } from 'react'
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../constants/colors';


const Result = ({ navigation, route }) => {
    console.log('aaaa', route.params);

    function onTapOk() {
        navigation.navigate('Home', { screen : 'Activity'});
    }

    useEffect(() => {

    }, [])
    return (
        <>
            <View style={styles.screen}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Pickup confirmed!</Text>
                    <Pressable onPress={onTapOk}>
                        <Entypo name="cross" size={24} color={Colors.green_1} />
                    </Pressable>
                </View>
                <View style={styles.content}>
                    <Image style={styles.image} source={require('../assets/emoji/onboarding-01.png')} />
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>Every contribution makes a difference. Thank you for doing your part in reducing waste & making the world a greener place</Text>
                </View>
            </View>
            <View style={styles.footerContainer}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.boldText}>Booking number : {route.params.bookingNo}</Text>
                    <Text style={styles.boldText}>
                        {route.params.categories.map((category, index) => {
                            if (index == route.params.categories.length - 1) {
                                return category;
                            } else {
                                return category + ', '
                            }
                        })}
                    </Text>
                    <Text style={styles.boldText}>{route.params.day}       {route.params.time} </Text>
                    <Text style={styles.boldText}>{route.params.address}</Text>
                </View>
            </View>
        </>
    )
}

export default Result;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: '15%',
        paddingHorizontal: '8%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '10%',
    },
    title: {
        fontWeight: '900',
        fontSize: 20,
    },
    content: {
        flex: 2.5,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '60%',
    },
    footerContainer: {
        flex: 0.4,
        backgroundColor: Colors.green_3,
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        borderTopColor: Colors.green_3,
        borderTopWidth: 3,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    boldText: {
        fontWeight: '800',
        marginVertical: '2%',
    }


})