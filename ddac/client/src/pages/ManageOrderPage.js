// import Navbar from "../components/Navbar"
import {OrderTable, AdminNavbar, AdminSidebar} from "../components"
import styled from "styled-components";

const ManageOrderPage = () => {
    return (
        <Wrapper>
            <AdminSidebar/>
            <div className="listContainer">
                <AdminNavbar/>
                <OrderTable/>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div` 
  display: flex;
  width: 100%;

  .listContainer {
    flex: 6;
  }
`;

export default ManageOrderPage