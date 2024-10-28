CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role ENUM('admin', 'organisation', 'donar', 'hospital') NOT NULL,
  name VARCHAR(255),
  organisationName VARCHAR(255),
  hospitalName VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  bloodGroup ENUM('O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-') DEFAULT NULL, -- Added blood group
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inventoryType ENUM('in', 'out') NOT NULL,
  bloodGroup ENUM('O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-') NOT NULL,
  quantity INT NOT NULL,
  email VARCHAR(255) NOT NULL,
  organisation INT NOT NULL, -- Foreign key to user table
  hospital INT,              -- Foreign key to user table
  donar INT,                 -- Foreign key to user table
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organisation) REFERENCES users(id),
  FOREIGN KEY (hospital) REFERENCES users(id),
  FOREIGN KEY (donar) REFERENCES users(id)
);
