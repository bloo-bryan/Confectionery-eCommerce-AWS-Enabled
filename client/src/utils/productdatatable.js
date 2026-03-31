export const productColumns = [
    {
        field: "name",
        headerName: "Product Name",
        width: 350,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img} alt="avatar" />
                    {params.row.name}
                </div>
            );
        },
    },
    {
        field: "category",
        headerName: "Category",
        width: 160,
    },

    {
        field: "price",
        headerName: "Price (RM)",
        width: 120,
    },
    {
        field: "stock",
        headerName: "Stock",
        width: 100,
    },
    {
        field: "dateAdded",
        headerName: "Date Added",
        width: 200,
    },
];

//temporary data
export const productRows = [
    {
        id: 1,
        SKU: "A1B2C3D4",
        name: "Dark Chocolate Sea Salt Caramels",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "9.99",
        stock: 35,
        dateAdded: '2022-03-12 12:15 PM',
    },
    {
        id: 2,
        SKU: "E5F6G7H8",
        name: "Creamy Peanut Butter Fudge",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "8.99",
        stock: 30,
        dateAdded: '2022-05-28 06:30 AM',
    },
    {
        id: 3,
        SKU: "I9J0K1L2",
        name: "Mint Chocolate Chip Cookies",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Bakery",
        price: "7.99",
        stock: 33,
        dateAdded: '2022-09-14 09:45 PM',
    },
    {
        id: 4,
        SKU: "M3N4O5P6",
        name: "Old Fashioned Hard Candies",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "4.99",
        stock: 12,
        dateAdded: '2022-01-01 12:00 AM',
    },
    {
        id: 5,
        SKU: "Q7R8S9T0",
        name: "Coconut Milk Chocolate Truffles",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "29.99",
        stock: 25,
        dateAdded: '2022-12-31 11:59 PM',
    },
    {
        id: 6,
        SKU: "U1V2W3X4",
        name: "Wild Blueberry Lemon Tart",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Bakery",
        price: "8.99",
        stock: 44,
        dateAdded: '2022-08-22 03:00 PM',
    },
    {
        id: 7,
        SKU: "Y5Z6A7B8",
        name: "Gourmet Milk Chocolate Covered Pretzels",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "9.99",
        stock: 25,
        dateAdded: '2022-04-15 06:30 AM',
    },
    {
        id: 8,
        SKU: "C9D0E1F2",
        name: "Honey Roasted Peanut Brittle",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Confectionery",
        price: "19.99",
        stock: 13,
        dateAdded: '2022-11-11 11:11 AM',
    },
    {
        id: 9,
        SKU: "C9E4E1F2",
        name: "French Vanilla Caramel Macchiato",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Beverage",
        price: "12.99",
        stock: 8,
        dateAdded: '2022-07-01 09:00 PM',
    },
    {
        id: 10,
        SKU: "B1B5D3D4",
        name: "Dark Chocolate Dipped Ginger Snaps",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        category: "Bakery",
        price: "19.99",
        stock: 21,
        dateAdded: '2022-02-28 11:59 PM"',
    },
];