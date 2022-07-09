import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable} from 'react-native';
import { log } from 'react-native-reanimated';
import BackButton from '../components/ui/BackButton';
import CalculateItem from '../components/ui/CalculateItem';
import { Colors } from '../constants/colors';
import { AuthContext } from '../store/auth-context';
import { onCompleteRequest } from '../util/auth';




const Calculator = ({ route, navigation }) => {
    let obj = {};
    route.params.categories.map((category) => {
        obj[category] = 0;
    })


    const authCtx = useContext(AuthContext);
    const [calcObj, setCalcObj] = useState(obj)
    const [totalPoints, setTotalPoints] = useState(0);
    console.log(route.params);

    function onBack() {
        navigation.goBack();
    }

    async function updateHandler(value, category) {
        setCalcObj((calcObj) => {
            let obj = { ...calcObj }
            obj[category] = value;
            return obj;
        })

        console.log(value, calcObj, route.params.categories, 'hmm');
    }

    useEffect(() => {
        const total = Object.values(calcObj).reduce((prev, curr) => prev + curr, 0)
        console.log('Total :', total)
        setTotalPoints(total * 10)
    }, [calcObj])


    async function onComplete() {
        try {
            await onCompleteRequest({
                ...route.params,
                points : calcObj,
                totalPoints : totalPoints
              },authCtx.token,route.params.uid,route.params.bookingNo,totalPoints);
              console.log('everyth completed')
              navigation.navigate('RiderTabScreen')
        } catch(err) {
            console.log('error',err)
        }
       
    }
    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <BackButton style={styles.button} color="black" onPress={onBack} />
                    <Text style={styles.title}>Calculator</Text>
                </View>
                <ScrollView>
                    {
                        route.params.categories.map((category, index) => {


                            return <CalculateItem key={index} category={category} onUpdate={updateHandler} />
                        })
                    }
                </ScrollView>


            </View>
            <View style={styles.footerContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Booking No: {route.params.bookingNo}</Text>
                </View>

                {
                    route.params.categories.map(category => {

                        return (
                            <View style={styles.rowContainer}>
                                <Text style={styles.text}>{calcObj[category]} kg {category}</Text>
                                <Text style={styles.text}>{calcObj[category] * 10} points</Text>
                            </View>
                        )
                    })
                }
                <View style={styles.rowContainer}>
                    <Text style={styles.text}>Total : </Text>
                    <Text style={styles.text}>{totalPoints} points</Text>
                </View>
                <View style={styles.buttonsContainer}>
                <Pressable style={styles.completeButton} onPress={onComplete}>
                 <Text style={styles.buttonText}>Complete pickup</Text>
                </Pressable>
                <Pressable style={styles.cancelButton}>
                 <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                </View>
               

            </View>
        </View>
    )
}

export default Calculator;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    button: {
        marginRight: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 20,
    },
    contentContainer: {
        flex: 2.5,
        paddingHorizontal: '5%',
        paddingTop: '15%',
    },
    headerContainer: {
        flexDirection: 'row'
    },
    footerContainer: {
        flex: 1,
        backgroundColor: Colors.green_3,
        paddingHorizontal: '5%',
        borderTopWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
    },
    itemContainer: {
        flexDirection: 'row'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginVertical: '1%',
        fontWeight: '500',
    },
    buttonsContainer :{
        alignItems:'center',
     
    },
    completeButton: {
        width:'70%',
        backgroundColor:Colors.green_1,
        borderRadius:5,
        paddingVertical:'2%',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
        marginVertical:'2%',
    },
    cancelButton : {
        width:'70%',
        backgroundColor:'red',
        borderRadius:5,
        paddingVertical:'2%',
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.55,
        shadowRadius: 4,
        marginVertical:'2%',
    },
    buttonText: {
        textAlign:'center',
        color:'white',
        fontSize:16,
        fontWeight:'700',
    }

})