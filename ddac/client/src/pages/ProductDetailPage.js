import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import {AdminNavbar, AdminSidebar} from "../components";
import styled from "styled-components";
import {IconButton, TextField} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDetailPage = ({ title }) => {
    const [file, setFile] = useState("");
    const {id} = useParams();

    return (
        <Wrapper>
            <AdminSidebar />
            <div className="newContainer">
                <AdminNavbar />
                <div className="top">
                    <Link to="/admin/products">
                        <IconButton sx={{mr: '1rem'}}><ArrowBackIcon/></IconButton>
                    </Link>
                    <h1>{title || "Add New Product"}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {/*<img*/}
                        {/*    src={*/}
                        {/*        file*/}
                        {/*            ? URL.createObjectURL(file)*/}
                        {/*            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"*/}
                        {/*    }*/}
                        {/*    alt=""*/}
                        {/*/>*/}
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    // onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            <div className="formInput">
                                <label>Product name</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>Brand</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>SKU</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>Category</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>Price</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>Description</label>
                                <TextField multiline maxRows={8} variant="standard" sx={{width: '100%'}}/>
                            </div>
                            <div className="formInput">
                                <label>Stock quantity</label>
                                <TextField variant="standard" sx={{width: '100%'}}/>
                            </div>

                            <button>Add Item</button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;

  .newContainer {
    flex: 6;
  }

  .newContainer .top, .newContainer .bottom {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 10px;
    margin: 20px;
    display: flex;
  }

  .newContainer .top h1, .newContainer .bottom h1 {
    font-size: 1.3rem;
    font-weight: bold;
    color: #999;
    margin-top: 7px;
  }

  .newContainer .top .left, .newContainer .bottom .left {
    flex: 1;
    text-align: center;
  }

  .newContainer .top .left img, .newContainer .bottom .left img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .newContainer .top .right, .newContainer .bottom .right {
    flex: 2;
  }

  .newContainer .top .right form, .newContainer .bottom .right form {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
  }

  .newContainer .top .right form .formInput, .newContainer .bottom .right form .formInput {
    width: 40%;
  }

  .newContainer .top .right form .formInput label, .newContainer .bottom .right form .formInput label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .newContainer .top .right form .formInput label .icon, .newContainer .bottom .right form .formInput label .icon {
    cursor: pointer;
  }

  .newContainer .top .right form .formInput input, .newContainer .bottom .right form .formInput input {
    width: 100%;
    padding: 5px;
    border: none;
    border-bottom: 1px solid gray;
  }

  .newContainer .top .right form button, .newContainer .bottom .right form button {
    width: 150px;
    padding: 10px;
    border: none;
    background-color: teal;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }

`;

export default ProductDetailPage;
