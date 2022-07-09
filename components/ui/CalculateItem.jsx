import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native';
import NumericInput from 'react-native-numeric-input'


let image;
let color;
const CalculateItem = ({category, onUpdate}) => {
    switch (category) {
        case 'Newspaper':
            image = <Image style={styles.image} source={require('../../assets/materials/newspaper2.png')} />
            color="blue"
            break;
        case 'Cardboard':
            image =<Image style={styles.image} source={require( '../../assets/materials/cardboard2.png')} />
            color="#7390e0"
            break;
        case 'Paper':
            image =<Image style={styles.image} source={require( '../../assets/materials/paper-doc2.png')} />
            color="#a0eb54"
            break;
        case 'Cooking-oil':
            image = <Image style={styles.image} source={require('../../assets/materials/cooking-oil.png')}/>
            color="#c2ea9b"  
            break;
        case 'Carton':
            image =<Image style={styles.image} source={require( '../../assets/materials/carton2.png')} />
            color="#d98e8e"  
            break;
        case 'Bottle':
            image =<Image style={styles.image} source={require( '../../assets/materials/bottle2.png')} />
            color="#dfd387"  
            break;
        case 'Soda-can':
            image=<Image style={styles.image} source={require( '../../assets/materials/soda-can2.png')}/>
            color="#e17072"  
            break;
        case 'Food-can':
            image=<Image style={styles.image} source={require( '../../assets/materials/food-can2.png')}/>
            color="#8bf387"  
            break;
        case 'Utensils':
            image = <Image style={styles.image} source={require('../../assets/materials/utensils2.png')}/>
            color="#5b4e7c"  
            break;
    }

    function onUpdateValue(value) {
        console.log(123,category);
      onUpdate(value,category)
    }


  return (
    <View style={[styles.itemContainer, {backgroundColor: color} ]}>
      {image}
      <Text style={styles.text}>{category}</Text>
      <NumericInput 
      style={styles.counter}
      type='plus-minus'
      textColor='white'
      totalHeight={30}
      iconSize={20}
      rounded
      maxValue={5}
      step={0.5}
      valueType='real'
      minValue={0}

     onChange={onUpdateValue} />
    </View>
  )
}

export default CalculateItem;

const styles=StyleSheet.create({
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        borderRadius :10,
        paddingHorizontal:'5%',
        paddingVertical:'3%',
        marginVertical:'5%',
    },
    image : {
        width:50,
        height:50
    },
    text : {
        color: 'white',
        marginLeft:'2%',
        fontSize :18,
        fontWeight:'700',
        marginRight:'10%',
    },
    counter : {
        marginLeft:'30%',
    }
})