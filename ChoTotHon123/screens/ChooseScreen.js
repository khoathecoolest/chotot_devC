import React, { useState } from 'react'

import { Text, StyleSheet, TouchableOpacity, View, Platform, Button, ScrollView, SafeAreaView, Dimensions, Image, StatusBar } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import firebase from '../components/FirebaseConfig'



const CATEGORIES = [
    {
        id: 1,
        name: 'Bất động sản',
        image: require('../assets/property.jpg'),
        interested: 'fasle'
    },
    {
        id: 2,
        name: 'Xe cộ',
        image: require('../assets/xe.jpg'),
        interested: 'fasle'
    },
    {
        id: 3,
        name: 'Đồ điện tử',
        image: require('../assets/elec.jpg'),
        interested: 'fasle'
    },
    {
        id: 4,
        name: 'Việc làm',
        image: require('../assets/job.jpg'),
        interested: 'fasle'
    },
    {
        id: 5,
        name: 'Thú cưng',
        image:require('../assets/thucung.jpg'),
        interested: 'fasle'
    },
    {
        id: 6,
        name: 'Đồ điện gia đụng',
        image: require('../assets/giadung.jpg'),
        interested: 'fasle'
    },
    {
        id: 7,
        name: 'Đồ nội thất',
        image: require('../assets/noithat.jpg'),
        interested: 'fasle'
    },
    {
        id: 8,
        name: 'Mẹ và Bé',
        image: require('../assets/binhsua.jpg'),
        interested: 'fasle'
    },
]

const CategoryChosenBtn = (props) => {

    var opacity = (props.category.interested === 'true' ? 0.2 : 1);

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                style={styles.categoryChosenBtn}
                activeOpacity={0.2}
                onPress={() => props.toggleInterested(props.category.id)}
            >

                <View style={{ opacity: opacity, alignItems: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image source={props.category.image} style={styles.image} resizeMode='cover' />
                    </View>
                </View>

            </TouchableOpacity>
            <View style={styles.categoryNameContainer}>
                <Text style={styles.categoryName} onPress={() => props.toggleInterested(props.category.id)}>{props.category.name}</Text>
            </View>
        </View>
    )
}

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const ChooseStack = createStackNavigator(
    {
        Choose: ChooseScreen,
    },
    config
);


function ChooseScreen(props) {

    const [categories, setCategories] = useState(CATEGORIES)
    const [chosen, setChosen] = useState(0)

    toggleInterested = (id) => {
        if (categories[id - 1].interested === 'true') {
            categories[id - 1].interested = 'false'
            setChosen(chosen - 1)
        } else {
            categories[id - 1].interested = 'true'
            setChosen(chosen + 1)
        }

        const newCategories = [...categories]
        setCategories(newCategories)
    }

    testFirestore = () => {
        firebase.database().ref('category').set(CATEGORIES);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headingContainer}>
                <View style={{height: 20}}></View>
                <TouchableOpacity onPress={()=>this.testFirestore()}>
                <Text style={styles.heading}>Bạn quan tâm gì nào?</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.chosenBtnContainer}>
                    {categories.map((c) => {
                        return <CategoryChosenBtn key={c.id} category={c} toggleInterested={toggleInterested} />;
                    })}
                </View>

            </ScrollView>
            <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => props.navigation.navigate('Main')}
                disabled={chosen === 0 ? true : false}
            >
                <View style={{ opacity: chosen === 0 ? 0.5 : 1 }}><Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Done</Text></View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// ChooseScreen.navigationOptions = {
//     headerRight: <Button title="Done" onPress={()=>props.navigation.navigate('Main')} />

// }

ChooseScreen.navigationOptions = {
    header: null
}

// const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    chosenBtnContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    categoryChosenBtn: {
        width: screenWidth / 2,
        height: screenWidth / 3
    },
    headingContainer: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    heading: {
        color: 'rgb(255,186,0)',
        fontSize: 21,
        fontWeight: '500'
    },
    doneBtn: {
        height: 40,
        width: 150,
        backgroundColor: 'rgb(255,186,0)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        position: 'absolute',
        bottom: 20,
        left: (screenWidth - 150) / 2
    },
    imageContainer: {
        maxWidth: screenWidth / 3,
        maxHeight: screenWidth / 3,
        shadowColor: "rgb(255,186,0)",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        elevation: 5,
        shadowRadius: screenWidth / 6 + 3.84
    },
    image: {
        maxWidth: screenWidth / 3,
        maxHeight: screenWidth / 3,
        opacity: 0.7,
        borderRadius: screenWidth / 6,
        backgroundColor: 'white',
    },
    categoryNameContainer: {
        width: screenWidth / 2,
        height: 25,
        alignItems: 'center'
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '400',
        textShadowColor: 'rgb(255, 255, 255)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5
    }
})

export default ChooseStack;
