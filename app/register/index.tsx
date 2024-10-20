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

const Page = () => {
  const { theme } = useTheme();
  const [role, setRole] = useState(Role.PLAYER);

  return (
    <Container
      style={[Flex.justify.spaceBetween, { paddingVertical: theme.spacing.lg }]}
    >
      <View>
        <Text style={theme.textStyle.label.md}>You are?</Text>
        <ButtonGroup
          buttons={["Player", "Arena Manager"]}
          selectedIndex={role}
          onPress={(value) => setRole(value)}
        ></ButtonGroup>
      </View>
      <View style={{ gap: theme.spacing.sm }}>
        <Input label={"First Name"}></Input>
        <Input label={"Last Name"}></Input>
        <Input label={"CNIC"}></Input>
        <Input label={"Email"}></Input>
        <Input label={"Password"}></Input>
        <Input label={"Confirm Password"}></Input>
      </View>
      <Button title={"Register"}></Button>
    </Container>
  );
};

export default Page;
