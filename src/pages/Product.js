import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Tab,
  Toast,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AddToCart, RemoveFromCart } from "../store/action/cart.action";
import Menu from "../components/Menu";
import { findLastIndex } from "lodash";


function Product() {
  const allProducts = useSelector((store) => store.productState.products);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [products, setProducts] = useState([])
  
  console.log("PRODUCT AÇILDI")
  useEffect(() => {
    console.log("PRODUCT USEEFFECT TETİKLENDİ")
    setProducts(allProducts)
  }, [])
  
  console.log("Products", products);
  const dispatch = useDispatch();


  const addToCart = (item) => {
    setShow(true);

    const cartItem = {
      id: item.ID,
      name: item.Name,
      price: item.Price,
      quantity: 1,
    };
    setSelectedItem(cartItem);
    setTimeout(function () {
      setShow(false);
    }, 3000);

    dispatch(AddToCart(cartItem));
    // dispatch(RemoveFromCart(1));
  };
  const searchProduct = (item) => {
    
    let newProductList = allProducts.filter(x => x.Categories[0].Name == item);
    console.log("Seçilen category",products[1].Categories[0].Name)
    setProducts(newProductList)
    
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
                    <Card.Link className="btn btn-secondary" onClick={""}>
                      Ürün Detay
                    </Card.Link>
                    <Card.Link
                      className="btn btn-warning"
                      onClick={() => addToCart(item)}
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
