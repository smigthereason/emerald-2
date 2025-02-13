// products.ts
export interface Product {
  discount: number;
  id: string;
  title: string;
  brief: string;
  price: string;
  image: string;
  tag: string;
}

export const products: Product[] = [
  // Tops (12 products) – images: t1-t12.jpg, tag: "tops"
  {
    id: "product1",
    title: "Product 1",
    brief: "Stylish top 1",
    price: "$99",
    image: "src/assets/Images/tops/t1.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product2",
    title: "Product 2",
    brief: "Stylish top 2",
    price: "$99",
    image: "src/assets/Images/tops/t2.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product3",
    title: "Product 3",
    brief: "Stylish top 3",
    price: "$99",
    image: "src/assets/Images/tops/t3.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product4",
    title: "Product 4",
    brief: "Stylish top 4",
    price: "$99",
    image: "src/assets/Images/tops/t4.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product5",
    title: "Product 5",
    brief: "Stylish top 5",
    price: "$99",
    image: "src/assets/Images/tops/t5.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product6",
    title: "Product 6",
    brief: "Stylish top 6",
    price: "$99",
    image: "src/assets/Images/tops/t6.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product7",
    title: "Product 7",
    brief: "Stylish top 7",
    price: "$99",
    image: "src/assets/Images/tops/t7.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product8",
    title: "Product 8",
    brief: "Stylish top 8",
    price: "$99",
    image: "src/assets/Images/tops/t8.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product9",
    title: "Product 9",
    brief: "Stylish top 9",
    price: "$99",
    image: "src/assets/Images/tops/t9.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product10",
    title: "Product 10",
    brief: "Stylish top 10",
    price: "$99",
    image: "src/assets/Images/tops/t10.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product11",
    title: "Product 11",
    brief: "Stylish top 11",
    price: "$99",
    image: "src/assets/Images/tops/t11.jpg",
    discount: 0,
    tag: "tops"
  },
  {
    id: "product12",
    title: "Product 12",
    brief: "Stylish top 12",
    price: "$99",
    image: "src/assets/Images/tops/t12.jpg",
    discount: 0,
    tag: "tops"
  },

  // Skirts (12 products) – images: s1-s12.jpg, tag: "skirts"
  {
    id: "product13",
    title: "Product 13",
    brief: "Elegant skirt 1",
    price: "$99",
    image: "src/assets/Images/skirts/s1.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product14",
    title: "Product 14",
    brief: "Elegant skirt 2",
    price: "$99",
    image: "src/assets/Images/skirts/s2.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product15",
    title: "Product 15",
    brief: "Elegant skirt 3",
    price: "$99",
    image: "src/assets/Images/skirts/s3.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product16",
    title: "Product 16",
    brief: "Elegant skirt 4",
    price: "$99",
    image: "src/assets/Images/skirts/s4.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product17",
    title: "Product 17",
    brief: "Elegant skirt 5",
    price: "$99",
    image: "src/assets/Images/skirts/s5.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product18",
    title: "Product 18",
    brief: "Elegant skirt 6",
    price: "$99",
    image: "src/assets/Images/skirts/s6.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product19",
    title: "Product 19",
    brief: "Elegant skirt 7",
    price: "$99",
    image: "src/assets/Images/skirts/s7.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product20",
    title: "Product 20",
    brief: "Elegant skirt 8",
    price: "$99",
    image: "src/assets/Images/skirts/s8.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product21",
    title: "Product 21",
    brief: "Elegant skirt 9",
    price: "$99",
    image: "src/assets/Images/skirts/s9.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product22",
    title: "Product 22",
    brief: "Elegant skirt 10",
    price: "$99",
    image: "src/assets/Images/skirts/s10.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product23",
    title: "Product 23",
    brief: "Elegant skirt 11",
    price: "$99",
    image: "src/assets/Images/skirts/s11.jpg",
    discount: 0,
    tag: "skirts"
  },
  {
    id: "product24",
    title: "Product 24",
    brief: "Elegant skirt 12",
    price: "$99",
    image: "src/assets/Images/skirts/s12.jpg",
    discount: 0,
    tag: "skirts"
  },

  // Shoes (12 products) – images: h1-h12.jpg, tag: "shoe"
  {
    id: "product25",
    title: "Product 25",
    brief: "Comfortable shoe 1",
    price: "$99",
    image: "src/assets/Images/shoes/h1.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product26",
    title: "Product 26",
    brief: "Comfortable shoe 2",
    price: "$99",
    image: "src/assets/Images/shoes/h2.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product27",
    title: "Product 27",
    brief: "Comfortable shoe 3",
    price: "$99",
    image: "src/assets/Images/shoes/h3.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product28",
    title: "Product 28",
    brief: "Comfortable shoe 4",
    price: "$99",
    image: "src/assets/Images/shoes/h4.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product29",
    title: "Product 29",
    brief: "Comfortable shoe 5",
    price: "$99",
    image: "src/assets/Images/shoes/h5.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product30",
    title: "Product 30",
    brief: "Comfortable shoe 6",
    price: "$99",
    image: "src/assets/Images/shoes/h6.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product31",
    title: "Product 31",
    brief: "Comfortable shoe 7",
    price: "$99",
    image: "src/assets/Images/shoes/h7.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product32",
    title: "Product 32",
    brief: "Comfortable shoe 8",
    price: "$99",
    image: "src/assets/Images/shoes/h8.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product33",
    title: "Product 33",
    brief: "Comfortable shoe 9",
    price: "$99",
    image: "src/assets/Images/shoes/h9.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product34",
    title: "Product 34",
    brief: "Comfortable shoe 10",
    price: "$99",
    image: "src/assets/Images/shoes/h10.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product35",
    title: "Product 35",
    brief: "Comfortable shoe 11",
    price: "$99",
    image: "src/assets/Images/shoes/h11.jpg",
    discount: 0,
    tag: "shoe"
  },
  {
    id: "product36",
    title: "Product 36",
    brief: "Comfortable shoe 12",
    price: "$99",
    image: "src/assets/Images/shoes/h12.jpg",
    discount: 0,
    tag: "shoe"
  },

  // Pants (12 products) – images: p1-p12.jpeg, tag: "pant"
  {
    id: "product37",
    title: "Product 37",
    brief: "Casual pant 1",
    price: "$99",
    image: "src/assets/Images/pants/p1.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product38",
    title: "Product 38",
    brief: "Casual pant 2",
    price: "$99",
    image: "src/assets/Images/pants/p2.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product39",
    title: "Product 39",
    brief: "Casual pant 3",
    price: "$99",
    image: "src/assets/Images/pants/p3.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product40",
    title: "Product 40",
    brief: "Casual pant 4",
    price: "$99",
    image: "src/assets/Images/pants/p4.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product41",
    title: "Product 41",
    brief: "Casual pant 5",
    price: "$99",
    image: "src/assets/Images/pants/p5.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product42",
    title: "Product 42",
    brief: "Casual pant 6",
    price: "$99",
    image: "src/assets/Images/pants/p6.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product43",
    title: "Product 43",
    brief: "Casual pant 7",
    price: "$99",
    image: "src/assets/Images/pants/p7.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product44",
    title: "Product 44",
    brief: "Casual pant 8",
    price: "$99",
    image: "src/assets/Images/pants/p8.jpeg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product45",
    title: "Product 45",
    brief: "Casual pant 9",
    price: "$99",
    image: "src/assets/Images/pants/p9.jpg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product46",
    title: "Product 46",
    brief: "Casual pant 10",
    price: "$99",
    image: "src/assets/Images/pants/p10.jpg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product47",
    title: "Product 47",
    brief: "Casual pant 11",
    price: "$99",
    image: "src/assets/Images/pants/p11.jpg",
    discount: 0,
    tag: "pant"
  },
  {
    id: "product48",
    title: "Product 48",
    brief: "Casual pant 12",
    price: "$99",
    image: "src/assets/Images/pants/p12.jpg",
    discount: 0,
    tag: "pant"
  },

  // Jackets (12 products) – images: j1-j12.jpg, tag: "jacket"
  {
    id: "product49",
    title: "Product 49",
    brief: "Warm jacket 1",
    price: "$99",
    image: "src/assets/Images/jackets/j1.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product50",
    title: "Product 50",
    brief: "Warm jacket 2",
    price: "$99",
    image: "src/assets/Images/jackets/j2.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product51",
    title: "Product 51",
    brief: "Warm jacket 3",
    price: "$99",
    image: "src/assets/Images/jackets/j3.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product52",
    title: "Product 52",
    brief: "Warm jacket 4",
    price: "$99",
    image: "src/assets/Images/jackets/j4.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product53",
    title: "Product 53",
    brief: "Warm jacket 5",
    price: "$99",
    image: "src/assets/Images/jackets/j5.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product54",
    title: "Product 54",
    brief: "Warm jacket 6",
    price: "$99",
    image: "src/assets/Images/jackets/j6.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product55",
    title: "Product 55",
    brief: "Warm jacket 7",
    price: "$99",
    image: "src/assets/Images/jackets/j7.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product56",
    title: "Product 56",
    brief: "Warm jacket 8",
    price: "$99",
    image: "src/assets/Images/jackets/j8.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product57",
    title: "Product 57",
    brief: "Warm jacket 9",
    price: "$99",
    image: "src/assets/Images/jackets/j9.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product58",
    title: "Product 58",
    brief: "Warm jacket 10",
    price: "$99",
    image: "src/assets/Images/jackets/j10.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product59",
    title: "Product 59",
    brief: "Warm jacket 11",
    price: "$99",
    image: "src/assets/Images/jackets/j11.jpg",
    discount: 0,
    tag: "jacket"
  },
  {
    id: "product60",
    title: "Product 60",
    brief: "Warm jacket 12",
    price: "$99",
    image: "src/assets/Images/jackets/j12.jpg",
    discount: 0,
    tag: "jacket"
  },

  // Dresses (12 products) – images: d1-d12.jpg, tag: "dresses"
  {
    id: "product61",
    title: "Product 61",
    brief: "Elegant dress 1",
    price: "$99",
    image: "src/assets/Images/dresses/d1.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product62",
    title: "Product 62",
    brief: "Elegant dress 2",
    price: "$99",
    image: "src/assets/Images/dresses/d2.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product63",
    title: "Product 63",
    brief: "Elegant dress 3",
    price: "$99",
    image: "src/assets/Images/dresses/d3.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product64",
    title: "Product 64",
    brief: "Elegant dress 4",
    price: "$99",
    image: "src/assets/Images/dresses/d4.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product65",
    title: "Product 65",
    brief: "Elegant dress 5",
    price: "$99",
    image: "src/assets/Images/dresses/d5.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product66",
    title: "Product 66",
    brief: "Elegant dress 6",
    price: "$99",
    image: "src/assets/Images/dresses/d6.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product67",
    title: "Product 67",
    brief: "Elegant dress 7",
    price: "$99",
    image: "src/assets/Images/dresses/d7.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product68",
    title: "Product 68",
    brief: "Elegant dress 8",
    price: "$99",
    image: "src/assets/Images/dresses/d8.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product69",
    title: "Product 69",
    brief: "Elegant dress 9",
    price: "$99",
    image: "src/assets/Images/dresses/d9.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product70",
    title: "Product 70",
    brief: "Elegant dress 10",
    price: "$99",
    image: "src/assets/Images/dresses/d10.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product71",
    title: "Product 71",
    brief: "Elegant dress 11",
    price: "$99",
    image: "src/assets/Images/dresses/d11.jpg",
    discount: 0,
    tag: "dresses"
  },
  {
    id: "product72",
    title: "Product 72",
    brief: "Elegant dress 12",
    price: "$99",
    image: "src/assets/Images/dresses/d12.jpg",
    discount: 0,
    tag: "dresses"
  }
];
