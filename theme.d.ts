import "@rneui/themed";
import { TextStyle } from "react-native";

declare module "@rneui/themed" {
  export interface Colors {
    contentSecondary: string;
  }

  export interface Theme {
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    borderRadius: {
      100: number;
      200: number;
      300: number;
    };
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    size: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    textStyle: {
      label: Record<"sm" | "md" | "lg", TextStyle>;
    };
  }
}
