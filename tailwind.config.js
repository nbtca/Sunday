module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#134991",
        primaryContent: "#ffffff",
        base: {
          self: "#f9fafb",
          emphasize: "#f3f4f6",
          standout: "#e5e7eb",
          content: "#f3F4F6",
        },
        warning: "#a40e26",
        warningContent: "#ffffff",
        active: "#2150d5",
      },
    },
  },
  shortcuts: {
    textInput: "p-2 m-2 focus:(outline-none ring-indigo-500 border-indigo-500)  border-grey-300 shadow-sm rounded-md",
    btn: "w-15 h-10 py-2 rounded-md shadow-sm select-none hover:(shadow-lg) focus:(outline-none ring-indigo-500) transition duration-300 ease-in-out",
    btnsm: "btn text-sm h-8 w-18 p-1",
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
