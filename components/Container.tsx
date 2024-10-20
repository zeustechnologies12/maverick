import { useTheme } from "@rneui/themed";
import { View, StyleSheet, ViewProps } from "react-native";

interface Props extends ViewProps {
  backgroundColor?: string;
}

export const Container = (props: Props) => {
  const { style, backgroundColor, ...rest } = props;
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.flex1,
        {
          padding: theme.spacing.md,
          backgroundColor: backgroundColor || theme.colors.background,
        },
        style,
      ]}
      {...rest}
    ></View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
});
