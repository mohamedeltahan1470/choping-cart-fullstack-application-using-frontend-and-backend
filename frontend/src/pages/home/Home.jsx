import { Box } from "@mui/system";
import "./Home.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Badge, Button, Stack, useTheme } from "@mui/material";
import {useGetproductsByNameQuery} from "../../Redux/productsApi"
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, decreaseQuantity, increaseQuantity } from "../../Redux/cartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
  },
}));


const Home = () => {
  const { data, error, isLoading } = useGetproductsByNameQuery('bulbasaur')
  const theme = useTheme();
  // @ts-ignore
  const {selectedProducts , selectedProductId} = useSelector((state) => state.cartt)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

if(data){
  return (
    <Stack direction={"row"} sx={{ flexWrap: "wrap"  , justifyContent: "center"}}>
     {data.map((item , index) =>{
      return(
        <Card className="card" sx={{ maxWidth: 277, mb: 6, mx: 2 }} key={item.id}>
        <CardMedia
          component="img"
          height="277"
          image={item.imageLink[0]}
          alt="Paella dish"
          onClick={() => {
            navigate(`product-details/${item.id}`)
          }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "space-between" }}
          disableSpacing
        >
          {selectedProductId.includes(item.id)?(
            <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
            <IconButton 
            color="primary"
              sx={{ ml:"10px"}}
              aria-label=""
              onClick={() => dispatch(increaseQuantity(item))}
            >
              <Add fontSize="small"/>
            </IconButton>
            <StyledBadge badgeContent={productQuantity(item)} color="primary"/>
            <IconButton 
            color="primary"
              sx={{ mr:"10px" }}
              aria-label=""
              onClick={() => dispatch(decreaseQuantity(item))}
            >
              <Remove fontSize="small"/>
            </IconButton>
          </div>
          ): (
            <Button
           sx={{ textTransform: "capitalize" , p:1 , lineHeight: 1.1}}
           variant="contained"
           color="primary"
           onClick={() => dispatch(addToCart(item))}
         >
         <ShoppingCart sx={{fontSize:"18px" , mr: 1}}/>   Add to cart
         </Button>
         ) }
         
          <Typography
            sx={{ mr: "1px" }}
            variant="body1"
            color={theme.palette.error.light}
          >
          ${item.price}
          </Typography>
        </CardActions>
      </Card>
      )
     })}
    </Stack>
  );
}

if(error){
  return(
    <Box>
      <h1>loadding error</h1>
    </Box>
  )
}
};

export default Home;
