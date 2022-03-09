import React,{ useEffect, useState }  from 'react'
import { Row, Col, ListGroup, Tab } from 'react-bootstrap'
import { useSelector } from 'react-redux'



function Menu({selectedCat}) {

     const products = useSelector((store)=>store.productState.products);   
     const [categories, setCategories] = useState([]);

  const sds = [];

  products.map((item, index) => {
    return item.Categories.map((cat) => {
      if (!sds.includes(cat.Name)) {
        sds.push(cat.Name);
      }
    });
  });

  useEffect(() => {
    setCategories(sds);
  }, [products]);

  const searchCat = (catName) => {
    const activeDoc = document.getElementsByClassName('active')
    console.log("SEÇİLEN MENU",document.getElementsByClassName('active'))
    selectedCat(catName);
  }

    
  
     
  return (
    <div>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          
            <Row>
            <p>CATEGORİES</p>
              <Col>
              
                <ListGroup>
                  {
                      categories && categories.map((item,index)=>{
                                return (<ListGroup.Item id={item} onClick={()=>{searchCat(item)}}  action href={`#${index}`}>
                                {item}
                              </ListGroup.Item>)
                              }
                      )
                  }
                </ListGroup>
              </Col>

            </Row>
          </Tab.Container>
    </div>
  )
}

export default Menu