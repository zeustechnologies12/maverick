import { Stack } from "expo-router";

import { ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
  mode: "light",
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
});

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
