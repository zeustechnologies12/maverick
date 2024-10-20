import {
  Container,
  Text,
  Input,
  ButtonGroup,
  View,
  Button,
} from "@/components";
import { Role } from "@/types";
import { useTheme } from "@rneui/themed";
import { useState } from "react";
import { Flex } from "styles/Common";
import { useRegisterUser } from "hooks";

const Page = () => {
  const { theme } = useTheme();
  const [role, setRole] = useState(Role.CUSTOMER);

  const registerUser = useRegisterUser(
    () => console.log("success"),
    () => console.log("failure")
  );

  return (
    <Container
      style={[Flex.justify.spaceBetween, { paddingVertical: theme.spacing.lg }]}
    >
      <View style={{ gap: theme.spacing.md }}>
        <View>
          <Text style={theme.textStyle.label.md}>You are?</Text>
          <ButtonGroup
            buttons={["Customer", "Arena Manager"]}
            selectedIndex={role}
            onPress={(value) => setRole(value)}
          ></ButtonGroup>
        </View>
        <View style={{ gap: theme.spacing.sm }}>
          <Input label={"First Name"}></Input>
          <Input label={"Last Name"}></Input>
          <Input label={"Phone Number"}></Input>
          <Input label={"Email"}></Input>
          <Input label={"Password"}></Input>
        </View>
      </View>
      <Button
        title={"Register"}
        onPress={async () => {
          await registerUser.mutateAsync({
            payload: {
              first_name: "Khunshan",
              last_name: "Khalid",
              username: "Khunshh1",
              email: "khunshan1@bayut.com",
              phone_number: "1224556891",
              role: "customer",
              password: "passwordd",
            },
          });
        }}
      ></Button>
    </Container>
  );
};

export default Page;
