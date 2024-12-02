import React, { createContext, useState, useEffect } from 'react';
export const ProductsContext = createContext();

// const initialProducts = [
//     {
//         "id": 107,
//         "name": "Cucumber",
//         "categoryId": 1,
//         "price": 25,
//         "image": "https://media.istockphoto.com/id/91516166/photo/cucumber-slices-on-a-white-background.jpg?s=612x612&w=0&k=20&c=n4R8_HB2qEmTgOU3xlINv1Am2Z_Mt4CuJiITPta58vw=",
//         "description": "Fresh and organic cucumbers perfect for salads and snacks.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 108,
//         "name": "Potato",
//         "categoryId": 1,
//         "price": 20,
//         "image": "https://media.istockphoto.com/id/157430678/photo/three-potatoes.jpg?s=612x612&w=0&k=20&c=qkMoEgcj8ZvYbzDYEJEhbQ57v-nmkHS7e88q8dv7TSA=",
//         "description": "High-quality potatoes for cooking delicious meals.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 109,
//         "name": "Onion",
//         "categoryId": 1,
//         "price": 35,
//         "image": "https://www.jiomart.com/images/product/original/590003515/onion-1-kg-product-images-o590003515-p590003515-1-202408070949.jpg?im=Resize=(420,420)",
//         "description": "Fresh onions with a strong aroma, perfect for seasoning.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 110,
//         "name": "Spinach",
//         "categoryId": 1,
//         "price": 15,
//         "image": "https://media.istockphoto.com/id/1006196472/photo/bunch-of-spinach-leaves-on-isolated-white-background.jpg?s=612x612&w=0&k=20&c=OAIswtUC1aMNDwtMEFIaZv6fSIftsoAV-cgJZSGLJ7A=",
//         "description": "Nutritious and fresh spinach leaves for a healthy diet.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 111,
//         "name": "Broccoli",
//         "categoryId": 1,
//         "price": 60,
//         "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWMq7iWY2hM9m35-txN9XLfjTXcTwwKYtgw&s",
//         "description": "Rich in vitamins and fiber, ideal for various dishes.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 112,
//         "name": "Orange",
//         "categoryId": 2,
//         "price": 70,
//         "image": "https://t4.ftcdn.net/jpg/02/20/02/41/360_F_220024121_lvQqND2X6YcINIlgNwTXcwC5Ws6no0RQ.jpg",
//         "description": "Juicy and sweet oranges packed with Vitamin C.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 113,
//         "name": "Grapes",
//         "categoryId": 2,
//         "price": 90,
//         "image": "https://media.istockphoto.com/id/489520104/photo/green-grape-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=9kg_3pMeBKYnHHjx2JECF61QwzxTikLaQ2w-6A5tOO0=",
//         "description": "Fresh and tasty grapes for snacks or desserts.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 114,
//         "name": "Watermelon",
//         "categoryId": 2,
//         "price": 120,
//         "image": "https://media.istockphoto.com/id/1142119394/photo/whole-and-slices-watermelon-fruit-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=A5XnLyeI_3mwkCNadv-QLU4jzgNux8kUPfIlDvwT0jo=",
//         "description": "Refreshing and juicy watermelon slices, perfect for summer hydration and sweet snacking.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,

//     },
//     {
//         "id": 115,
//         "name": "Pineapple",
//         "categoryId": 2,
//         "price": 150,
//         "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2f9VjghHjJ4USLJx6kgGldITy7Ee1mfwivA&s",
//         "description": "Tropical and sweet pineapple, ideal for snacking, smoothies, or as a garnish in desserts.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,

//     },
//     {
//         "id": 116,
//         "name": "Strawberry",
//         "categoryId": 2,
//         "price": 180,
//         "image": "https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg?cs=srgb&dl=pexels-nietjuh-934055.jpg&fm=jpg",
//         "description": "Deliciously sweet and juicy strawberries, perfect for snacking, desserts, or adding to your favorite salad.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,

//     },
//     {
//         "id": 117,
//         "name": "Pasta",
//         "categoryId": 3,
//         "price": 120,
//         "image": "https://media.istockphoto.com/id/495231784/photo/penne-pasta.jpg?s=612x612&w=0&k=20&c=s6i39tglMyw0sQVsJtZlYSxINgrfoMW8ACg0gS_1tuw=",
//         "description": "High-quality pasta, perfect for creating a variety of savory Italian dishes with rich, flavorful sauces.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 118,
//         "name": "Hot Dog",
//         "categoryId": 3,
//         "price": 100,
//         "image": "https://media.istockphoto.com/id/96777273/photo/evolution.jpg?s=612x612&w=0&k=20&c=h9Fxl8k-n4KEM8GIQpo-lVzlEfd2WXsgxRlAhnyuWMc=",
//         "description": "Classic, savory hot dog sausages, perfect for grilling and pairing with your favorite toppings.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,

//     },
//     {
//         "id": 119,
//         "name": "Fried Chicken",
//         "categoryId": 3,
//         "price": 180,
//         "image": "https://media.istockphoto.com/id/452813985/photo/plate-of-fried-chicken-on-blue-plaid-towel.jpg?s=612x612&w=0&k=20&c=e_03DvZFXhvbMR5eBiflKJ2nnQnoaBnufrT37h6Wf7s=",
//         "description": "Crispy and golden fried chicken, made with a flavorful batter, ideal for lunch or dinner.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     },
//     {
//         "id": 120,
//         "name": "Tacos",
//         "categoryId": 3,
//         "price": 130,
//         "image": "https://media.istockphoto.com/id/459396345/photo/taco.jpg?s=612x612&w=0&k=20&c=_yCtd6OEb2L8xNal4kC1xvm8HoBp8sry6tcBwmxmPHw=",
//         "description": "Delicious and savory tacos filled with your favorite ingredients, perfect for a tasty meal or a gathering.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,

//     },
//     {
//         "id": 121,
//         "name": "Nachos",
//         "categoryId": 3,
//         "price": 140,
//         "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR46pozB6yAyth7QqTP-4Nxzy-UsegGr5LhUg&s",
//         "description": "Crispy tortilla chips, perfect for layering with cheese, salsa, or guacamole for a fun, shareable snack.",
//         "stock": 50,
//         "sales": 500,
//         "status": true,
//     }
// ]


export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    return (
        <ProductsContext.Provider value={{ products, updateProducts: setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};