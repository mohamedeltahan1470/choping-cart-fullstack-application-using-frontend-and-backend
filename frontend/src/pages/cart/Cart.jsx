import {
  Box,
  Button,
  Paper,
  styled,
  IconButton,
  Badge,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import "./Cart.css";
import { Add, Delete, Remove} from "@mui/icons-material";
import { useSelector, useDispatch } from 'react-redux'
import {decreaseQuantity, deleteProduct, increaseQuantity } from "../../Redux/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "#fff",
    backgroundColor: "#1976d2"
  },
}));

const Cart = () => {
  // @ts-ignore
  const {selectedProducts} = useSelector((state) => state.cartt)
  const dispatch = useDispatch()

  let subtotal = 0
  return (
    <Box>
     {selectedProducts.map((item) => {
      subtotal += Number(item.price) * Number(item.quantity)
      return(
        <Paper key={item.id} dir="rtl" className="item-container">
        <div className="img-title-parent">
          <img src={item.imageLink[0]} alt="" />
          <p className="product-name">T-shirt</p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ color: "#1976d2" , ml:"10px"}}
            aria-label=""
            onClick={() => dispatch(increaseQuantity(item))}
          >
            <Add />
          </IconButton>
          <StyledBadge badgeContent={item.quantity} color="secondary"/>
          <IconButton
            sx={{ color: "#1976d2", mr:"10px" }}
            aria-label=""
            onClick={() => dispatch(decreaseQuantity(item))}
          >
            <Remove />
          </IconButton>
        </div>
        <div className="price">${Number(item.price) * Number(item.quantity)}</div>
        <Button onClick={() => {
          dispatch(deleteProduct(item))
        }} sx={{ display: {xs: "none", sm: "inline-flex"}}} variant="text" color="error">
          DELETE
        </Button>
        <IconButton onClick={() => {
          dispatch(deleteProduct(item))
        }} sx={{ color: "#ef5350" , display: {xs: "inline-flex", sm: "none"}}}>
          <Delete/>
        </IconButton>
      </Paper>
      )
     })}
      <Paper sx={{width: "200px" , mx: "auto" }}>
        <Typography p={2} variant="h6" align="center">
          Cart Summary
        </Typography>
        <Divider/>
        <Stack sx={{justifyContent: "space-between"}} direction={"row"} p={2} spacing={2}>
          <Typography variant="body1" >subtotal</Typography>
          <Typography variant="body1" >${subtotal}</Typography>
        </Stack>
        <Divider/>
        <Button color="primary" variant="contained" sx={{width: "100%"} }>
          CHECKOUT
        </Button>
      </Paper>
    </Box>
  );
};

export default Cart;
