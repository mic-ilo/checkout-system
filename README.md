# checkout-system

## Project Description
Depaato is a checkout system project that allows a user to effortlessly browse a product list, add items to their cart, and view an order summary computation of items in the cart

## Getting Started
1. Clone the repository: `https://github.com/mic-ilo/checkout-system.git`
2. Install dependencies:  `npm install`
3. Start the application: `npm run dev`

## Dependencies
-  `react": "^18.2.0"`
- `react-dom": "^18.2.0"`
- `react-router-dom": "^6.21.3`
- `tailwindcss": "^3.4.1`

## Project structure
- `frontend/` : frontend-related code
	- `src` : Main source code 
		- `assets`: images for header nav and data images 
		- `components`: React components
		 - `context`: handle shared data within the app
		 - `data`: sample data set ( Added image reference for enhanced product visualization)
		 - `pages`: Different pages of the application

## Design Decisions
- Developed with Vite for faster development server
- Chose React for its component-based architecture
- Implemented Tailwind CSS for styling 
- Separated UseContext into context folder for easier management of all shareable data within the app
- Utilized typescript to structure codes
- Organized pages to reusable components 
- Used local storage to maintain items in cart even after page refresh

## Usage
- User visiting the page main page: `localhost:5173`:
	- User can browse a selection of available product items
	- User can see the product name, picture, and price per item
	- User can select `add to cart` button,  then one item will automatically be push to cart
	- User can increase and decrease the quantity by selecting `+` or `-` button
	- User can manually input the quantity and it will automatically be updated in the cart
	- User can remove the item in cart by selecting `remove` button
	- From header navigation, user can see the quantity of all items in cart reflected at the buttom right of `cart` button
	- User can click the `cart` button on header nav, to be redirected to `localhost:3000/cart
	
- User visiting the cart page: `localhost:5173/cart` 
	- User can view all items added to cart
	- Information per product on cart: User can see the the product name, product photo, price per product, quantity selected, total amount per product
	- User can update the quantity of items in cart by manual input, or by using `+` or `-` button
	- User can remove the item from the cart by clicking the `Remove` button
	- User can see Order summary of all items in cart
		- User can see the sub total which is the total amount of all items in cart
		- User can see Discount which is automatically applied and adjusted based on sub total amount
		- User can the see total amount to be paid based on Sub total minus discount
		- User can click proceed to checkout by selecting `proceed to checkout` button (code not implemented yet )
		- User can click `continue shopping` to return to main path and continue shopping

# Brand Personality
- The color scheme features amber, a warm and radiant color associated with energy 
- A minimalist approach creates a simple, clean, and user-friendly experience, allowing users to focus on products
