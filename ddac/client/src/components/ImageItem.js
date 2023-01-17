import IconButton from "@mui/material/IconButton";
import * as React from "react";
import {useDispatch} from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {fetchProductImages, removeProductImage} from "../features/adminProductSlice";

const ImageItem = ({item, title, index, func}) => {
    const dispatch = useDispatch();

    const deleteImage = async () => {
        if(title) {
            await dispatch(removeProductImage(item.id));
            await dispatch(fetchProductImages(item.product_id));
        } else {
            func(index);
        }
    }

    return (
        <>
            <img
                src={title ? item.url : item}
                alt={title ? item.image_name : index}
                loading="lazy"
                width='100%'
                height='100%'
            />
            <IconButton className="btn" onClick={deleteImage}><DeleteForeverIcon/></IconButton>
        </>
    )
}

export default ImageItem;