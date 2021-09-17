module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      innersm: "inset 0 0.7px 1px 0 rgba(0, 0, 0, 0.05)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      innerlg: "inset 0 2px 3px 0 rgba(0, 0, 0, 0.9)",
      none: "none",
    },
    divideWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    extend: {
      colors: {
        primary: "#134991",
        primaryContent: "#ffffff",
        positive: "#4f46e5",
        positiveContent: "#f9fafb",
        warning: "#a40e26",
        warningContent: "#ffffff",
        neutral: "#3ebb7d",
        neutralContent: "#394052",
        active: "#2150d5",
        base: {
          self: "#f9fafb", //50
          emphasize: "#f3f4f6", //100
          standout: "#e5e7eb", //gray-200
          content: "#f3F4F6",
        },
      },
    },
  },
  shortcuts: {
    materialThin: "bg-gray-100/70 backdrop-filter backdrop-blur-sm",
    materialMedium: "bg-gray-200/80 backdrop-filter backdrop-blur",
    materialThick: "bg-gray-200/90 backdrop-filter backdrop-blur-lg",
    textInput: "p-2 m-2 focus:(outline-none ring-indigo-500 border-indigo-500)  border-grey-300 shadow-sm rounded-md",
    materialInput: "bg-gray-400/30",
    btn: "w-15 h-11 py-2 inline-flex items-center justify-center rounded-md whitespace-nowrap font-medium shadow-sm select-none hover:(shadow-lg) focus:(outline-none ring-indigo-500) transition duration-300 ease-in-out",
    btnsm:
      "rounded-md whitespace-nowrap shadow-sm select-none hover:(shadow-lg) focus:(outline-none) transition duration-300 ease-in-out text-sm font-medium h-8 min-w-14 p-1",
    btnxs:
      "whitespace-nowrap shadow-sm select-none focus:(outline-none) transition duration-300 ease-in-out min-w-13 text-xs font-bold p-1 h-7 rounded-full",
    cellsm:"relative overflow-hidden bg-white/90 border border-base-standout/70 rounded-xl flex justify-between w-full h-21 mb-2 py-1 px-2 text-sm items-center shadow-sm",
    cell: "flex items-center justify-center w-full p-3 my-1 transition-all duration-300 ease-in-out rounded-md cursor-pointer select-none hover:(shadow-md bg-gray-300) focus:(outline-none)",
    infoCell: "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
    infoHead: "text-sm font-medium  flex flex-col justify-center",
    infoContent: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
    tableCell: "px-6 py-4 whitespace-nowrap",
    textHeading: "text-4xl font-medium",
    textSubHeading: "text-2xl font-medium",
    textDescription: "text-sm text-gray-500 font-medium tracking-wider uppercase",
    textLink: "text-indigo-600 hover:text-indigo-900",
    badge: "px-2 inline-flex text-xs leading-5 font-semibold rounded-full item-center ",
    
  },
  plugins: [require("windicss/plugin/forms"), require("windicss/plugin/line-clamp")],
};
