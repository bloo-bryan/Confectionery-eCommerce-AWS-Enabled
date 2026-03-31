// import Navbar from "../components/Navbar"
import {AdminNavbar, AdminSidebar, Loading, ProductTable} from "../components"
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {clearCurrentProduct} from "../features/adminProductSlice";
import {useEffect} from "react";

const ManageProductPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCurrentProduct())
    }, []);


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