import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

const OrderDetailTable = ({rows}) => {
    // const rows = [
    //     {
    //         id: 1143155,
    //         product: "Acer Nitro 5",
    //         img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    //         customer: "John Smith",
    //         date: "1 March",
    //         amount: 785,
    //         method: "Cash on Delivery",
    //         status: "Approved",
    //     },
    //     {
    //         id: 2235235,
    //         product: "Playstation 5",
    //         img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
    //         customer: "Michael Doe",
    //         date: "1 March",
    //         amount: 900,
    //         method: "Online Payment",
    //         status: "Pending",
    //     },
    //     {
    //         id: 2342353,
    //         product: "Redragon S101",
    //         img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
    //         customer: "John Smith",
    //         date: "1 March",
    //         amount: 35,
    //         method: "Cash on Delivery",
    //         status: "Pending",
    //     },
    //     {
    //         id: 2357741,
    //         product: "Razer Blade 15",
    //         img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
    //         customer: "Jane Smith",
    //         date: "1 March",
    //         amount: 920,
    //         method: "Online",
    //         status: "Approved",
    //     },
    //     {
    //         id: 2342355,
    //         product: "ASUS ROG Strix",
    //         img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
    //         customer: "Harold Carol",
    //         date: "1 March",
    //         amount: 2000,
    //         method: "Online",
    //         status: "Pending",
    //     },
    // ];
    return (
        <Wrapper>
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">Product SKU</TableCell>
                            <TableCell className="tableCell">Name</TableCell>
                            <TableCell className="tableCell">Unit Price (RM)</TableCell>
                            <TableCell className="tableCell">Quantity</TableCell>
                            <TableCell className="tableCell">Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="tableCell">{row.SKU}</TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img src={row.url} alt="" className="image" />
                                        {row.name}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell">{row.price}</TableCell>
                                <TableCell className="tableCell">{row.quantity}</TableCell>
                                <TableCell className="tableCell">{(row.price * row.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className="tableCell"></TableCell>
                            <TableCell className="tableCell"></TableCell>
                            <TableCell className="tableCell"></TableCell>
                            <TableCell className="tableCell" sx={{fontSize: '1rem'}}>Subtotal: <br/>Shipping: <br/>Grand total (RM):</TableCell>
                            <TableCell className="tableCell" sx={{fontSize: '1rem'}}>{rows[0].total.toFixed(2)} <br/>{rows[0].shipping.toFixed(2)} <br/>{(rows[0].total + rows[0].shipping).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  .table .cellWrapper {
    display: flex;
    align-items: center;
  }

  .table .cellWrapper .image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }

  .table .status {
    padding: 5px;
    border-radius: 5px;
  }

  .table .status.Approved {
    color: green;
    background-color: rgba(0, 128, 0, 0.151);
  }

  .table .status.Pending {
    color: goldenrod;
    background-color: rgba(189, 189, 3, 0.103);
  }

`;

export default OrderDetailTable;
