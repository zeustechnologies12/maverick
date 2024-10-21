import { useTheme } from "@rneui/themed";
import { View, StyleSheet, ViewProps } from "react-native";

interface Props extends ViewProps {
  backgroundColor?: string;
  defaultPadding?: boolean;
}

export const Container = (props: Props) => {
  const { style, backgroundColor, defaultPadding = true, ...rest } = props;
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.flex1,
        {
          padding: defaultPadding ? theme.spacing.md : 0,
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
