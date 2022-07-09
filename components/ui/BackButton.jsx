import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';

const BackButton = ({ style, onPress, color }) => {
    return (
    
            <Pressable style={style}   onPress={onPress}>
                <AntDesign name="left" size={24} color={color} />
            </Pressable>
     
    )
}

export default BackButton

// import { Image, StyleSheet, Text, View } from 'react-native'


// //newspaper-outline
// //box-open fontawesome
// //document-text-outline
// //


// const Card = ({ icon, title, text, color }) => {
//     const imageUrl = '';
//     switch (icon) {
//         case 'newspaper':
//             imageUrl = '../../assets/materials/newspaper.png'
//             break;
//         case 'cardboard':
//             imageUrl = '../../assets/materials/cardboard.png'
//             break;
//         case 'paper':
//             imageUrl = '../../assets/materials/paper-doc.png'
//             break;
//         case 'cooking-oil':
//             imageUrl = '../../assets/materials/cooking-oil.png'
//             break;
//         case 'carton':
//             imageUrl = '../../assets/materials/carton.png'
//             break;
//         case 'bottle':
//             imageUrl = '../../assets/materials/bottle.png'
//             break;
//         case 'soda-can':
//             imageUrl = '../../assets/materials/soda-can.png'
//             break;
//         case 'food-can':
//             imageUrl = '../../assets/materials/food-can.png'
//             break;
//         case 'utensils':
//             imageUrl = '../../assets/materials/utensils.png'
//             break;
//     }

//     return (
//         <View style={styles.card}>
//             <Image style={styles.image} source={require(imageUrl)} />
//             <Text style={styles.title}>{title}</Text>
//             <View style={styles.textContainer} >
//                 <Text style={styles.text}>{text}</Text>
//             </View>
//         </View>
//     )
// }

// export default Card;

// const styles = StyleSheet.create({
//     card: {
//         borderRadius: 4,
//         backgroundColor: { color },
//         alignItems: 'center',
//     },
//     image: {
//         width: '30%',
//         height: '30%',
//     },
//     title: {
//         color: 'white',
//         fontWeight: '900',
//         fontSize: 18
//     },
//     textContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap'
//     },
//     text: {
//         color: 'white'
//     }
// })