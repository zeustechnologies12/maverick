import { Button, Container, Input, Text, View } from "@/components";
import { StyleSheet } from "react-native";
import { Flex } from "@/styles";
import { useTheme } from "@rneui/themed";

const SignIn = () => {
  const { theme } = useTheme();
  return (
    <Container style={Flex.justify.spaceBetween}>
      <View style={[styles.formContainer, { gap: theme.spacing.lg }]}>
        <Text h3 style={Flex.align.self.center}>
          {"Arena Selector"}
        </Text>
        <View>
          <Input label={"Email"}></Input>
          <Input label={"Password"}></Input>
          <Button title={"Sign In"} size="sm"></Button>
        </View>
      </View>
      <Button title={"Register"} type="clear"></Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  formContainer: { justifyContent: "center", flex: 1 },
});

export default SignIn;
