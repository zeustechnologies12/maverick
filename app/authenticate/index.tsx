import {
  Button,
  Container,
  Input,
  Icon,
  View,
  Text,
  BottomSheet,
} from "@/components";
import { StyleSheet } from "react-native";
import { useTheme } from "@rneui/themed";
import { useCallback, useEffect, useState } from "react";
import { Flex } from "styles/Common";
import { router, useLocalSearchParams } from "expo-router";

const Page = () => {
  const { registeredEmail, registerationSuccessMessage } =
    useLocalSearchParams<{
      registeredEmail: string;
      registerationSuccessMessage: string;
    }>();
  useEffect(() => {
    console.log(
      "login registeredEmail, registerationSuccessMessage",
      registeredEmail,
      registerationSuccessMessage
    );
  }, [registeredEmail, registerationSuccessMessage]);
  const { theme } = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSuccessSheetOpen, setIsSuccessSheetOpen] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleSuccessSheetVisibility = useCallback(
    () => setIsSuccessSheetOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    registerationSuccessMessage &&
      !isSuccessSheetOpen &&
      toggleSuccessSheetVisibility();
  }, [
    registerationSuccessMessage,
    isSuccessSheetOpen,
    toggleSuccessSheetVisibility,
  ]);

  const renderRegisterationSuccessSheet = () => (
    <BottomSheet
      isVisible={isSuccessSheetOpen}
      onBackdropPress={toggleSuccessSheetVisibility}
    >
      <Container
        style={[
          Flex.align.items.center,
          { padding: theme.spacing.lg, gap: theme.spacing.lg },
        ]}
      >
        <Text style={theme.textStyle.label.lg}>
          {registerationSuccessMessage}
        </Text>
        <Button
          title={"Close"}
          onPress={() => {
            router.setParams({ registerationSuccessMessage: "" });
            toggleSuccessSheetVisibility();
          }}
        ></Button>
      </Container>
    </BottomSheet>
  );

  return (
    <>
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
                value={registeredEmail}
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
              onPress={() =>
                router.navigate({
                  pathname: "/authenticate/register",
                  params: {
                    registeredEmail: "cars",
                    registerationSuccessMessage: "caasc",
                  },
                })
              }
            ></Button>
          </View>
        </Container>
      </Container>
      {renderRegisterationSuccessSheet()}
    </>
  );
};

const styles = StyleSheet.create({
  root: { padding: 0, justifyContent: "flex-end" },
  contentContainer: { flex: 0.6 },
  innerContentContainer: { flex: 1, justifyContent: "space-between" },
});

export default Page;
