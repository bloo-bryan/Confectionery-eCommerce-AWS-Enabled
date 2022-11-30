# DDAC

JavaScript (React + Redux Toolkit) frontend. Node/Express.js AWS backend.

## Get Started

Git clone this repo. Navigate to project 'client' directory. Open terminal and run:

### `npm install`

Frontend dependencies will be installed for you.

### `npm start`

The frontend application will run in localhost server. default http://localhost:3000

Navigate to project 'server' directory and repeat the above commands for backend application. Backend default http://localhost:8800

## Disabled features

- Login/Register -- let's build our custom login/register. We won't be using external service like Auth0
- Checkout -- Stripe API used originally, but disabled for now to avoid bugs

## TODOs
- Login/Register for customer and merchant accounts. Implement userSlice.js to handle user-related state and actions
- Modify store content (add product data in AWS). Currently store uses external API to get product data.
- Modify store filters
- MERCHANTS: Add product management page with create, edit, remove product functionality
- MERCHANTS: View sales page
- BACKEND: Express.js implement routes with AWS features