import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function AddEquipment() {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    serialNumber: '',
    purchaseDate: '',
    status: 'Available',
    assignedTo: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/equipment', formData);
      alert('Equipment added successfully!');
    } catch (error) {
      console.error('There was an error adding the equipment!', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Add Equipment</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter equipment name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formType" className="mt-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            placeholder="Enter equipment type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSerialNumber" className="mt-3">
          <Form.Label>Serial Number</Form.Label>
          <Form.Control
            type="text"
            name="serialNumber"
            placeholder="Enter serial number"
            value={formData.serialNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPurchaseDate" className="mt-3">
          <Form.Label>Purchase Date</Form.Label>
          <Form.Control
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStatus" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Maintenance">Maintenance</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formAssignedTo" className="mt-3">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            name="assignedTo"
            placeholder="Enter the person assigned to"
            value={formData.assignedTo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formLocation" className="mt-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Enter the location"
            value={formData.location}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Add Equipment
        </Button>
      </Form>
    </Container>
  );
}

export default AddEquipment;
