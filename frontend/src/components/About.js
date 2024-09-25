import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';  

function About() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="mt-5 flex-grow-1">
        <h1>About Equipment Register</h1>
        <p>
          This website serves as a tool to manage and track various equipment within an organization.
        </p>
        <p>
          The project demonstrates the implementation of a full-stack application, using React for the frontend and NOde.js with MongoDB for the backend.
        </p>
      </Container>
      <Footer />  
    </div>
  );
}

export default About;
