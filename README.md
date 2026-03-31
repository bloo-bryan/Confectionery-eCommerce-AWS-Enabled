# DDAC - Confectionery eCommerce Platform

A full-stack confectionery e-commerce platform built with React and Node.js, powered by AWS cloud services. The platform supports multiple user roles — customers can browse and purchase products, while merchants can manage their storefronts, inventory, and orders.

## Tech Stack

### Frontend
- **React 18** with React Router v6
- **Redux Toolkit** for state management
- **Material-UI (MUI)** + **React Bootstrap** for UI components
- **Styled Components** + **Emotion** for styling
- **Axios** for HTTP requests
- **React Toastify** for notifications

### Backend
- **Node.js** with ES modules
- **Express.js** REST API
- **MySQL** (AWS RDS)
- **Sharp** for image processing (auto-resize to 1080x1080)
- **Multer** for file uploads
- **Nodemailer** for transactional emails
- **Stripe** for payment processing (test mode)

### AWS Services
| Service | Purpose |
|---------|---------|
| **RDS** (MySQL) | Relational database hosting |
| **S3** | Product image storage with presigned URLs |
| **SQS** | Asynchronous email queue processing |
| **X-Ray** | Request tracing and application monitoring |

## Features

### Customer
- Browse and search products with filters (brand, category, price range, shipping)
- Sort products by price
- View detailed product pages with merchant info
- Shopping cart with localStorage persistence
- Order placement and order history tracking
- Featured products section (top 3 best-sellers)

### Merchant
- Product management — create, edit, and delete listings
- Multi-image upload with automatic resizing
- View incoming customer orders
- Update order status
- Merchant dashboard

### Platform
- Custom user registration and login (customer and merchant roles)
- Email notifications on registration via SQS + Nodemailer
- Secure image access through S3 presigned URLs (1-hour expiry)
- AWS X-Ray distributed tracing

## Project Structure

```
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── features/        # Redux Toolkit slices
│   │   ├── utils/           # Helpers, constants, axios config
│   │   └── assets/          # Images and logos
│   ├── public/              # Static assets
│   └── build/               # Production build output
├── server/                  # Express.js backend
│   ├── index.js             # Server entry point and all API routes
│   ├── email-worker.js      # SQS email processing worker
│   ├── email-transporter.js # Nodemailer SMTP config
│   ├── sqs-client.js        # AWS SQS client setup
│   ├── sqs-send.js          # Send messages to SQS
│   ├── sqs-receive.js       # Receive messages from SQS
│   └── .env                 # Environment variables (not committed)
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** (v16+)
- **npm**
- AWS account with RDS, S3, SQS, and X-Ray configured
- MySQL database provisioned on AWS RDS

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bloo-bryan/confectionery-ecommerce-aws-enabled.git
   cd confectionery-ecommerce-aws-enabled
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server/` directory:
   ```env
   aws_access_key_id=<your-aws-access-key>
   aws_secret_access_key=<your-aws-secret-key>
   aws_session_token=<your-aws-session-token>
   aws_account_id=<your-aws-account-id>
   aws_queue_name=<your-sqs-queue-name>
   ```

   Update the database connection settings in `server/index.js` with your RDS endpoint, username, password, and database name.

### Running the Application

**Start the backend server:**
```bash
cd server
npm start
```
The API runs at `http://localhost:8800` (uses nodemon for hot reload).

**Start the frontend dev server:**
```bash
cd client
npm start
```
The app runs at `http://localhost:3000`.

For production, the Express server serves the React build from `client/build/` as static files.

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/all-products` | List all products with images |
| GET | `/all-products/:mid` | List a merchant's products |
| GET | `/single-product/:pid` | Get product details |
| GET | `/product-images/:pid` | Get product images |
| GET | `/featured-products` | Get top 3 best-selling products |
| POST | `/add-product` | Create a new product |
| PUT | `/update-product/:id` | Update a product |
| DELETE | `/remove-product/:pid` | Delete a product and its S3 images |

### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/upload-img` | Upload and resize product images |
| DELETE | `/images/:id` | Delete an image from S3 |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | User login |
| POST | `/register` | User registration (triggers SQS email) |
| POST | `/checkUsername` | Validate username availability |
| POST | `/checkEmail` | Validate email availability |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/all-orders/:mid` | Get merchant's received orders |
| GET | `/single-order/:oid` | Get order details with items |
| POST | `/create-order` | Place a new order |
| PUT | `/update-status/:oid` | Update order status |
| PUT | `/update-quantity/:pid` | Decrement product stock |

### Other
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payment` | Create Stripe payment intent |
| POST | `/sendsqsmsg` | Send a message to SQS |

## Architecture

```
┌────────────┐       ┌────────────────┐       ┌──────────┐
│   React    │──────▶│  Express.js    │──────▶│  AWS RDS │
│  Frontend  │◀──────│   Backend      │◀──────│  (MySQL) │
└────────────┘       └───────┬────────┘       └──────────┘
                             │
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
           ┌──────────┐ ┌────────┐ ┌─────────┐
           │  AWS S3   │ │AWS SQS │ │AWS X-Ray│
           │ (Images)  │ │(Email) │ │(Tracing)│
           └──────────┘ └───┬────┘ └─────────┘
                            ▼
                     ┌─────────────┐
                     │Email Worker │
                     │(Nodemailer) │
                     └─────────────┘
```

## License

This project was built as part of the DDAC (Distributed & Cloud Computing) coursework.
