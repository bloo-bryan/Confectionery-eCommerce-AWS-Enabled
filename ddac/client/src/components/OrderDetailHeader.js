import React, {useState} from "react";
import {Link} from "react-router-dom";
import {OrderDetailInfo} from "./index";
import styled from 'styled-components';
import SaveIcon from '@mui/icons-material/Save';
import {IconButton} from "@mui/material";
import dayjs from "dayjs";
import {dateTimeFormat} from "../utils/constants";
import {useDispatch} from "react-redux";
import {updateOrderStatus} from "../features/adminOrderSlice";

const OrderDetailHeader = ({data}) => {
    const [status, setStatus] = useState(data[0].status);
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <div className="card">
                <header className={`card-header p-3 headerWithStatus ${status}`}>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <span>
                                <b className="text-white">{dayjs(data[0].dateAdded).format(dateTimeFormat)}</b>
                            </span>
                            <small className="text-white">
                                Order ID: {data[0].order_id}
                            </small>
                        </div>
                        <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end">
                            <select onChange={(e) => setStatus(e.target.value)} value={status} className="form-select d-inline-block" style={{maxWidth: "200px"}}>
                                <option disabled>Change status</option>
                                <option value='confirmed'>Confirmed</option>
                                <option value='shipped'>Shipped</option>
                                <option value='delivered'>Delivered</option>
                            </select>
                            {/*TODO: ADD TOAST FOR STATUS CHANGE SUCCESS*/}
                            <IconButton onClick={() => dispatch(updateOrderStatus({oid: data[0].order_id, status}))} sx={{ml: '1rem', color: 'white'}}><SaveIcon/></IconButton>
                        </div>
                    </div>
                </header>
                <div className="card-body">
                    <OrderDetailInfo data={data}/>
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