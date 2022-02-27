import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router";

import Footer from "./Footer";

import NavBar from "./NavBar";


function Layout() {
  return (
    
    <Container fluid>
      <NavBar />
      <main style={{ minHeight: "25rem", overflow: "auto" }}>

          <Outlet />			
      </main>
      <Footer />
    </Container>
  );
}

export default Layout;
