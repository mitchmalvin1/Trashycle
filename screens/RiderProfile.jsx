import React, {useContext, useState} from 'react'
import { View , StyleSheet, Pressable, Image, Text} from 'react-native'
import Modal from "react-native-modal";
import { Colors } from '../constants/colors';
import { AuthContext } from '../store/auth-context';
import { PieChart } from 'react-native-svg-charts';
import { Text as PieText } from 'react-native-svg'

const RiderProfile = () => {

    const [modalVisibility,setModalVisibility] = useState(false);
    const authCtx= useContext(AuthContext);

 
    const data = [
        {
            key: 1,
            amount: 50,
            svg: { fill: '#600080' },
        },
        {
            key: 2,
            amount: 50,
            svg: { fill: '#9900cc' }
        },
        {
            key: 3,
            amount: 40,
            svg: { fill: '#c61aff' }
        },
        {
            key: 4,
            amount: 95,
            svg: { fill: '#d966ff' }
        },
        {
            key: 5,
            amount: 35,
            svg: { fill: '#ecb3ff' }
        }
    ]
        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <PieText
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={14}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </PieText>
                )
            })
        }
   

  return (
   <View style={styles.screen}>
       <View style={styles.headerContainer}>
          <Pressable style={styles.imageContainer} >
              <Image source={require('../assets/emoji/onboarding-01.png')} style={styles.image}/>
          </Pressable>
          <View>
          <Text style={styles.text}>Hi, {authCtx.profile.username} !</Text>
          <Text style={styles.text}>Beginner recycler</Text>
          </View>

       </View>
       <View style={styles.summaryContainer}>
           <Text style={styles.title}>Your Recycling journey so far</Text>
           <PieChart
                style={{ height: 200 , marginVertical:'5%'}}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
            >
                <Labels/>
            </PieChart>
           <Text style={styles.text}>Your total points : ...</Text>
           <Text style={styles.text}>Points to next title : ...</Text>
       </View>
       <View style={styles.footerContainer}>
         <Text style={styles.text}>Contact Us</Text>
         <View style={styles.rowContainer}></View>
       </View>
   </View>
  )
}

export default RiderProfile;

const styles=StyleSheet.create({
    screen: {
        flex:1
    },
    headerContainer: {
        flex:1,
        flexDirection:'row',
        paddingTop:'15%',
        paddingBottom:'5%',
        paddingHorizontal:'10%',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:Colors.green_3,
    },
    imageContainer: {
       backgroundColor:'blue',
       borderRadius:40,
       marginRight:'5%',
    },
    image: {
        width:70,
        height:70,
    },
    title: {
        fontWeight:'800',
        fontSize:18,
        textAlign:'center',
        marginBottom:'5%',
    },
    text: {
        fontWeight:'600',
        fontSize:18,
        marginVertical:'2%',
    },
    summaryContainer: {
      flex:5,
      paddingVertical:'5%',
      borderBottomWidth:2,
      borderBottomColor:Colors.green_3,

    },
    footerContainer : {
        flex:1
    },
    rowContainer : {
       flexDirection:'row'
    }
})

// memes: {
//     1: require('./meme-1.png'),
//     2: require('./meme-2.png'),
//     3: require('./meme-3.gif'),
//     4: require('./meme-4.jpg'),
//     5: require('./meme-5.png'),
// }