export const orderColumns = [
    { field: "name", headerName: "Name", width: 160 },
    {
        field: "username",
        headerName: "Username",
        width: 230,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    {/*<img className="cellImg" src={params.row.img} alt="avatar" />*/}
                    {params.row.username}
                </div>
            );
        },
    },
    {
        field: "total",
        headerName: "Total (RM)",
        width: 130,
    },

    {
        field: "dateAdded",
        headerName: "Date",
        width: 160,
    },
    {
        field: "status",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.status}
                </div>
            );
        },
    },
];

//temporary data
export const orderRows = [
    {
        id: 1,
        name: "Emily",
        username: "emily01",
        total: "25.99",
        date: "2022-05-12 14:32:56",
        status: "shipped",
    },
    {
        id: 2,
        name: "Michael",
        username: "michael02",
        total: "6.99",
        date: "2022-09-07 08:15:30",
        status: "delivered",
    },
    {
        id: 3,
        name: "Jessica",
        username: "jessica03",
        total: "87.99",
        date: "2022-02-28 23:59:59",
        status: "confirmed",
    },
    {
        id: 4,
        name: "Jacob",
        username: "jacob04",
        total: "23.99",
        date: "2022-01-01 00:00:00",
        status: "delivered",
    },
    {
        id: 5,
        name: "Amanda",
        username: "amanda05",
        total: "74.99",
        date: "2022-12-31 23:59:59",
        status: "delivered",
    },
    {
        id: 6,
        name: "Matthew",
        username: "matthew06",
        total: "16.99",
        date: "2022-06-30 12:34:56",
        status: "shipped",
    },
    {
        id: 7,
        name: "Danielle",
        username: "danielle07",
        total: "10.99",
        date: "2022-04-15 03:03:03",
        status: "shipped",
    },
    {
        id: 8,
        name: "Nicholas",
        username: "nicholas08",
        total: "13.99",
        date: "2022-08-22 18:45:12",
        status: "confirmed",
    },
    {
        id: 9,
        name: "Megan",
        username: "megan09",
        total: "21.99",
        date: "2022-11-11 11:11:11",
        status: "shipped",
    },
    {
        id: 10,
        name: "David",
        username: "david10",
        total: "7.99",
        date: "2022-10-31 06:06:06",
        status: "delivered",
    },
];