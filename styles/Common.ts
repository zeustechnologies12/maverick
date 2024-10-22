import { StyleSheet, ViewStyle } from "react-native";

export const Flex = {
  0: { flex: 0 } as ViewStyle,
  1: { flex: 1 } as ViewStyle,
  2: { flex: 2 } as ViewStyle,
  3: { flex: 3 } as ViewStyle,
  4: { flex: 4 } as ViewStyle,
  5: { flex: 5 } as ViewStyle,
  justify: StyleSheet.create({
    center: { justifyContent: "center" },
    start: { justifyContent: "flex-start" },
    end: { justifyContent: "flex-end" },
    spaceBetween: { justifyContent: "space-between" },
    spaceEvenly: { justifyContent: "space-evenly" },
  }),
  align: {
    self: StyleSheet.create({
      center: { alignSelf: "center" },
      start: { alignSelf: "flex-start" },
      end: { alignSelf: "flex-end" },
    }),
    items: StyleSheet.create({
      center: { alignItems: "center" },
      start: { alignItems: "flex-start" },
      end: { alignItems: "flex-end" },
    }),
  },
};
