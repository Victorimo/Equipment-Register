import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';  

function Help() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="mt-5 flex-grow-1">
        <h1>Help & FAQ</h1>
        <p>
          Welcome to the Equipment Register Help page. Here you will find answers to common questions and guides on how to use the application.
        </p>
        <h3>How to Add Equipment</h3>
        <p>
          To add new equipment, click on the "Add New Equipment" button on the home page. Fill in the required fields, including the name, type, serial number, purchase date, status, assigned person, location, and cost. Once you have filled in all the details, click "Save Changes" to add the equipment.
        </p>
        <h3>How to Edit Equipment</h3>
        <p>
          To edit existing equipment, click the "Edit" button next to the equipment you want to modify. Make your changes and click "Save Changes" to update the equipment.
        </p>
        <h3>How to Delete Equipment</h3>
        <p>
          To delete equipment, click the "Delete" button next to the equipment you want to remove. Confirm the deletion, and the equipment will be removed from the list.
        </p>
      </Container>
      <Footer />  
    </div>
  );
}

export default Help;
