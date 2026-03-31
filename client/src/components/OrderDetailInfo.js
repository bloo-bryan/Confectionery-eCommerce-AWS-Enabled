import React from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';

const OrderDetailInfo = ({data}) => {
    return (
        <div className="row">
            <div className="col-md-6 col-lg-4">
                <article className="align-items-start" style={{display: 'inline-flex', alignItems: 'center', padding: '5px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'lightgreen', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <PersonIcon/>
                        </div>
                    </div>
                    <div className="text">
                        <h6 className="mb-1">Customer</h6>
                        <p className="mb-1">
                            {data[0].custName} <br/>
                            @{data[0].username}
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="align-items-start" style={{display: 'inline-flex', alignItems: 'center', padding: '5px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'lightgreen', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <LocalShippingIcon/>
                        </div>
                    </div>
                    <div className="text">
                        <h6 className="mb-1">Order info</h6>
                        <p className="mb-1">
                            Shipping: {data[0].state} <br/> Payment method: Card
                        </p>
                    </div>
                </article>
            </div>
            <div className="col-md-6 col-lg-4">
                <article className="align-items-start" style={{display: 'inline-flex', alignItems: 'center', padding: '5px'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'lightgreen', marginRight: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <LocationOnIcon/>
                        </div>
                    </div>
                    <div className="text">
                        <h6 className="mb-1">Deliver to</h6>
                        <p className="mb-1">
                            {data[0].address}
                        </p>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default OrderDetailInfo;