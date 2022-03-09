import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Toast,
  Popover,
  Button,
  Badge
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AddToCart} from "../store/action/cart.action";
import Menu from "../components/Menu";




function Product() {
  const allProducts = useSelector((store) => store.productState.products);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [products, setProducts] = useState([])
  const [toastTimer, setToastTimer] = useState()
  const [itemQuantity, setitemQuantity] = useState([])
  
  const popover = (item) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Ürün Detayı</Popover.Header>
      <Popover.Body>
        <p><strong>Ürün İsmi:</strong>{item.Name}</p>
        <p><strong>Ürün Açıklaması:</strong>{item.Description}</p>
      </Popover.Body>
    </Popover>
  );

  console.log("PRODUCT AÇILDI")
  const quantity = [];
  for (let index = 0; index < allProducts.length; index++) {
    quantity.push(1); 
  }
  console.log("QUANTİTYY",quantity)
  
  useEffect( () => {
    console.log("PRODUCT USEEFFECT TETİKLENDİ")
    setProducts(allProducts)
    setitemQuantity(quantity)   
  }, [allProducts])
  
  
  
  
  
  console.log("İTEM QUANTİTY", itemQuantity)
  console.log("Products", products);
  const dispatch = useDispatch();
  console.log("PRODUCT SAYISI",products.length)
  
  


  const addToCart = (item,index) => {

    //Daha önceden kalan bildirim varsa onu sıfırladık.
    if (show === true) {
      clearInterval(toastTimer)
    }
    setShow(true);

    const cartItem = {
      id: item.ID,
      name: item.Name,
      price: item.Price,
      quantity: itemQuantity[index],
    };
    setSelectedItem(cartItem);
    
    setToastTimer(setTimeout(function () {
      setShow(false);
    }, 3000));

    dispatch(AddToCart(cartItem));
  };
  const searchProduct = (name) => {
    let newProductList = allProducts.filter(x=> x.Categories.some(c=> c.Name == name));

    console.log("Seçilen category",newProductList)
    setProducts(newProductList)
    
  }
  const decreaseQuantity = (sayi) =>{
    let newArray = [];
    itemQuantity.map((item,index)=>{
      if (sayi == index) {
        newArray.push(itemQuantity[sayi]-1);
      }else{
        newArray.push(itemQuantity[index]);
      }
      
    })
    setitemQuantity(newArray);
    console.log("GÜNCELLENEN",itemQuantity)
  }
  const increaseQuantity = (sayi) =>{
    console.log("ARTTIRMA")
    let newArray = [];
    itemQuantity.map((item,index)=>{
      if (sayi == index) {
        newArray.push(itemQuantity[sayi]+1);
      }else{
        newArray.push(itemQuantity[index]);
      }
      
    })
    setitemQuantity(newArray)
  }
  const toastStyle = {
    position: "absolute",
    left: "1480px",
  };
  const toastHeader = {
    textAlign: "center",
    color: "red",
  };
  const menuStyle = {
    position: "absolute",
    top:"100px"
  };
  // const sdsd = {
  //   display: "flex",
  //   justi
  // }

  return (
    <div>
    <div style={menuStyle}>
        <Menu selectedCat={searchProduct}></Menu>
    </div>
    <Container>      
      <div style={toastStyle}>
        <Toast show={show}>
          <Toast.Header>
            <strong style={toastHeader} className="me-auto">
              Ürününüz Sepete Eklendi
            </strong>
          </Toast.Header>
          <Toast.Body>{selectedItem.name}</Toast.Body>
        </Toast>
      </div>

      <Row  md={3}>
        {products.map((item, index) => {
          return (
            // <li key={index}>
            // 	{item.Name} {item.Price}
            // </li>

            <Col key={index} className="my-3">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{item.Name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.Categories.map((item) => `${item.Name} `)}
                  </Card.Subtitle>
                  <Card.Text
                    className="border-bottom border-dark"
                    style={{ color: "red" }}
                  >
                    {item.Price} TL
                  </Card.Text>

                  <div>
                    <div>
                    <a onClick={() => decreaseQuantity(index)}>
                          <i class="bi bi-dash-square"></i>
                        </a>
                    <Badge bg="primary">
                          {itemQuantity[index]}
                        </Badge>
                        <a onClick={() => increaseQuantity(index)}>
                          <i class="bi bi-plus-square"></i>
                        </a>
                    </div>
                    <OverlayTrigger trigger="click" placement="right" overlay={()=>popover(item)}>
                      <Button variant="success">Ürün Detay</Button>
                    </OverlayTrigger>
                    <Card.Link
                      className="btn btn-warning"
                      onClick={() => addToCart(item,index)}
                    >
                      Sepete Ekle
                    </Card.Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
    </div>
  );
}

export default Product;
