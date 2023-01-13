import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, fetchProducts, removeProducts} from "../features/sellProductSlice";

// THIS IS A DEMO FOR HOW AWS S3 WORKS -- FEEL FREE TO CHANGE ANYTHING FOR EXPERIMENT
// url: http://localhost:3000/uploader
// NOTE: before running, edit server/index.js line 27-34 with your own AWS access key, secret key, session key (keys will change for every session)

// HOW ADDING IMAGES TO S3 WORKS:
// When user uploads file(s) and enters product title then clicks 'Submit' (refer line 37-45),
// the product title and other product details will be inserted into the 'Product' database table ('/add-product' route)
// then a unique name will be generated for each uploaded image. Then the images will be uploaded to S3 bucket ('/upload-img' route)
// then the inserted ID (from the new 'Product' table row), and image name will be inserted into 'ProductDetail' table

// HOW FETCHING IMAGES FROM S3 WORKS:
// When this page loads, the '/images' route will be called to query all product details with their image names from DB
// Using these image names, the route will access these images from S3 bucket and generate pre-signed URL for each image
// The HTML <img> tag will render the image using the URLs

// HOW DELETING IMAGES FROM S3 WORKS:
// When user clicks 'Delete', the '/images:id' route is called. The ID of the item where 'Delete' was clicked will be used as parameter
// The route will query DB to see if any row exists with the supplied ID
// If exists, the route will get the image name(s) of the target item and delete them from S3
// Then the route will delete related row(s) from 'ProductDetail' table


const S3TestPage = () => {
    const [files, setFiles] = useState([]);     // local state containing currently uploaded files
    const [itemTitle, setItemTitle] = useState(''); // text box content
    const dispatch = useDispatch(); // useDispatch to call functions in sellProductSlice.js
    const {testUploadCount, testProducts} = useSelector((store) => store.sellProduct)   // getting states from sellProductSlice.js

    const addFile = (e) => {
        setFiles(e.target.files);
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for(let file of files) {
            formData.append('images', file) // adding uploaded file(s) to formData object, with the key 'images'
        }
        formData.append('title', itemTitle);
        dispatch(addProduct(formData))  // calling addProduct function of sellProductSlice.js
    }

    // calls fetchProducts function whenever testUploadCount value changes
    useEffect(() => {
        dispatch(fetchProducts());
    }, [testUploadCount]);


    return (
        <main>
            <label>Upload images:
                <input type="file" onChange={addFile} multiple="multiple" accept="image/jpeg, image/png, image/jpg"/>
                <input type="text" onChange={e => setItemTitle(e.target.value)} name="title" placeholder="Product name"/>
                <button onClick={submit} type="submit">Submit</button>
            </label>
            {testProducts.length !== 0 ? testProducts.map((product) => {
                return <div>
                    <img key={product.id} src={product.url} alt={product.image_name}/>
                    <h4>{product.name}</h4>
                    <button onClick={() => dispatch(removeProducts(product.id))}>Delete</button>
                </div>
            }) : false}
        </main>
    )
}

export default S3TestPage;