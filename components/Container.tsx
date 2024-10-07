import { useTheme } from "@rneui/themed";
import { View, StyleSheet, ViewProps } from "react-native";

export const Container = (props: ViewProps) => {
  const { style, ...rest } = props;
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.flex1,
        { padding: theme.spacing.md, backgroundColor: theme.colors.background },
        style,
      ]}
      {...rest}
    ></View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
});
