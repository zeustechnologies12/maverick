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
import { Controller, useForm } from "react-hook-form";
import { SignInKeys } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninSchema } from "@/validationSchema";
import useLoginUser from "hooks/useLoginUser";

const Page = () => {
  const { theme } = useTheme();

  const { registeredEmail, registerationSuccessMessage } =
    useLocalSearchParams<{
      registeredEmail: string;
      registerationSuccessMessage: string;
    }>();

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<SignInKeys>({
    resolver: yupResolver(SigninSchema),
  });

  useEffect(() => {
    reset({
      email: registeredEmail,
      password: "",
    });
  }, [registeredEmail, reset]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRegisterationSuccessSheetOpen, setIsRegisterationSuccessSheetOpen] =
    useState(false);
  const [isLoginSuccessSheetOpen, setIsLoginSuccessSheetOpen] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);
  const toggleRegsiterationSuccessSheetVisibility = useCallback(
    () => setIsRegisterationSuccessSheetOpen((prev) => !prev),
    []
  );
  const toggleLoginSuccessSheetVisibility = useCallback(
    () => setIsLoginSuccessSheetOpen((prev) => !prev),
    []
  );

  const { mutate: loginUser, isLoading } = useLoginUser(
    (response) => {
      const { message } = response;
      setLoginSuccessMessage(message || "");
      toggleLoginSuccessSheetVisibility();
    },
    (error) => {
      console.log(error);
    }
  );

  useEffect(() => {
    registerationSuccessMessage &&
      !isRegisterationSuccessSheetOpen &&
      toggleRegsiterationSuccessSheetVisibility();
  }, [
    registerationSuccessMessage,
    isRegisterationSuccessSheetOpen,
    toggleRegsiterationSuccessSheetVisibility,
  ]);

  const onSubmit = (data: SignInKeys) => {
    loginUser({ payload: data });
  };

  const renderLoginSuccessSheet = () => (
    <BottomSheet
      isVisible={isLoginSuccessSheetOpen}
      onBackdropPress={toggleLoginSuccessSheetVisibility}
    >
      <Container
        style={[
          Flex.align.items.center,
          { padding: theme.spacing.lg, gap: theme.spacing.lg },
        ]}
      >
        <Text style={theme.textStyle.label.lg}>{loginSuccessMessage}</Text>
        <Button
          title={"Close"}
          size="sm"
          onPress={() => {
            toggleLoginSuccessSheetVisibility();
          }}
        ></Button>
      </Container>
    </BottomSheet>
  );

  const renderRegisterationSuccessSheet = () => (
    <BottomSheet
      isVisible={isRegisterationSuccessSheetOpen}
      onBackdropPress={toggleRegsiterationSuccessSheetVisibility}
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
          size="sm"
          onPress={() => {
            router.setParams({ registerationSuccessMessage: "" });
            toggleRegsiterationSuccessSheetVisibility();
          }}
        ></Button>
      </Container>
    </BottomSheet>
  );

  return (
    <>
      <Container backgroundColor="#005B41" style={styles.root}>
        {/* <Text
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
        </Text> */}
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
              <Controller
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Email"
                    textContentType="emailAddress"
                    inputStyle={{ color: theme.colors.grey0 }}
                    value={value || registeredEmail}
                    placeholder="abc@xyz.com"
                    errorMessage={errors.email?.message}
                    autoCapitalize="none"
                    onChangeText={onChange}
                  ></Input>
                )}
              ></Controller>
              <Controller
                control={control}
                name="password"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Password"
                    textContentType="password"
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                    errorMessage={errors.password?.message}
                    autoCapitalize="none"
                    onChangeText={onChange}
                    rightIcon={
                      <Icon
                        name={isPasswordVisible ? "eye-slash" : "eye"}
                        type="font-awesome"
                        onPress={togglePasswordVisibility}
                        size={theme.size.xs}
                      ></Icon>
                    }
                  ></Input>
                )}
              ></Controller>
              <Button
                title={"Login"}
                size="md"
                buttonStyle={{ marginTop: theme.spacing.md }}
                onPress={handleSubmit(onSubmit)}
                loading={isSubmitting || isLoading}
              ></Button>
            </View>
            <Button
              title={"Register"}
              size="sm"
              type="clear"
              onPress={() => router.navigate("/authenticate/register")}
            ></Button>
          </View>
        </Container>
      </Container>
      {renderRegisterationSuccessSheet()}
      {renderLoginSuccessSheet()}
    </>
  );
};

const styles = StyleSheet.create({
  root: { padding: 0, justifyContent: "flex-end" },
  contentContainer: { flex: 0.6 },
  innerContentContainer: { flex: 1, justifyContent: "space-between" },
});

export default Page;
