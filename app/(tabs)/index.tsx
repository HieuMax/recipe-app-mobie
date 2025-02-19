// Import các thư viện
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';


// Định nghĩa các kiểu dữ liệu
type Ingredient = {
  name: string;
  quantity: string;
  image: any;
};
type Step = string;

type Recipe = {
  id: number;
  title: string;
  category: string;
  image: any;
  ingredients: Ingredient[];
  steps: string[];
};

type RootDrawerParamList = {
  TrangChủ: undefined;
  DanhMuc: undefined;
  MonAnVietNam: undefined;
  MonAnNuocNgoai: undefined;
  ChiTietMonAn: { recipe: Recipe };
};

// Tạo Drawer Navigator
const Drawer = createDrawerNavigator<RootDrawerParamList>();

// Dữ liệu món ăn
const vietnameseRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Phở Bò',
    category: 'Món Nước',
    image: require('../../assets/images/phobo.jpeg'),
    ingredients: [
      { name: 'Bánh phở', quantity: '200g', 
        image: require('../../assets/images/phobo.jpeg') 
      },
      { name: 'Thịt bò', quantity: '150g', 
        image: require('../../assets/images/phobo.jpeg') 
      },
      { name: 'Xương bò', quantity: '300g', 
        image: require('../../assets/images/phobo.jpeg') 
      },
      { name: 'Hành lá', quantity: '50g', 
        image: require('../../assets/images/phobo.jpeg') 
      },
      { name: 'Gia vị', quantity: '1 muỗng cà phê',
        image: require('../../assets/images/phobo.jpeg') 
      },
    ],
    steps: [
      'Bước 1: Nấu xương bò trong 4-5 tiếng để lấy nước dùng.',
      'Bước 2: Luộc bánh phở và thái thịt bò mỏng.',
      'Bước 3: Xếp bánh phở vào tô, thêm thịt bò và hành lá.',
      'Bước 4: Chan nước dùng nóng vào tô và thưởng thức.',
    ],
  },
  {
    id: 2,
    title: 'Gỏi Cuốn',
    category: 'Món Cuốn',
    image: require('../../assets/images/phobo.jpeg'),
    ingredients: [
      { name: 'Bánh tráng', quantity: '10 cái', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Tôm', quantity: '200g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Thịt ba chỉ', quantity: '150g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Bún tươi', quantity: '100g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Rau sống', quantity: '50g', image: require('../../assets/images/phobo.jpeg') },
    ],
    steps: [
      'Bước 1: Luộc tôm và thái thịt ba chỉ thành từng lát mỏng.',
      'Bước 2: Ngâm bánh tráng cho mềm, sau đó cuốn các nguyên liệu lại.',
      'Bước 3: Dùng kèm nước chấm hoặc tương ớt.',
    ],
  },
];

const foreignRecipes: Recipe[] = [
  {
    id: 1,
    title: 'Sushi',
    category: 'Japanese',
    image: require('../../assets/images/phobo.jpeg'),
    ingredients: [
      { name: 'Gạo sushi', quantity: '200g', image: require('../../assets/images/phobo.jpeg') },
{ name: 'Cá hồi', quantity: '150g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Rong biển', quantity: '10 lá', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Dấm', quantity: '30ml', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Gia vị', quantity: '1 muỗng cà phê', image: require('../../assets/images/phobo.jpeg') },
    ],
    steps: [
      'Bước 1: Nấu gạo sushi và trộn với giấm.',
      'Bước 2: Cắt cá hồi thành từng lát mỏng.',
      'Bước 3: Cuộn cá hồi và gạo sushi với rong biển.',
      'Bước 4: Cắt miếng sushi và thưởng thức.',
    ],
  },
  {
    id: 2,
    title: 'Pizza Margherita',
    category: 'Italian',
    image: require('../../assets/images/phobo.jpeg'),
    ingredients: [
      { name: 'Bột mì', quantity: '250g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Phô mai mozzarella', quantity: '100g', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Cà chua', quantity: '2 quả', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Húng quế', quantity: '5 lá', image: require('../../assets/images/phobo.jpeg') },
      { name: 'Gia vị', quantity: '1 muỗng cà phê', image: require('../../assets/images/phobo.jpeg') },
    ],
    steps: [
      'Bước 1: Trộn bột mì và nhào thành bột pizza.',
      'Bước 2: Cắt cà chua và phô mai thành lát mỏng.',
      'Bước 3: Phết bột lên đế pizza và thêm các nguyên liệu.',
      'Bước 4: Nướng pizza ở nhiệt độ cao và thưởng thức.',
    ],
  },
];

// Trang chu - Screen
const HomeScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.header}>Chia Sẻ Công Thức Nấu Ăn</Text>
    <Text style={styles.subHeader}>
      Hãy khám phá các công thức nấu ăn hấp dẫn và sáng tạo!
    </Text>
  </SafeAreaView>
);

// Cac mon an viet nam - Screen
const VietnameseFoodScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={vietnameseRecipes}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChiTietMonAn', { recipe: item })}
        >
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

// Cac mon an nuoc ngoai - Screen
const ForeignFoodScreen: React.FC<any> = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={foreignRecipes}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ChiTietMonAn', { recipe: item })}
        >
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

const RecipeDetailScreen: React.FC<any> = ({ route }) => {
  const { recipe }: { recipe: Recipe } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{recipe.title}</Text>
      <Image source={recipe.image} style={styles.recipeImage} />
      <Text style={styles.subHeader}>Nguyên liệu:</Text>
      {recipe.ingredients.map((ingredient: Ingredient, index: number) => (
        <Text key={index} style={styles.ingredient}>
          {ingredient.name} - {ingredient.quantity}
        </Text>
      ))}
      <Text style={styles.subHeader}>Công thức:</Text>
      {recipe.steps.map((step: Step, index: number) => (
        <Text key={index} style={styles.step}>
          {step}
        </Text>
      ))}
    </SafeAreaView>
  );
}

const App: React.FC = () => (
  <Drawer.Navigator initialRouteName="TrangChủ">
    <Drawer.Screen name="TrangChủ" component={HomeScreen} />
    <Drawer.Screen name="MonAnVietNam" component={VietnameseFoodScreen} />
    <Drawer.Screen name="MonAnNuocNgoai" component={ForeignFoodScreen} />
    <Drawer.Screen name="ChiTietMonAn" component={RecipeDetailScreen} 
      options={{ 
        drawerLabel: () => null,
        drawerItemStyle: { height: 0 }, // Removes clickable space
       }} // Hides this screen from the drawer
    />
  </Drawer.Navigator>
);

// Các style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: "auto"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: 'gray',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: 200,
    borderColor: "black",
    // borderWidth: 1,
    boxShadow: "0px 4px 4px 0px black"
  },
  button:{
    // backgroundColor: "red",
    width:250
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginVertical: 10,
  },
  ingredient: {
    fontSize: 16,
  },
  step: {
    fontSize: 16,
    marginVertical: 5,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16, 
  },
});

export default App;
