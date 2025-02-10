// products.ts
export interface Product {
  discount: number;
  id: string;
  title: string;
  brief: string;
  price: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "product1",
    title: "Product 1",
    brief: "Deep Blue Sea Jeans",
    price: "$99",
    image: "src/assets/Images/p5.jpeg",
    discount: 0
  },
  {
    id: "product2",
    title: "Product 2",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p4.jpeg",
    discount: 0
  },
  {
    id: "product3",
    title: "Product 3",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p1.jpg",
    discount: 0
  },
  {
    id: "product4",
    title: "Product 4",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p2.jpg",
    discount: 0
  },
  {
    id: "product5",
    title: "Product 5",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p12.jpeg",
    discount: 0
  },
  {
    id: "product6",
    title: "Product 6",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p13.jpeg",
    discount: 0
  },
  // Add additional products as needed…
  {
    id: "product7",
    title: "Product 7",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p15.jpg",
    discount: 0
  },
  {
    id: "product8",
    title: "Product 8",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p3.jpg",
    discount: 0
  },
  {
    id: "product9",
    title: "Product 9",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p16.jpg",
    discount: 0
  },
  {
    id: "product10",
    title: "Product 10",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p17.jpg",
    discount: 0
  },
  {
    id: "product11",
    title: "Product 11",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p19.jpg",
    discount: 0
  },
  {
    id: "product12",
    title: "Product 12",
    brief: "A brief title",
    price: "$99",
    image: "src/assets/Images/p20.jpg",
    discount: 0
  },
  // Add additional products as needed…
];
