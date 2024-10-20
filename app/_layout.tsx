import { Slot, Stack } from "expo-router";

import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  mode: "light",
  lightColors: {
    background: "#F5F5DC",
    primary: "#4CAF50",
    contentSecondary: "#76ABAE",
    white: "#F5F7F8",
    black: "#021526",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
  size: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 64,
  },
  borderRadius: {
    100: 4,
    200: 6,
    300: 8,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  textStyle: {
    label: {
      sm: {
        fontWeight: "500",
        fontSize: 14,
      },
      md: {
        fontWeight: "500",
        fontSize: 16,
      },
      lg: {
        fontWeight: "500",
        fontSize: 18,
      },
    },
  },
  components: {
    Input: (_, theme) => ({
      containerStyle: { gap: theme.spacing.xs, paddingHorizontal: 0 },
      inputStyle: {
        fontSize: theme.fontSize.sm,
      },
      inputContainerStyle: {
        paddingHorizontal: theme.spacing.sm,
        borderWidth: 1,
        borderRadius: theme.borderRadius[200],
      },
      rightIconContainerStyle: {
        paddingRight: 0,
        marginVertical: 0,
      },
      labelStyle: [{ color: theme.colors.black }, theme.textStyle.label.md],
      renderErrorMessage: false,
    }),
    Icon: (_, theme) => ({
      size: theme.size.sm,
    }),
    Button: (props, theme) => ({
      buttonStyle: {
        borderWidth: props.type === "outline" ? 2 : 0,
        borderRadius: theme.borderRadius[300],
      },
      titleStyle: {
        color:
          props.type === "clear"
            ? theme.colors.contentSecondary
            : props.type === "outline"
            ? theme.colors.black
            : theme.colors.white,
      },
    }),
    Text: (_, theme) => ({
      style: {
        color: theme.colors.black,
      },
    }),
    ButtonGroup: (props, theme) => ({
      buttonContainerStyle: {
        borderWidth: 1,
        borderRadius: theme.borderRadius[100],
        borderColor: theme.colors.greyOutline,
        padding: theme.spacing.xs,
      },
      buttonStyle: {
        borderRadius: theme.borderRadius[100],
      },
    }),
  },
});

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Slot></Slot>
    </ThemeProvider>
  );
}
