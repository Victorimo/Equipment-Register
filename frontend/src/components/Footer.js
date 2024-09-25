import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <Container fluid className="text-center">
        <p>&copy; {new Date().getFullYear()} This website was designed by Victor Orimolusi as part of a project.</p>
        <p>All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
