import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, {useEffect, useState} from "react";
import {AdminNavbar, AdminSidebar, ImageItem, Loading} from "../components";
import styled from "styled-components";
import {FormControl, IconButton, ImageList, ImageListItem, Skeleton, TextField} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
    addProduct,
    addProductImages, clearCurrentProduct,
    fetchProductDetails,
    fetchProductImages,
    updateFields, updateProductDetails
} from "../features/adminProductSlice";
import {useDispatch, useSelector} from "react-redux";

const ProductDetailPage = ({ title }) => {
    const [files, setFiles] = useState([]);
    const [uploaded, setUploaded] = useState([]);
    const [uploadedUrl, setUploadedUrl] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const dispatch = useDispatch();
    const {currentProductDetails, currentProductImages, uploading} = useSelector((store) => store.adminProduct)
    const navigate = useNavigate();

    const addFile = (e) => {
        if(title) {
            setFiles(e.target.files);
        } else {
            const newArr = [...uploaded];
            for(let file of e.target.files) {
                newArr.push(file);
                console.log(uploadedUrl)
            }
            setUploaded(newArr);

        }
    }

    const removePreview = (index) => {
        const newUploaded = [...uploaded];
        const newUploadedUrl = [...uploadedUrl];
        newUploaded.splice(index, 1);
        newUploadedUrl.splice(index, 1);
        setUploaded(newUploaded);
        setUploadedUrl(newUploadedUrl)
    }

    const uploadFiles = async() => {
        const formData = new FormData();
        for(let file of files) {
            formData.append('images', file)
        }
        formData.append('pid', id);
        await dispatch(addProductImages(formData));
    }


    const updateField = (name, value) => {
        dispatch(updateFields({name, value}))
    }

    const submit = async (e) => {
        e.preventDefault();
        // TODO: ADD TOAST - UPLOAD AT LEAST 1 IMAGE
        if(title && currentProductImages.length !== 0) {
            await dispatch(updateProductDetails());
            await dispatch(clearCurrentProduct());
            navigate('/admin/products')
        } else if(uploaded.length !== 0) {
            setLoading(true)
            const formData = new FormData();
            for(let file of uploaded) {
                formData.append('images', file)
            }
            await dispatch(addProduct(formData));
            setLoading(false);
            await dispatch(clearCurrentProduct());
            navigate('/admin/products')
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(fetchProductDetails(id));
            await dispatch(fetchProductImages(id));
            setLoading(false);
        }
        if(title) {
            fetchData().catch(console.error);
        }
    }, []);

    useEffect(() => {
        const fetchNewImages = async () => {
            await dispatch(fetchProductImages(id));
        }
        if(files.length > 0 && title) {
            uploadFiles()
                .then(() => {
                    return fetchNewImages()
                })
                .then(() => {})
                .catch((error) => console.error(error))
        } else if(uploaded.length > 0) {
            // uploadFiles().then(() => {}).catch((error) => console.error(error))
            console.log(uploaded)
            const newArr = [];
            for(let item of uploaded) {
                const previewSrc = URL.createObjectURL(item);
                newArr.push(previewSrc);
            }
            setUploadedUrl(newArr);
        }
    }, [files, uploaded]);

    if(loading) {
        return <Loading/>
    }

    return (
        <Wrapper>
            <AdminSidebar />
            <div className="newContainer">
                <AdminNavbar />
                <div className="top">
                    <Link to="/admin/products">
                        <IconButton sx={{mr: '1rem'}}><ArrowBackIcon/></IconButton>
                    </Link>
                    <h1>{title || "Add New Product"}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <ImageList sx={{ width: '100%', height: '100%' }} className='img-container' cols={2} rowHeight={164}>
                        {title ? currentProductImages.map((item) => (
                            <ImageListItem key={item.id} sx={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <ImageItem item={item} title={title}/>
                            </ImageListItem>
                        )) : uploadedUrl.map((item, index) => (
                            <ImageListItem key={index} sx={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <ImageItem item={item} index={index} func={removePreview}/>
                            </ImageListItem>
                        ))}
                        </ImageList>
                    </div>
                    <div className="right">
                        <form onSubmit={submit} >
                            <div className="formInput">
                                <label htmlFor="file">
                                    {uploading ? 'Uploading, please wait...' : 'Image (.jpeg, .png, .jpg):'} <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input disabled={uploading ? "disabled" : undefined} type="file" onChange={addFile} multiple="multiple" accept="image/jpeg, image/png, image/jpg"/>
                            </div>

                            <div className="formInput">
                                <label>Product name</label>
                                <TextField required variant="standard" sx={{width: '100%'}} name="name" value={currentProductDetails.name} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>Brand</label>
                                <TextField required variant="standard" sx={{width: '100%'}} name="brand" value={currentProductDetails.brand} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>SKU</label>
                                <TextField required variant="standard" sx={{width: '100%'}} name="SKU" value={currentProductDetails.SKU} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>Category</label>
                                <TextField required variant="standard" sx={{width: '100%'}} name="category" value={currentProductDetails.category} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>Price</label>
                                <TextField InputProps={{
                                    inputProps: {
                                        type: 'number'
                                    }
                                }} required variant="standard" sx={{width: '100%'}} name="price" value={currentProductDetails.price} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>Description</label>
                                <TextField multiline required maxRows={8} variant="standard" sx={{width: '100%'}} name="description" value={currentProductDetails.description} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>
                            <div className="formInput">
                                <label>Stock quantity</label>
                                <TextField InputProps={{
                                    inputProps: {
                                        type: 'number'
                                    }
                                }} required variant="standard" sx={{width: '100%'}} name="quantity" value={currentProductDetails.quantity} onChange={(e) => updateField(e.target.name, e.target.value)}/>
                            </div>

                            <button type="submit" >{title ? "Edit Item" : "Add Item"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;

  .newContainer {
    flex: 6;
  }

  .newContainer .top, .newContainer .bottom {
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    padding: 10px;
    margin: 20px;
    display: flex;
  }

  .newContainer .top h1, .newContainer .bottom h1 {
    font-size: 1.3rem;
    font-weight: bold;
    color: #999;
    margin-top: 7px;
  }

  .newContainer .top .left, .newContainer .bottom .left {
    flex: 1;
    text-align: center;
  }
  
  .btn {
    position: absolute;
    color: white;
  }

  img:hover {
    opacity: 0.5;
  }
  
  .btn:hover {
    color: crimson;
  }

  .newContainer .top .right, .newContainer .bottom .right {
    flex: 2;
  }

  .newContainer .top .right form, .newContainer .bottom .right form {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: space-around;
  }

  .newContainer .top .right form .formInput, .newContainer .bottom .right form .formInput {
    width: 40%;
  }

  .newContainer .top .right form .formInput label, .newContainer .bottom .right form .formInput label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .newContainer .top .right form .formInput label .icon, .newContainer .bottom .right form .formInput label .icon {
    cursor: pointer;
  }

  .newContainer .top .right form .formInput input, .newContainer .bottom .right form .formInput input {
    width: 100%;
    padding: 5px;
    border: none;
    border-bottom: 1px solid gray;
  }

  .newContainer .top .right form button, .newContainer .bottom .right form button {
    width: 150px;
    padding: 10px;
    border: none;
    background-color: teal;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }

`;

export default ProductDetailPage;
