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

# Appendix
Cloud Infra Architecture: https://www.figma.com/file/EsYqQA0xKqWvBx6WvNwqzz/AWS-Cloud-Architecture-for-DDAC?node-id=0%3A1&t=Etot4GDY3vpLYqHC-1
PowerPoint Slide: https://cloudmails-my.sharepoint.com/:p:/g/personal/tp059479_mail_apu_edu_my/EYpcJbjbtNxOsypjobgpDYYBcQ7gLqDgz4X1z_DSCEJPCw?e=JtUIFo
Flowchart: https://cloud.smartdraw.com/share.aspx/?pubDocShare=264F60E0B26D5505040D433F54452217EF9
