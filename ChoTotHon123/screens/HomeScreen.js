import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Dimensions
} from 'react-native';

import CurrencyFormat from 'react-currency-format'

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import data from '../assets/data'


// import { SearchBar } from 'react-native-elements';

const CATEGORYLIST = [
  {
    id: 1,
    name: 'Bất động sản',
    products: [
      {
        id: 1,
        title: 'Cho thuê căn hộ Q7',
        imageURL: require('../assets/house.jpeg'),
        price: 1000000
      },
      {
        id: 2,
        title: 'Cho thuê căn hộ Q7',
        imageURL: require('../assets/house.jpeg'),
        price: 1000000
      },
      {
        id: 3,
        title: 'Cho thuê căn hộ Q7',
        imageURL: require('../assets/house.jpeg'),
        price: 1000000
      },
      {
        id: 4,
        title: 'Cho thuê căn hộ Q7',
        imageURL: require('../assets/house.jpeg'),
        price: 1000000
      },
      {
        id: 5,
        title: 'Cho thuê căn hộ Q7',
        imageURL: require('../assets/house.jpeg'),
        price: 1000000
      }
    ]
  }
]

const TOPSEARCH = [
  {
    id: 1,
    name: 'Iphone 8',
    imageURL1: require('../assets/house.jpeg'),
    imageURL2: require('../assets/house.jpeg')
  }, {
    id: 2,
    name: 'Laptop',
    imageURL1: require('../assets/house.jpeg'),
    imageURL2: require('../assets/house.jpeg')
  }, {
    id: 3,
    name: 'Nhà Q10',
    imageURL1: require('../assets/house.jpeg'),
    imageURL2: require('../assets/house.jpeg')
  }, {
    id: 4,
    name: 'Mèo Anh',
    imageURL1: require('../assets/house.jpeg'),
    imageURL2: require('../assets/house.jpeg')
  }, {
    id: 5,
    name: 'Guitar',
    imageURL1: require('../assets/house.jpeg'),
    imageURL2: require('../assets/house.jpeg')
  }
]




const HeaderTab = () => {
  return (
    <View>
      <View style={{height: 20}}></View>
      <View style={headerStyle.container}>
      <View style={{ width: 20 }} />
      <Image source={require('../assets/logo_white.png')}
        style={headerStyle.image}
        resizeMode="contain"
      />
      <View style={{ width: 20 }} />
    </View>
    </View>
  )
}

const ProductListPreview = (props) => {
  const c = props.category;
  const p = props.products;
  return (
    <View>
      <TouchableOpacity style={styles.heading}  onPress={() => props.navigation.navigate('AdList', {category: props.category})}>
        <Text style={styles.bigTitle}>{c}</Text>
        <Text>More</Text>
      </TouchableOpacity>
      <ScrollView style={productListStyle.body} horizontal={true} showsHorizontalScrollIndicator={false}>
        {p.slice(0, 5).map(p => {
          return (
            <TouchableOpacity key={p.id}
            onPress={() => props.navigation.navigate('Detail', {itemID: p.id})}>
              <Image source={p.uri} style={productListStyle.photo} />
              <Text style={productListStyle.title}>{p.name}</Text>
              <CurrencyFormat renderText={value => <Text style={productListStyle.price}>{value}</Text>} value={p.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const TopSearchPreview = (props) => {
  const topSearch = props.topSearch
  return (
    <View>
      <TouchableOpacity style={styles.heading}>
        <Text style={styles.bigTitle}>Top Search</Text>
      </TouchableOpacity>
      <ScrollView style={topSearchStyle.body} horizontal={true} showsHorizontalScrollIndicator={false}>
        {topSearch.slice(0, 5).map((s, i) => {
          return (
            <TouchableOpacity key={s.id} style={topSearchStyle.oneSearch}>
              <View style={topSearchStyle.searchNameContainer}>
                <Text style={topSearchStyle.searchName}>#{i} {s.name.toUpperCase()}</Text>
              </View>
              <View style={topSearchStyle.photoContainer}>
                <Image source={s.imageURL1} style={topSearchStyle.photo} />
                <Image source={s.imageURL2} style={topSearchStyle.photo} />
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}

const SuggestedProduct = (props) => {
  const products = props.products
  return (
    <View>
      <TouchableOpacity style={styles.heading} onPress={() => props.navigation.navigate('AdList', {category: "May interested"})}>
        <Text style={styles.bigTitle}>May interested</Text>
        <Text>More</Text>
      </TouchableOpacity>
      <View style={suggestionStyle.photoContainer}>
        {products.slice(0, 10).map(p => {
          return (
            <TouchableOpacity key={p.id} style={{ marginBottom: 5 }}
              onPress={() => props.navigation.navigate('Detail', {itemID: p.id})}
            >
              <Image source={p.uri} style={suggestionStyle.photo} />
              <Text style={productListStyle.title}>{p.name}</Text>
              <CurrencyFormat renderText={value => <Text style={productListStyle.price}>{value}</Text>} value={p.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
              {/* <Text style={productListStyle.price}>{p.price}</Text> */}
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      location: {
        name: "",
        main: { temp: "" },
        wind: { speed: "" },
        weather: [{ main: "", description: "" }]
      },
      loading: true,
      error: false,
      list: data.AdList,
      filtered: []
    }
  }

  componentDidMount() {
    this.getLocationAsync();
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this.setState({list: data.AdList})
      var newFiltered = [];
      data.AdList.forEach((p) => {
        if (p.status !== 0 && p.hasOwnProperty("subCate") && !newFiltered.includes(p.subCate)) {
          newFiltered.push(p.subCate)
        }
      })
      this.setState({filtered: newFiltered});
    });
  }


  getWeather = async (latitude, longitude, imgUrl = "") => {
    this.setState({ loading: true }, async () => {
      const API_KEY = "358e93ce80300de5623c9af6e4b72408";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
      try {
        const response = await fetch(api);
        const jsonData = await response.json();
        this.setState({ location: { ...jsonData, imgUrl }, loading: false})

      } catch (error) {
        this.setState({ error: true, loading: false})
      }
    })
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    this.getWeather(location.coords.latitude, location.coords.longitude);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ProductListPreview products={this.state.list.filter(p=>p.category === "Bất động sản")} category="Bất động sản" navigation={this.props.navigation} />
        <View style={separatorStyle.container}></View>
        <ProductListPreview products={this.state.list.filter(p=>p.category === "Đồ điện tử")} category="Đồ điện tử" navigation={this.props.navigation} />
        <View style={separatorStyle.container}></View>
        {/* <TopSearchPreview topSearch={TOPSEARCH} />
        <View style={separatorStyle.container}></View> */}
        <SuggestedProduct products={this.state.list.filter(p=>p.weather === this.state.location.weather[0].main || (this.state.filtered.length === 0 ? (p.category === 'Đồ điện tử' || p.category === 'Bất động sản'):  this.state.filtered.includes(p.subCate) ))} navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}

HomeScreen.navigationOptions = {
  headerTitleStyle: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: 15
  },
  // title: 'Chotothon'
  header: <HeaderTab />,
  headerStyle: {
        backgroundColor: 'white',
       },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingVertical: 12,
  },
  bigTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  logo: {
    height: 30,
    width: 100
  }
});

const headerStyle = StyleSheet.create({
  container: {
      height: 60,
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: 'lightgray',
      borderBottomWidth: 0.5,
  },
  image: {
      flex: 1,
      width: null,
      height: 44
  }
})

const screenWidth = Dimensions.get('window').width;

const separatorStyle = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    height: 6
  },

})

const productListStyle = StyleSheet.create({

  body: {
    width: '100%',
    height: 180,
    flexDirection: 'row'
  },
  productContainer: {
    width: 180,
    height: 200,
  },
  photo: {
    width: 180,
    height: 120,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8
  },
  title: {
    paddingHorizontal: 8,
    paddingBottom: 3,
    paddingTop: 8,
    fontSize: 13,
    fontWeight: '400'
  },
  price: {
    paddingHorizontal: 8,
    padding: 3,
    fontSize: 13,
    fontWeight: '300'
  },
})

const topSearchStyle = StyleSheet.create({
  body: {
    width: '100%',
    height: 153,
    flexDirection: 'row',

  },
  oneSearch: {
    margin: 2,
    borderRadius: 8,
  },
  searchNameContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  searchName: {
    fontSize: 13,
    fontWeight: '300',
  },
  photoContainer: {
    width: 180,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  photo: {
    width: 89,
    height: 120,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8
  }
})

const suggestionStyle = StyleSheet.create({
  // Photo Container styles
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  photo: {
    width: screenWidth / 2,
    height: screenWidth / 3,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8
  }
})
