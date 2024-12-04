import { useParams } from "react-router-dom";
import { useGetoneproductQuery } from "../../Redux/productsApi";
import "./ProductDetails.css";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";
import DetailsThumb from "./DetailsThumb";

import IconButton from "@mui/material/IconButton";
import { Badge, Button, styled} from "@mui/material";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
  },
}));
const ProductDetails = () => {
  // @ts-ignore
  const {selectedProducts , selectedProductId} = useSelector((state) => state.cartt)
  const dispatch = useDispatch()

  const [index , setindex] = useState(0);
  const myRef = useRef(null);
  let {id}= useParams();
const HandleTab = (index) => {
  setindex(index)
  const images = myRef.current.children;
  for(let i=0; i<images.length; i++){
    images[i].className = images[i].className.replace("active", "");
  }
  images[index].className = "active";
}

  const { data, error, isLoading } = useGetoneproductQuery(id)

  const productQuantity = (itemapi) =>{
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemapi.id
    })
    return myProduct.quantity
  }

  if(isLoading){
    return(
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }
if(error){
  return(
    <Box>
      <h1>loadding error</h1>
    </Box>
  )
}
  if(data){
    return (
      <div className="app details-page">
          <div className="details">
            <div className="big-img">
              <img src={data.imageLink[index]} alt=""/>
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>
              {/* <Colors colors={data.colors} /> */}

              <p>{data.description}</p>
              {/* <p>{data.content}</p> */}

              <DetailsThumb images={data.imageLink} tab={HandleTab} myRef={myRef} />
              {/* <button className="cart">Add to cart</button> */}
              {selectedProductId.includes(data.id)?(
            <div  style={{ display: "flex", alignItems: "center" , marginTop: 33 }}>
      
            <IconButton 
            color="primary"
              sx={{ mr:"10px" }}
              aria-label=""
              onClick={() => dispatch(decreaseQuantity(data))}
            >
              <Remove fontSize="small"/>
            </IconButton>
            <StyledBadge badgeContent={productQuantity(data)} color="primary"/>
            <IconButton 
            color="primary"
              sx={{ ml:"10px"}}
              aria-label=""
              onClick={() => dispatch(increaseQuantity(data))}
            >
              <Add fontSize="small"/>
            </IconButton>
          </div>
          ): (
            <Button
           sx={{ textTransform: "capitalize" , p:1 , lineHeight: 1.1}}
           variant="contained"
           color="primary"
           onClick={() => dispatch(addToCart(data))}
         >
         <ShoppingCart sx={{fontSize:"18px" , mr: 1}}/>   Add to cart
         </Button>
         ) }
            </div>
          </div>
        )
    </div>
    )
  }
}
export default ProductDetails; 