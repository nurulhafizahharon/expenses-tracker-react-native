import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import addIcon from "../assets/icons/add-outline.png";
import chartIcon from "../assets/icons/chart_icon.png";
import listIcon from "../assets/icons/menu_icon.png";
import deleteIcon from "../assets/icons/trash.png";

import DataContext from "../DataContext";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ExpensesScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const dataCtx = useContext(DataContext);

  const deleteExpense = async (id) => {
    try {
      const response = await axios.delete(
        `http://10.0.2.2:8080/users/1/wallets/1/expenses/${id}`
      );
      console.log(response.data);
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://10.0.2.2:8080/users/1/wallets/1/expenses"
      );

      const expenseList = response.data;
      const sortExpensesByDate = expenseList.map((obj) => ({
        ...obj,
        dateObject: new Date(obj.expenseDate),
      }));
      sortExpensesByDate.sort((a, b) => b.dateObject - a.dateObject);
      setExpenses(sortExpensesByDate);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (dataCtx.fetchData) {
      fetchExpenses();
      dataCtx.handlerData();
    }
  }, [dataCtx.fetchData]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text h4 style={styles.heading}>
            My Expenses
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode === "list" ? "#FF6F61" : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("list")}
          >
            <Image
              source={listIcon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode === "list" ? "white" : "#282D3C",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode === "chart" ? "#FF6F61" : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Image
              source={chartIcon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode === "chart" ? "white" : "#282D3C",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {viewMode === "list" && (
          <View>
            {expenses.map((expense) => (
              <Card
                containerStyle={{
                  backgroundColor: "#92A8D1",
                  borderRadius: 10,
                  borderColor: "black",
                  padding: 5,
                  margin: 10,
                }}
                key={expense.id}
              >
                <Card.Title
                  style={{
                    flex: 5,
                    color: "#404040",
                    textAlign: "left",
                    marginLeft: 10,
                  }}
                >
                  Date: {expense.expenseDate}
                </Card.Title>
                <Card.Divider style={{ padding: 0, color: "white" }} />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.cardText}>
                      Category:{" "}
                      {capitalizeFirstLetter(expense.category.categoryName)}
                    </Text>
                    <Text style={styles.cardText}>
                      Description: {expense.description}
                    </Text>
                    <Text style={styles.cardText}>
                      Amount: ${expense.amount}
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => deleteExpense(expense.id)}
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
          </View>
        )}
        {viewMode === "chart" && (
          <View style={{ alignItems: "center" }}>
            <Text>Chart</Text>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddExpense")}
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
          Add Expense
        </Text>
      </TouchableOpacity>

      {/* <Button
        // icon={<Icon name="plus" size={15} color="white" />}
        icon={<AntDesign name="plus" size={24} color="black" />}
        title="Add Expense"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("AddExpense")}
      /> */}
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
    // padding: 5,
    marginLeft: 8,
    marginBottom: 5,
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
