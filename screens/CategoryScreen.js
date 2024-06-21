import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import addIcon from "../assets/icons/add-outline.png";
import deleteIcon from "../assets/icons/trash.png";
import DataContext from "../DataContext";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CategoryScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const dataCtx = useContext(DataContext);

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:8080/users/1/categories/${id}`
      );
      console.log(response.data);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8080/users/1/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (dataCtx.fetchData) {
      fetchCategories();
    }
  }, [dataCtx.fetchData]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text h4 style={styles.heading}>
          Category List:
        </Text>
        {categories.map((category) => (
          <Card
            containerStyle={{
              backgroundColor: "#92A8D1",
              borderRadius: 10,
              borderColor: "black",
              padding: 5,
              margin: 10,
            }}
            key={category.id}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.cardText}>
                  {capitalizeFirstLetter(category.categoryName)}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => deleteCategory(category.categoryNum)}
                >
                  <Image
                    source={deleteIcon}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      margin: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddCategory")}
      >
        <Image
          source={addIcon}
          style={{
            width: 20,
            height: 20,
            tintColor: "white",
          }}
        />
        <Text
          style={{
            color: "white",
            padding: 10,
            // fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Add Category
        </Text>
      </TouchableOpacity>
      {/* <View style={styles.buttonContainer}>
        <Button
          icon={<Icon name="plus" size={15} color="white" />}
          title="Add Category"
          buttonStyle={styles.button}
          onPress={() => navigation.navigate("AddCategory")}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EFE1CE",
  },
  heading: {
    marginVertical: 5,
  },
  cardText: {
    fontSize: 15,
    padding: 5,
    marginLeft: 8,
    // marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    // backgroundColor: "blue",
    // borderRadius: 20,
    // margin: 20,
    flexDirection: "row",
    backgroundColor: "#34568B",
    alignItems: "center",
    justifyContent: "center",
    // height: 60,
    borderRadius: 20,
    margin: 10,
    // paddingVertical: 10,
  },
});
