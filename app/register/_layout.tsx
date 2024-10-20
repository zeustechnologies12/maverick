import { router, Stack } from "expo-router";
import { Icon } from "@/components";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Register",
          headerLeft: () => (
            <Icon
              name="arrow-left"
              type="font-awesome"
              onPress={() => router.navigate("signin")}
            ></Icon>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default Layout;
