import { router, Stack } from "expo-router";
import { Icon } from "@/components";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Register",
          headerLeft: () => (
            <Icon
              name="arrow-left"
              type="font-awesome"
              onPress={() => router.back()}
            ></Icon>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Layout;
