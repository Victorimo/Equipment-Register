const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Equipment = require('./models/Equipment'); 

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to DB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });

// const sampleEquipment = [
//   {
//     name: 'Laptop',
//     type: 'Electronics',
//     serialNumber: 'ABC12345',
//     purchaseDate: new Date('2022-01-15'),
//     status: 'Available',
//     assignedTo: 'John Doe',
//     location: 'Office'
//   },
//   {
//     name: 'Projector',
//     type: 'Electronics',
//     serialNumber: 'XYZ67890',
//     purchaseDate: new Date('2021-10-25'),
//     status: 'In Use',
//     assignedTo: 'Jane Smith',
//     location: 'Conference Room'
//   },
//   {
//     name: '3D Printer',
//     type: 'Machinery',
//     serialNumber: '3DP123456',
//     purchaseDate: new Date('2023-05-12'),
//     status: 'Maintenance',
//     assignedTo: '',
//     location: 'Workshop'
//   }
// ];

const seedDatabase = async () => {
  try {
    await Equipment.deleteMany({});
    await Equipment.insertMany(sampleEquipment);
    console.log('Database seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};
