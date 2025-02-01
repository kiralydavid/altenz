import { Combobox, createTheme } from "@mantine/core";

export const theme = createTheme({
  /** Put your mantine theme override here */
  components: {
    Combobox: Combobox.extend({
      defaultProps: {
        keepMounted: false,
      },
    }),
  },
});
