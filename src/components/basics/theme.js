import React from "react"
import { ThemeProvider } from "styled-components"

const breakpoints = ["384px", "768px", "1024px", "2000px"]
const theme = {
  breakpoints: {
    mobile: breakpoints[0],
    tablet: breakpoints[1],
    desktop: breakpoints[2],
    widescreen: breakpoints[3],
  },
  colors: {
    lightGray: "#A9ACB5",
    lightestGray: "#EDF2F7",
    offWhite: "#FFF5EB",
    lightPink: "#F6D9CB",
    darkerLightPink: "#EAB098",
    blue: "#143867",
    darkBlue: "#102E55",
    darkBeige: "#E29779",
    tartOrange: "#ED5651",
    teal: "#25B6C2",
  },
  mediaQueries: {
    mobile: `@media screen and (min-width: ${breakpoints[0]})`,
    tablet: `@media screen and (min-width: ${breakpoints[1]})`,
    desktop: `@media screen and (min-width: ${breakpoints[2]})`,
    widescreen: `@media screen and (min-width: ${breakpoints[3]})`,
  }
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme

