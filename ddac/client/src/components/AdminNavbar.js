import styled from "styled-components";
import {Typography} from "@mui/material";

const AdminNavbar = () => {
    return (
            <Wrapper>
                <div className="wrapper">
                    <div className="search">
                    </div>
                    <div className="items">
                        <div className="item">
                            <Typography variant="subtitle1">merchant name</Typography>
                        </div>
                        <div className="item">
                            <img
                                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                alt=""
                                className="avatar"
                            />
                        </div>
                    </div>
                </div>
            </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 50px;
    border-bottom: 0.5px solid #e7e4e4;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #555;

  .wrapper {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .wrapper .search {
    display: flex;
    align-items: center;
    border: 0.5px solid lightgray;
    padding: 3px;
  }

  .wrapper .search input {
    border: none;
    outline: none;
    background: transparent;
  }

  .wrapper .search input::placeholder {
    font-size: 12px;
  }

  .wrapper .items {
    display: flex;
    align-items: center;
  }

  .wrapper .items .item {
    display: flex;
    align-items: center;
    margin-right: 20px;
    position: relative;
  }

  .wrapper .items .item .icon {
    font-size: 20px;
  }

  .wrapper .items .item .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .wrapper .items .item .counter {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    top: -5px;
    right: -5px;
  }
`;

export default AdminNavbar;
