import { Button, Container, Input, Icon, View, Text } from "@/components";
import { StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { Flex } from "styles/Common";
import { router } from "expo-router";

const SignIn = () => {
  const { theme } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  return (
    <Container backgroundColor="#005B41" style={styles.root}>
      <Text
        h1
        style={[
          Flex.align.self.center,
          {
            color: theme.colors.white,
            bottom: 200,
          },
        ]}
      >
        Arena Panda
      </Text>
      <Container
        style={[
          styles.contentContainer,
          {
            borderTopStartRadius: theme.borderRadius[300],
            borderTopEndRadius: theme.borderRadius[300],
          },
        ]}
      >
        <View
          style={[
            styles.innerContentContainer,
            { paddingVertical: theme.spacing.md },
          ]}
        >
          <View style={{ gap: theme.spacing.sm }}>
            <Input
              label="Email"
              textContentType="emailAddress"
              inputStyle={{ color: theme.colors.grey0 }}
              placeholder="abc@xyz.com"
            ></Input>
            <Input
              label="Password"
              textContentType="password"
              secureTextEntry={!isPasswordVisible}
              rightIcon={
                <Icon
                  name={isPasswordVisible ? "eye-slash" : "eye"}
                  type="font-awesome"
                  onPress={togglePasswordVisibility}
                  size={theme.size.xs}
                ></Icon>
              }
            ></Input>
            <Button
              title={"Login"}
              size="md"
              buttonStyle={{ marginTop: theme.spacing.md }}
            ></Button>
          </View>
          <Button
            title={"Register"}
            size="sm"
            type="clear"
            onPress={() => router.navigate("register")}
          ></Button>
        </View>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  root: { padding: 0, justifyContent: "flex-end" },
  contentContainer: { flex: 0.6 },
  innerContentContainer: { flex: 1, justifyContent: "space-between" },
});

export default SignIn;
