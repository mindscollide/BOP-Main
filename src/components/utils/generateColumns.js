// Function to generate columns dynamically based on data keys
export const generateColumns = (data) => {
  // Get the first row to inspect keys
  const firstRow = data[0];
  const currencyColumns = [];

  // Extract currency names and create column definitions dynamically
  Object.keys(firstRow).forEach((key) => {
    if (key !== "key" && key !== "tenor") {
      const currency = key.substring(0, key.length - 3).toUpperCase(); // Extract currency code
      const type = key.slice(-3).toLowerCase(); // Get last three characters ('Bid' or 'Ask')

      // Check if this currency is already added to columns
      let currencyColumn = currencyColumns.find(
        (col) => col.title === currency
      );

      if (!currencyColumn) {
        // Create a new currency column
        currencyColumn = {
          title: currency,
          children: [],
        };
        currencyColumns.push(currencyColumn);
      }

      // Add Bid or Ask to the children of the currency column
      currencyColumn.children.push({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        dataIndex: key,
        key: key,
        width: 100,
      });
    }
  });

  // Define the columns structure
  return [
    {
      title: "",
      dataIndex: "",
      key: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          fixed: "left", // Optional: to fix the column on the left
          width: 280,
        },
      ],
    },
    ...currencyColumns, // Spread the dynamically created currency columns
  ];
};
