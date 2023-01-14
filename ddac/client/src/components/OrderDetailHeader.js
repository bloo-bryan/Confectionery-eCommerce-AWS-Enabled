import React, {useState} from "react";
import {Link} from "react-router-dom";
import {OrderDetailInfo} from "./index";
import styled from 'styled-components';
import SaveIcon from '@mui/icons-material/Save';
import {IconButton} from "@mui/material";

const OrderDetailHeader = () => {
    const [status, setStatus] = useState('confirmed');
    return (
        <Wrapper>
            <div className="card">
                <header className={`card-header p-3 headerWithStatus ${status}`}>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <span>
                                <b className="text-white">Dec 12 2021 09:12:22</b>
                            </span>
                            <small className="text-white">
                                Order ID: 121212122
                            </small>
                        </div>
                        <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end">
                            <select onChange={(e) => setStatus(e.target.value)} className="form-select d-inline-block" style={{maxWidth: "200px"}}>
                                <option disabled>Change status</option>
                                <option value='confirmed'>Confirmed</option>
                                <option value='shipped'>Shipped</option>
                                <option value='delivered'>Delivered</option>
                            </select>
                            <IconButton sx={{ml: '1rem', color: 'white'}}><SaveIcon/></IconButton>
                            {/*<Link className="btn btn-success ms-2" to="#">*/}
                            {/*    <i className="fas fa-print"></i>*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </header>
                <div className="card-body">
                    <OrderDetailInfo/>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  .headerWithStatus.confirmed {
    background-color: rgba(255, 0, 0, 1);
    color: crimson;
  }

  .headerWithStatus.shipped {
    background-color: rgba(241, 131, 27, 1);
    color: #f1831b;
  }

  .headerWithStatus.delivered {
    background-color: rgba(0, 128, 0, 1);
    color: green;
  }
`;

export default OrderDetailHeader;