import { DataGrid } from "@mui/x-data-grid";
import { productColumns, productRows } from "../utils/productdatatable";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const ProductTable = () => {
    const [data, setData] = useState(productRows);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/admin/edit-product/${params.row.id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">Edit</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <Wrapper>
            <div className="datatableTitle">
                Manage Products
                {/*<Link to="/users/new" className="link">*/}
                {/*    Add New*/}
                {/*</Link>*/}
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="category-select-small">Category</InputLabel>
                    <Select
                        labelId="category-select-small"
                        id="category-select-small"
                        // value={age}
                        label="Category"
                        // onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={productColumns.concat(actionColumn)}
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
    color: crimson;
    border: 1px dotted rgba(220, 20, 60, 0.6);
    cursor: pointer;
  }
`;

export default ProductTable;
