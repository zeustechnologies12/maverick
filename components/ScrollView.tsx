import { useTheme } from "@rneui/themed";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
}

export const ScrollViewComponent = (props: Props) => {
  const { style, ...rest } = props;
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[
        { backgroundColor: theme.colors.background, padding: theme.spacing.md },
        style,
      ]}
      {...rest}
    ></ScrollView>
  );
};
