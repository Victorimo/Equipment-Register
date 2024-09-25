import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import '../App.css';

function EquipmentList() {
  const [equipment, setEquipment] = useState([]); 
  const [filteredEquipment, setFilteredEquipment] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [show, setShow] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/equipment');
      setEquipment(result.data);
      setFilteredEquipment(result.data); // Initially, filtered equipment is the same as all equipment
    } catch (error) {
      console.error('There was an error fetching the equipment data!', error);
    }
  };

  const filterEquipment = useCallback(() => {
    if (searchQuery === '') {
      setFilteredEquipment(equipment); 
    } else {
      const filtered = equipment.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEquipment(filtered);
    }
  }, [searchQuery, equipment]);

  useEffect(() => {
    filterEquipment();
  }, [searchQuery, equipment, filterEquipment]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/equipment/${id}`);
      fetchEquipment(); 
    } catch (error) {
      console.error('There was an error deleting the equipment!', error);
    }
  };

  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment);
    setIsEditMode(true);
    setShow(true);
  };

  const handleAdd = () => {
    setCurrentEquipment({
      name: '',
      type: '',
      serialNumber: '',
      purchaseDate: new Date().toISOString().substr(0, 10), 
      status: 'Available',
      assignedTo: '',
      location: '',
      cost: 0, 
    });
    setIsEditMode(false);
    setShow(true);
  };
  

  const handleSave = async () => {
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/equipment/${currentEquipment._id}`, currentEquipment);
      } else {
        await axios.post('http://localhost:5000/api/equipment', currentEquipment);
      }
      setShow(false);
      fetchEquipment();
    } catch (error) {
      console.error('There was an error saving the equipment!', error);
    }
  };

  const handleChange = (e) => {
    setCurrentEquipment({ ...currentEquipment, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Container className="mt-5 flex-grow-1">
        <h1 className="text-center">Equipment Register</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search equipment..."
            aria-label="Search equipment"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <Button variant="primary" className="mb-3" onClick={handleAdd}>
          Add New Equipment
        </Button>
        <Row>
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <Col md={4} key={item._id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <strong>Type:</strong> {item.type}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      <strong>Serial Number:</strong> {item.serialNumber}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Purchase Date:</strong> {new Date(item.purchaseDate).toLocaleDateString()}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Status:</strong> {item.status}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Assigned To:</strong> {item.assignedTo || 'N/A'}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Location:</strong> {item.location || 'N/A'}
                    </ListGroupItem>
                    <ListGroupItem>
                       <strong>Cost:</strong> ${item.cost ? item.cost.toFixed(2) : 'N/A'} 
                    </ListGroupItem>

                  </ListGroup>
                  <Card.Body>
                    <Button variant="warning" className="mr-2" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No equipment found. Click "Add New Equipment" to get started.</p>
            </Col>
          )}
        </Row>

        {/* Modal for Add/Edit Equipment */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditMode ? 'Edit Equipment' : 'Add New Equipment'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter equipment name"
                  value={currentEquipment.name}
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
                  value={currentEquipment.type}
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
                  value={currentEquipment.serialNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPurchaseDate" className="mt-3">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  value={currentEquipment.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formStatus" className="mt-3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={currentEquipment.status}
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
                  value={currentEquipment.assignedTo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLocation" className="mt-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Enter the location"
                  value={currentEquipment.location}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formCost" className="mt-3">
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  name="cost"
                  placeholder="Enter cost"
                  value={currentEquipment.cost}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>

      <footer className="footer mt-auto py-3">
        <Container fluid className="text-center">
          <p>&copy; {new Date().getFullYear()} This website was designed by Victor Orimolusi as part of a project.</p>
          <p>All rights reserved.</p>
        </Container>
      </footer>
    </Container>
  );
}

export default EquipmentList;
