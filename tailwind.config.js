module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        primaryContent: "#ffffff",
        base: "#F3F4F6", //grey-100
        baseContent: "#F3F4F6",
        warning: "#DC2626",
      },
    },
  },
  shortcuts: {
    textInput:
      "p-2 m-2 focus:(outline-none ring-indigo-500 border-indigo-500) border border-grey-300 shadow-sm rounded-md",
    btn: "w-15 h-10 py-2 rounded-md shadow-sm hover:(shadow-lg) focus:(outline-none ring-indigo-500) transition duration-300 ease-in-out",
    cell: "flex items-center justify-center w-full p-3 my-1 transition-all duration-300 ease-in-out rounded-md cursor-pointer select-none hover:(shadow-md bg-gray-300)",
    tableCell: "px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
    tableHead: "text-sm font-medium  flex flex-col justify-center",
    tableContent: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2",
  },
  plugins: [],
};
