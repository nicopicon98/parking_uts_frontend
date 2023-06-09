import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { Theme, PaletteMode } from "@mui/material";

// color design tokens export
export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#C3D730",
          200: "#A8BB29",
          300: "#8EA120",
          400: "#749517",
          500: "#5A7E0E",
          600: "#4D6B0C",
          700: "#405809",
          800: "#334406",
          900: "#263103",
        },
        secondary: {
          100: "#0B4A75",
          200: "#0A4370",
          300: "#093B6B",
          400: "#083466",
          500: "#073D61",
          600: "#063659",
          700: "#053050",
          800: "#042949",
          900: "#032142",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  const colors = tokens('light');
  return createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.grey[500],
            },
            text: {
              primary: colors.grey[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.grey[500],
            },
            text: {
              primary: colors.grey[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  });
};

interface ColorModeContextInterface {
  theme: Theme;
  colorModeHandler: () => void;
}

//context for color mode
export const ColorModeContext = createContext<ColorModeContextInterface | null>(
  null
);

export const ColorModeProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorModeHandler = () =>
    setMode((prevState) => (prevState === "light" ? "dark" : "light"));
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ColorModeContext.Provider value={{ colorModeHandler, theme }}>
      {children}
    </ColorModeContext.Provider>
  );
};
