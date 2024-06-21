import ExpensesScreen from "./ExpensesScreen";
import CategoryScreen from "./CategoryScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#755139",
          width: 180,
        },
        drawerLabelStyle: {
          // backgroundColor: "#c6cbef",
          width: 100,
          color: "white",
        },
        headerStyle: {
          height: 80, // Specify the height of your custom header
          backgroundColor: "#EFE1CE",
        },
      }}
    >
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      <Drawer.Screen name="Categories" component={CategoryScreen} />
    </Drawer.Navigator>
  );
}
