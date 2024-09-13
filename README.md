# DynaTheme Backend

Welcome to the **DynaTheme Backend**, the API engine powering **DynaTheme**, an open-source CMS that provides full dynamic control over website themes and styling. This backend enables developers to offer their clients the flexibility to customize and manage design elements directly via API, bringing dynamic and personalized experiences to any web platform.

## Features

- **Dynamic Styling API**: Users can control the look and feel of various components (buttons, headers, etc.) dynamically, including colors, fonts, animations, and hover effects.
- **Preview Before Save**: Clients can view live previews of their changes before saving.
- **Real-Time Updates**: Once saved, changes are instantly reflected on the live website.
- **Built with Node.js & Express**: Fast, scalable, and secure backend designed to handle a high volume of requests.
- **MongoDB Integration**: Stores all user customizations and styling preferences securely.
- **Easy-to-Integrate APIs**: Developers can integrate DynaTheme with any frontend (React, Next.js, Vue, etc.) through simple, well-documented APIs.

## Installation

### Requirements

- Node.js >= 14.x
- MongoDB >= 4.x

### Steps to Install

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/DynaTheme-Backend.git
    cd DynaTheme-Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following configuration:
    ```bash
    MONGODB_URI=mongodb://localhost:27017/dynatheme
    PORT=8080
    ```

4. Run the server:
    ```bash
    npm run server
    ```

The backend will be running on `http://localhost:8080`.

## API Documentation

### 1. Save Style

**Endpoint**: `/api/styles/save`  
**Method**: `POST`

#### Request Body:

```json
{
    "userId": "12345",
    "component": "button",
    "styles": {
        "backgroundColor": "#FF5733",
        "fontSize": "16px"
    }
}
```

### Response:
```json
{
    "message": "Style saved successfully!"
}
```
### 2. Get Styles
**Endpoint**: `/api/styles/:userId`
**Method**: `GET`

### Response:
```json
[
    {
        "userId": "12345",
        "component": "button",
        "styles": {
            "backgroundColor": "#FF5733",
            "fontSize": "16px"
        }
    },
    {
        "userId": "12345",
        "component": "header",
        "styles": {
            "fontSize": "32px",
            "color": "#000"
        }
    }
]
```

### Project Structure

```
backend/
│
├── models/
│   └── Style.js         // Mongoose model to save styles
├── routes/
│   └── styleRoutes.js   // API routes to manage styles
├── controllers/
│   └── styleController.js // Controller functions to save and retrieve styles
├── server.js           // Express server setup
└── config/
    └── db.js           // MongoDB connection
```
### Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new Pull Request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Contact
For any questions or issues, please reach out to Usama Aamir.


---
- **README.md**: Includes installation instructions, API documentation, project structure, and contribution guidelines.
