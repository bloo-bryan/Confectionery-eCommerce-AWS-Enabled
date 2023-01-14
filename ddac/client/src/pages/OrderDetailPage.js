import {AdminNavbar, AdminSidebar, OrderDetailHeader, OrderDetailTable} from "../components"
import styled from "styled-components";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IconButton} from "@mui/material";
import {Link} from "react-router-dom";

const OrderDetailPage = () => {
    return (
        <Wrapper>
            <AdminSidebar />
            <div className="singleContainer">
                <AdminNavbar />
                <div className="bottom">
                    <span>
                        {/*     className="btn btn-dark text-white">*/}
                        {/*        Back to Orders*/}
                        {/*    </Link>*/}
                        <Link to="/admin/orders">
                            <IconButton sx={{mr: '1rem', mb: '1rem'}}><ArrowBackIcon/></IconButton>
                        </Link>
                        <h1 className="title">Order Details</h1>
                    </span>
                    <OrderDetailHeader/>
                    <br/>
                    <OrderDetailTable/>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    width: 100%;

  span {
    display: flex;
  }
  
  .singleContainer {
    flex: 6;
  }

  .singleContainer .top {
    padding: 20px;
    display: flex;
    gap: 20px;
  }

  .singleContainer .top .left {
    flex: 1;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    position: relative;
  }

  .singleContainer .top .left .editButton {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    font-size: 12px;
    color: #7451f8;
    background-color: #7551f8 18;
    cursor: pointer;
    border-radius: 0px 0px 0px 5px;
  }

  .singleContainer .top .left .item {
    display: flex;
    gap: 20px;
  }

  .singleContainer .top .left .item .itemImg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  .singleContainer .top .left .item .details .itemTitle {
    margin-bottom: 10px;
    color: #555;
  }

  .singleContainer .top .left .item .details .detailItem {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .singleContainer .top .left .item .details .detailItem .itemKey {
    font-weight: bold;
    color: gray;
    margin-right: 5px;
  }

  .singleContainer .top .left .item .details .detailItem .itemValue {
    font-weight: 300;
  }

  .singleContainer .top .right {
    flex: 2;
  }

  .singleContainer .bottom {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 20px;
    margin: 10px 20px;
  }

  .singleContainer .title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #999;
    margin-top: 8px;
    text-align: left;
  }

`;

export default OrderDetailPage;