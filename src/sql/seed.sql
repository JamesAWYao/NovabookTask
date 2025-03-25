CREATE TABLE Items (
    itemId NVARCHAR (50) PRIMARY KEY,
    cost INTEGER NOT NULL,
    taxRate FLOAT NOT NULL,
);

CREATE TABLE Transactions (
    transactionId INT IDENTITY(1, 1) PRIMARY KEY,
    invoiceId NVARCHAR (50) NOT NULL,
    itemId NVARCHAR (50) NOT NULL,
    dateAdded DATETIME DEFAULT GETDATE(),
);

CREATE TABLE Payments (
    paymentId INT IDENTITY(1, 1) PRIMARY KEY,
    amount INTEGER NOT NULL,
    dateAdded DATETIME DEFAULT GETDATE(),
);
