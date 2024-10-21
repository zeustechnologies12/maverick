import {
  Container,
  Text,
  Input,
  ButtonGroup,
  View,
  Button,
  ScrollView,
  BottomSheet,
} from "@/components";
import { useTheme } from "@rneui/themed";
import { Flex } from "styles/Common";
import { useRegisterUser } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { SignupSchema } from "@/validationSchema";
import { Role, SignUpKeys } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useCallback, useState } from "react";

const Page = () => {
  const { theme } = useTheme();

  const [isErrorSheetOpen, setIsErrorSheetOpen] = useState(false);
  const [error, setError] = useState<string>();
  const toggleErrorSheetVisibility = useCallback(
    () => setIsErrorSheetOpen((prev) => !prev),
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpKeys>({
    defaultValues: {
      role: "customer",
    },
    resolver: yupResolver(SignupSchema),
  });

  const { mutate: registerUser, isLoading } = useRegisterUser(
    (response) => {
      const {
        message,
        data: { email },
      } = response;
      router.navigate({
        pathname: "/authenticate",
        params: {
          registeredEmail: email,
          registerationSuccessMessage: message,
        },
      });
    },
    (error) => {
      setError(JSON.stringify(error.error.description));
      toggleErrorSheetVisibility();
    }
  );

  const onSubmit = (data: SignUpKeys) => {
    registerUser({ payload: data });
  };

  const renderErrorSheet = useCallback(
    () => (
      <BottomSheet
        isVisible={isErrorSheetOpen}
        onBackdropPress={toggleErrorSheetVisibility}
      >
        <Container
          style={[
            Flex.align.items.center,
            { padding: theme.spacing.lg, gap: theme.spacing.lg },
          ]}
        >
          <Text style={theme.textStyle.label.lg}>{error}</Text>
          <Button
            title={"Close"}
            onPress={() => {
              toggleErrorSheetVisibility();
            }}
          ></Button>
        </Container>
      </BottomSheet>
    ),
    [
      isErrorSheetOpen,
      toggleErrorSheetVisibility,
      theme.spacing.lg,
      theme.textStyle.label.lg,
      error,
    ]
  );

  return (
    <>
      <Container
        style={[Flex.justify.spaceBetween, { paddingBottom: theme.spacing.lg }]}
        defaultPadding={false}
      >
        <ScrollView
          contentContainerStyle={{
            gap: theme.spacing.md,
            paddingBottom: theme.spacing.lg,
          }}
        >
          <View>
            <Text style={theme.textStyle.label.md}>You are?</Text>
            <Controller
              control={control}
              name={"role"}
              render={({ field: { value, onChange } }) => (
                <ButtonGroup
                  buttons={["Customer", "Manager"]}
                  selectedIndex={
                    value === "customer" ? Role.CUSTOMER : Role.MANAGER
                  }
                  onPress={(value) =>
                    onChange(value === Role.CUSTOMER ? "customer" : "manager")
                  }
                ></ButtonGroup>
              )}
            ></Controller>
          </View>
          <View style={{ gap: theme.spacing.sm }}>
            <Controller
              control={control}
              name={"first_name"}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={"First Name"}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.first_name?.message}
                ></Input>
              )}
            ></Controller>
            <Controller
              control={control}
              name={"last_name"}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={"Last Name"}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.last_name?.message}
                ></Input>
              )}
            ></Controller>
            <Controller
              control={control}
              name={"phone_number"}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={"Phone Number"}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.phone_number?.message}
                ></Input>
              )}
            ></Controller>
            <Controller
              control={control}
              name={"email"}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={"Email"}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  autoCapitalize="none"
                ></Input>
              )}
            ></Controller>
            <Controller
              control={control}
              name={"password"}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={"Password"}
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  autoCapitalize="none"
                ></Input>
              )}
            ></Controller>
          </View>
        </ScrollView>
        <Button
          title={"Register"}
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting || isLoading}
          containerStyle={{ marginHorizontal: theme.spacing.md }}
          size="sm"
        ></Button>
      </Container>
      {renderErrorSheet()}
    </>
  );
};

export default Page;
