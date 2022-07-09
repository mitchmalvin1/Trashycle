import React from 'react'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'

const Card = ({ icon, title, text, color, onPress,pressed, chosen}) => {
    let image;
    switch (icon) {
        case 'newspaper':
            image = <Image style={styles.image} source={require('../../assets/materials/newspaper2.png')} />
            break;
        case 'cardboard':
            image =<Image style={styles.image} source={require( '../../assets/materials/cardboard2.png')} />
            break;
        case 'paper':
            image =<Image style={styles.image} source={require( '../../assets/materials/paper-doc2.png')} />
            break;
        case 'cooking-oil':
            image = <Image style={styles.image} source={require('../../assets/materials/cooking-oil.png')}/>
            break;
        case 'carton':
            image =<Image style={styles.image} source={require( '../../assets/materials/carton2.png')} />
            break;
        case 'bottle':
            image =<Image style={styles.image} source={require( '../../assets/materials/bottle2.png')} />
            break;
        case 'soda-can':
            image=<Image style={styles.image} source={require( '../../assets/materials/soda-can2.png')}/>
            break;
        case 'food-can':
            image=<Image style={styles.image} source={require( '../../assets/materials/food-can2.png')}/>
            break;
        case 'utensils':
            image = <Image style={styles.image} source={require('../../assets/materials/utensils2.png')}/>
            break;
    }



    return (
        <Pressable style={[styles.card,  { backgroundColor: color }, chosen ? {opacity: 0.5} : {opacity:1}]} onPress={onPress}>
            {image}
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textContainer} >
                <Text style={styles.text}>{text}</Text>
            </View>
        </Pressable>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        alignItems: 'center',
        // justifyContent:'center',
        width:155,
        height:155,
        paddingTop:20,
        paddingHorizontal:5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 4,

    },
    image: {
        width: '40%',
        height: '45%',
      marginBottom:5,
    },
    title: {
        color: 'white',
        fontWeight: '900',
        fontSize: 16,
    
    },
    textContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop:5,
    },
    text: {
        color: 'white',
        textAlign:'center',
        fontSize:12
    }
})
