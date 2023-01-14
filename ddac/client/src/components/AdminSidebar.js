import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AdminSidebar = () => {
    // const { dispatch } = useContext(DarkModeContext);
    return (
            <Wrapper>
                <div className="top">
                    <span className="logo">Store Manager</span>
                </div>
                <hr />
                <div className="center">
                    <ul>
                        <p className="title">MENU</p>
                        <Link to="/admin/orders" style={{ textDecoration: "none" }}>
                            <li>
                                <CreditCardIcon className="icon" />
                                <span>Orders</span>
                            </li>
                        </Link>
                        {/*<p className="title">LISTS</p>*/}
                        <Link to="/admin/products" style={{ textDecoration: "none" }}>
                            <li>
                                <StoreIcon className="icon" />
                                <span>Products</span>
                            </li>
                        </Link>
                        <Link to="/admin/add-product" style={{ textDecoration: "none" }}>
                            <li>
                                <LocalShippingIcon className="icon" />
                                <span>Add New Product</span>
                            </li>
                        </Link>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <li>
                                <ExitToAppIcon className="icon" />
                                <span>Back to Store</span>
                            </li>
                        </Link>
                    </ul>
                </div>
                {/*<div className="bottom">*/}
                {/*    <div*/}
                {/*        className="colorOption"*/}
                {/*        onClick={() => dispatch({ type: "LIGHT" })}*/}
                {/*    ></div>*/}
                {/*    <div*/}
                {/*        className="colorOption"*/}
                {/*        onClick={() => dispatch({ type: "DARK" })}*/}
                {/*    ></div>*/}
                {/*</div>*/}
            </Wrapper>
    );
};

const Wrapper = styled.div`
    flex: 1;
    border-right: 0.5px solid #e6e3e3;
    min-height: 100vh;
    background-color: white;

  .top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .top .logo {
    font-size: 20px;
    font-weight: bold;
    color: #6439ff;
  }

  hr {
    height: 0;
    border: 0.5px solid #e6e3e3;
  }

  .center {
    padding-left: 10px;
  }

  .center ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .center ul .title {
    font-size: 10px;
    font-weight: bold;
    color: #999;
    margin-top: 15px;
    margin-bottom: 5px;
    text-align: left;
  }

  .center ul li {
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
  }

  .center ul li:hover {
    background-color: #ece8ff;
  }

  .center ul li .icon {
    font-size: 18px;
    color: #7451f8;
  }

  .center ul li span {
    font-size: 13px;
    font-weight: 600;
    color: #888;
    margin-left: 10px;
  }

  .bottom {
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .bottom .colorOption {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #7451f8;
    cursor: pointer;
    margin: 5px;
  }

  .bottom .colorOption:nth-child(1) {
    background-color: whitesmoke;
  }

  .bottom .colorOption:nth-child(2) {
    background-color: #333;
  }

  .bottom .colorOption:nth-child(3) {
    background-color: darkblue;
  }
`;

export default AdminSidebar;
