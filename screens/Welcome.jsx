import React , {useContext} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { AuthContext } from '../store/auth-context';

const Welcome = ({ navigation }) => {
    const authCtx = useContext(AuthContext);

    function onPressUser() {
        authCtx.chooseUserType('user');
        navigation.navigate('Login')
    }

    function onPressDriver() {
        authCtx.chooseUserType('driver');
        navigation.navigate('Login');
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Welcome to Extrash!</Text>
            <Text style={styles.text}>Let us know who you are to view the correct experience for you.</Text>
            <Pressable style={styles.buttonContainer} onPress={onPressUser}>
                <View style={styles.iconContainer}>
                    <Ionicons name="person-outline" size={50} color="white" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.secondaryTitle}>I am a user</Text>
                    <View style={styles.innerTextContainer}>
                        <Text style={styles.innerText}>Here to exchange your trash for cash?</Text>
                        <Text style={styles.innerText}>Click here to start booking pickups for your recyclable materials.</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable style={styles.buttonContainer} onPress={onPressDriver}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="delivery-dining" size={50} color="white" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.secondaryTitle}>I am a rider</Text>
                    <View style={styles.innerTextContainer}>
                        <Text style={styles.innerText}>Here to transport the recyclables?</Text>
                        <Text style={styles.innerText}>Click here if you are part of the extrash rider crew</Text>
                    </View>
                </View>
            </Pressable>

        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: '5%',
        // backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20,
        marginTop: '40%'
    },
    secondaryTitle: {
        fontWeight: '800',
        fontSize: 16,
        color: 'white',
        marginBottom: '5%',
    },
    text: {
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: '5%'
    },
    innerText: {
        fontWeight: '400',
        color: 'white'
    },
    buttonContainer: {
        backgroundColor: Colors.green_1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: '5%',
        paddingVertical: '5%',
        marginVertical: '5%',
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'blue',
    },
    textContainer: {
        flex: 3,
    },
    descriptionContainer: {
        backgroundColor: 'blue'
    },
    innerTextContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    }
})