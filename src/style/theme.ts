/* 
Optimal font sizes for mobile
On mobile, you have less room to display your content. Additionally, users typically hold the devices closer to their eyes than they would a laptop or desktop screen - which means your typefaces can (and should) be smaller than on desktop:
Body text - Font sizes should be at least 16px for body text. In some cases, you may be able to go smaller (for example. if a typeface has unusually large characters or you are using uppercase letters), with 14px being the smallest you should go. For context, Google’s Material Design uses a minimum suggestion of 14px for their secondary font size, while Apple’s guidelines use 15px for theirs.
Headings - Headings should be around 1.3 times larger than your body text to create a sufficient contrast. This would mean if you use 16px for body font size, then you would use ~21px. This is scaled down from the 3.5rem we used on desktop.
Subheadings - Here too, these would often be scaled down from the heading size, but we have a slight issue here in which the subheading may look too similar to the body font size. For this reason, some designers choose to make the subheading visually different through the use of weight, formatting like italics and letter spacing. If we used 21px for a heading, we might choose 18px or 16px for a subheading, but with lighter weight than the heading or body text.
Input fields - These should closely match the body text’s rules.
*/

import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "#2d3436",
    secondary: "#18A0FB",
    white: "#ffffff",
    gray: "#6D6D6D",
  },
  fonts: {
    helperText: ".8rem",
    subBody: "1.2rem",
    body: "1.4rem",
    strongBody: "1.8rem",
    label: "2.4rem",
    heading: "3.5rem",
    subHeading: "3rem",
  },
};

export default theme;
