// import Navbar from "../components/Navbar"
import {AdminNavbar, AdminSidebar, ProductTable} from "../components"
import styled from "styled-components";

const ManageProductPage = () => {
    return (
        <Wrapper>
            <AdminSidebar/>
            <div className="listContainer">
                <AdminNavbar/>
                <ProductTable/>
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

export default ManageProductPage