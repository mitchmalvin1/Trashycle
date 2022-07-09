import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import BackButton from '../components/ui/BackButton';
import { Colors } from '../constants/colors';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Materials = ({ navigation, route }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);

    function onTapBack() {
        navigation.goBack();
    }

    function onSelect(category) {
        console.log(category);
        if (!selectedCategories.includes(category)) {
            setSelectedCategories(prevSelectedCategories => [...prevSelectedCategories, category])
        } else {
            setSelectedCategories(prevSelectedCategories => prevSelectedCategories.filter(currCategory => currCategory != category))
        }

    }

    function onTapNext() {
        console.log({
            ...route.params,
            categories: selectedCategories
        });
        navigation.navigate('PickTime', {
            ...route.params,  //contains address and location
            categories: selectedCategories
        })
    }

    return (
        <View style={styles.screen}>
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <BackButton style={styles.button} onPress={onTapBack} color={Colors.green_1} />
                    <Text style={styles.title}>Select Materials</Text>
                </View>
                <Text style={styles.text}>Make sure to sort your items before booking!</Text>
                <ScrollView>
                    <View style={styles.rowContainer} >
                        <Card icon="newspaper" chosen={selectedCategories.includes('Newspaper')} title="Newspaper" text="Dry, clean,newspaper. Sort into stacks" color="blue" onPress={onSelect.bind(this, 'Newspaper')} />
                        <Card icon="cardboard" chosen={selectedCategories.includes('Cardboard')} title="Cardboard" text="Cut/collapse boxes into flat pieces & stack" color="blue" onPress={onSelect.bind(this, 'Cardboard')} />
                    </View>
                    <View style={styles.rowContainer} >
                        <Card icon="paper" chosen={selectedCategories.includes('Mixed paper')} title="Mixed paper" text="Letters,documents & other papers." color="#f78c02" onPress={onSelect.bind(this, 'Mixed paper')} />
                        <Card icon="cooking-oil" chosen={selectedCategories.includes('Used cooking oil')} title="Used cooking oil" text="Place in a container once cooled after cooking." color="#7aca9a" onPress={onSelect.bind(this, 'Used cooking oil')} />
                    </View>
                    <View style={styles.rowContainer} >
                        <Card icon="carton" chosen={selectedCategories.includes('Tetrapak carton')} title="Tetrapak carton" text="Rinsed & flattened milk or otherdrink cartons." color="#54e6eb" onPress={onSelect.bind(this, 'Tetrapak carton')} />
                        <Card icon="bottle" chosen={selectedCategories.includes('Mixed plastic')} title="Mixed plastic" text="Clean & dry plstic bottle packaging, jars, etc." color="#e83dc6" onPress={onSelect.bind(this, 'Mixed plastic')} />
                    </View>
                    <View style={styles.rowContainer} >
                        <Card icon="soda-can" chosen={selectedCategories.includes('Aluminium')} title="Aluminium" text="Clean & dry drink cans and aluminium foil." color="#7390e0" onPress={onSelect.bind(this, 'Aluminium')} />
                        <Card icon="food-can" chosen={selectedCategories.includes('Tin')} title="Tin" text="Clean & dry tin such as those in food cans." color="#7390e0" onPress={onSelect.bind(this, 'Tin')} />
                    </View>
                    <View style={styles.rowContainer} >
                        <Card icon="utensils" chosen={selectedCategories.includes('Steel')} title="Steel" text="Clean & dry steel items such as cans or utensils." color="#7390e0" onPress={onSelect.bind(this, 'Steel')} />
                        <Image style={styles.image} source={require('../assets/emoji/onboarding-04.png')} />
                    </View>

                </ScrollView>

            </View>
            <View style={styles.footerContainer}>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.text} >Material summary :</Text>
                    <View style={styles.materialContainer}>
                        <Text>
                            {selectedCategories.map((category, index) => {
                                if (index == selectedCategories.length - 1) {
                                    return category + '.';
                                } else {
                                    return category + ', '
                                }
                            })}
                        </Text>
                    </View>

                </View>
                <Button style={styles.button} onPress={onTapNext}>Next</Button>

            </View>
        </View>


    )


}

export default Materials;

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    content: {
        flex: 1,
        paddingTop: '15%',
        paddingHorizontal: '8%'
    },
    button: {
        marginRight: 10
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 15,

    },
    title: {
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20,
    },
    text: {
        fontWeight: '700'
    },
    rowContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal:'1%',

    },
    footerContainer: {
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: Colors.green_3,
        paddingHorizontal: '10%',
        borderTopColor: Colors.green_3,
        borderTopWidth: 3,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
    },
    footerTextContainer: {
        justifyContent: 'space-between',
        // marginVertical: 20,

        height: '50%',
        marginBottom: 5,
    },
    materialContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
        width: '90%',
    },
    image: {
        width: 155,
        height: 155,
    }
})