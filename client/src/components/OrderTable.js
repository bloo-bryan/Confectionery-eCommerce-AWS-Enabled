import { DataGrid } from "@mui/x-data-grid";
import { orderColumns, orderRows } from "../utils/orderdatatable";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import dayjs from "dayjs";
import {dateTimeFormat} from "../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders} from "../features/adminOrderSlice";
import {Loading} from "./index";

const OrderTable = () => {
    const [data, setData] = useState(orderRows);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {orders} = useSelector((store) => store.adminOrder);

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/admin/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                    </div>
                );
            },
        },
    ];

    const filterData = (orders) => {
        let filtered = []
        for (let order of orders) {
            const {order_id: id, username, name, total: subtotal, shipping, dateAdded, status} = order;
            const total = (subtotal + shipping).toFixed(2);
            filtered.push({
                id, name, username, total, status,
                dateAdded: dayjs(dateAdded).format(dateTimeFormat)
            })
        }
        setData(filtered);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await dispatch(fetchOrders());
            filterData(data.payload)
            setLoading(false);
        }
        fetchData().catch(console.error)
    }, []);

    if(loading) {
        return <Loading/>
    }

    return (
            <Wrapper>
                <div className="datatableTitle">
                    Manage Orders
                </div>
                <DataGrid
                    className="datagrid"
                    rows={data}
                    columns={orderColumns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 600px;
    padding: 20px;

  .datatableTitle {
    width: 100%;
    font-size: 1.3rem;
    font-weight: bold;
    color: #999;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .datatableTitle .link {
    text-decoration: none;
    color: green;
    font-size: 16px;
    font-weight: 400;
    border: 1px solid green;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .search {
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    padding: 3px;
  }

  .search input {
    border: none;
    outline: none;
    background: transparent;
  }

  .search input::placeholder {
    font-size: 1rem;
  }

  .cellWithImg {
    display: flex;
    align-items: center;
  }

  .cellWithImg .cellImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .cellWithStatus {
    padding: 5px;
    border-radius: 5px;
  }

  .cellWithStatus.delivered {
    background-color: rgba(0, 128, 0, 0.05);
    color: green;
  }

  .cellWithStatus.shipped {
    background-color: rgba(255, 217, 0, 0.05);
    color: goldenrod;
  }

  .cellWithStatus.confirmed {
    background-color: rgba(255, 0, 0, 0.05);
    color: crimson;
  }

  .cellAction {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cellAction .viewButton {
    padding: 2px 5px;
    border-radius: 5px;
    color: darkblue;
    border: 1px dotted rgba(0, 0, 139, 0.596);
    cursor: pointer;
  }

  .cellAction .deleteButton {
    padding: 2px 5px;
    border-radius: 5px;
    color: green;
    border: 1px dotted rgba(0, 128, 0, 0.6);
    cursor: pointer;
  }
`;

export default OrderTable;
