import { productsImages } from "@/constants/img.constants";

export const productsDummy: ProductsProps[] = [
  {
    id: 1,
    name: "Big Kid's Dri-Fit",
    brand: "Nike",
    gender: "MALE",
    activityType: "",
    color: "Blue",
    description: "This is the description for Big Kid's Dri-Fit",
    price: 129.97,
    image: productsImages.BigKidDriftBlue,
    alt: "Big Kid's Dri-Fit",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 11,
        name: "Big Kid's Dri-Fit",
        brand: "Nike",
        gender: "UNISEX",
        activityType: "",
        color: "Green",
        description: "This is the description for Big Kid's Dri-Fit",
        price: 129.97,
        image: productsImages.BigKidDriftGreen,
        alt: "Big Kid's Dri-Fit",
        availability: true,
        category: "Wear",
      },
    ],
  },
  {
    id: 2,
    name: "Long Sleeve",
    brand: "Nike",
    gender: "",
    activityType: "",
    color: "White",
    description: "This is the description for Long Sleeve",
    price: 89.97,
    image: productsImages.LongSleeve_White,
    alt: "Long Sleeve",
    availability: true,
    category: "Wear",
  },
  {
    id: 3,
    name: "Hill T-Shirt",
    brand: "Adidas",
    gender: "",
    activityType: "",
    color: "Black",
    description: "This is the description for Hill T-Shirt",
    price: 69.97,
    image: productsImages.HillTshirtBlack,
    alt: "Hill T-Shirt",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 12,
        name: "Hill T-Shirt",
        brand: "Adidas",
        gender: "",
        activityType: "",
        color: "White",
        description: "This is the description for Hill T-Shirt",
        price: 69.97,
        image: productsImages.HillTshirtWhite,
        alt: "Hill T-Shirt",
        availability: true,
        category: "Wear",
      },
    ],
  },
  {
    id: 4,
    name: "Long Horns",
    brand: "Puma",
    gender: "",
    activityType: "",
    color: "Black",
    description: "This is the description for Long Horns",
    price: 149.97,
    image: productsImages.LONG_HORNS_BLACK,
    alt: "Long Horns",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 13,
        name: "Long Horns",
        brand: "Puma",
        gender: "",
        activityType: "",
        color: "White",
        description: "This is the description for Long Horns",
        price: 149.97,
        image: productsImages.LONG_HORNS_BROWN,
        alt: "Long Horns",
        availability: true,
        category: "Wear",
      },
    ],
  },
  {
    id: 5,
    name: "Men's Woven Jacket",
    brand: "Under Armour",
    gender: "",
    activityType: "",
    color: "Black",
    description: "This is the description for Men's Woven Jacket",
    price: 199.97,
    image: productsImages.MEN_WOVEN_JACKET,
    alt: "Men's Woven Jacket",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 14,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
        gender: "",
        activityType: "",
        color: "Gray",
        description: "This is the description for Men's Woven Jacket",
        price: 199.97,
        image: productsImages.MENS_WOVEN_PANTS_Gray,
        alt: "Men's Woven Jacket",
      },
      {
        id: 15,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
        gender: "",
        activityType: "",
        color: "Gray",
        description: "This is the description for Men's Woven Jacket",
        price: 199.97,
        image: productsImages.MENS_WOVEN_PANTS_LIGHTGRAY,
        alt: "Men's Woven Jacket",
        availability: true,
        category: "Wear",
      },
      {
        id: 16,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
        gender: "",
        activityType: "",
        color: "Cream",
        description: "This is the description for Men's Woven Jacket",
        price: 199.97,
        image: productsImages.MENS_WOVEN_PANTS_CREAM,
        alt: "Men's Woven Jacket",
        availability: true,
        category: "Wear",
      },
    ],
  },
  {
    id: 6,
    name: "Men's Woven Pants",
    brand: "Under Armour",
    gender: "",
    activityType: "",
    color: "Gray",
    description: "This is the description for Men's Woven Pants",
    price: 149.97,
    image: productsImages.MENS_WOVEN_PANTS_Gray,
    alt: "Men's Woven Pants",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 17,
        name: "Men's Woven Pants",
        brand: "Under Armour",
        gender: "",
        activityType: "",
        color: "Light Gray",
        description: "This is the description for Men's Woven Pants",
        price: 149.97,
        image: productsImages.MENS_WOVEN_PANTS_LIGHTGRAY,
        alt: "Men's Woven Jacket",
      },
      {
        id: 18,
        name: "Men's Woven Pants",
        brand: "Under Armour",
        gender: "",
        activityType: "",
        color: "Cream",
        description: "This is the description for Men's Woven Pants",
        price: 149.97,
        image: productsImages.MENS_WOVEN_PANTS_CREAM,
        alt: "Men's Woven Pants",
        availability: true,
        category: "Wear",
      },
    ],
  },
  {
    id: 7,
    name: "Women's Pants",
    brand: "Patagonia",
    gender: "",
    activityType: "",
    color: "Pink",
    description: "This is the description for Women's Pants",
    price: 129.97,
    image: productsImages.WOMEN_SHORT_PINK,
    alt: "Women's Pants",
    availability: true,
    category: "Wear",
    variants: [
      {
        id: 19,
        name: "Women's Pants",
        brand: "Patagonia",
        gender: "",
        activityType: "",
        color: "Blue",
        description: "This is the description for Women's Pants",
        price: 129.97,
        image: productsImages.NOCTA_BLUE,
        alt: "Men's Woven Jacket",
      },
    ],
  },
];

export const productsContainer: ProductContainerType[] = [
  {
    id: "1",
    name: "Big Kid's Dri-Fit",
    brand: "Nike",
    alt: "This is the description for Big Kid's Dri-Fit",
    colorsAvailable: ["Blue", "Green"],
    color: "Blue",
    sizesAvailable: ["SM", "XL", "XXL"],
    image: productsImages.BigKidDriftBlue,
    price: 34,
    category: "kids",
    quantity: 34,
    activityType: "asd",
    country: "string",
    available: false,
    variants: [
      {
        id: "1a",
        name: "Big Kid's Dri-Fit",
        brand: "Nike",

        color: "Green",
        sizesAvailable: ["SM", "XL", "L", "M"],
        image: productsImages.BigKidDriftGreen,

        alt: "Big Kid's Dri-Fit",
        available: false,
      },
    ],
  },
  {
    id: "2",
    name: "Long Sleeve",
    brand: "Nike",
    alt: "This is the description for Long Sleeve",
    colorsAvailable: ["White", "Black"],
    color: "Black",
    sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
    image: productsImages.LongSleeve_White,
    price: 34,
    category: "male",
    quantity: 34,
    activityType: "asd",
    country: "string",
    available: false,
    variants: [],
  },
  {
    id: "3",
    name: "Hill T-Shirt",
    brand: "Adidas",
    activityType: "Sport",
    color: "Black",
    colorsAvailable: ["Black", "White"],
    sizesAvailable: ["SM", "XL", "XXL", "L", "M"],
    image: productsImages.HillTshirtBlack,
    price: 69.97,
    category: "women",
    quantity: 34,
    available: true,
    country: "Ghana",
    variants: [
      {
        id: "3a",
        name: "Hill T-Shirt",
        brand: "Adidas",
        color: "White",
        sizesAvailable: ["SM", "XL", "L", "M"],
        image: productsImages.HillTshirtWhite,

        alt: "Hill T-Shirt",
        available: true,
      },
    ],
  },
  {
    id: "4",
    name: "Long Horns",
    brand: "Puma",
    activityType: "",
    color: "Black",
    price: 149.97,
    image: productsImages.LONG_HORNS_BLACK,
    alt: "Long Horns",
    colorsAvailable: ["Black", "White"],
    sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
    category: "",
    quantity: 34,
    available: true,
    country: "Ghana",
    variants: [
      {
        id: "13",
        color: "White",
        description: "This is the description for Long Horns",
        image: productsImages.LONG_HORNS_BROWN,
        alt: "Long Horns",
        sizesAvailable: ["XL", "M"],
        available: true,
        name: "Long Horns",
        brand: "Puma",
      },
    ],
  },
  {
    id: "5",
    name: "Men's Woven Jacket",
    brand: "Under Armour",
    activityType: "",
    color: "Black",
    price: 199.97,
    image: productsImages.MEN_WOVEN_JACKET,
    alt: "Men's Woven Jacket",
    category: "Wear",
    colorsAvailable: ["Black", "White"],
    sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
    quantity: 34,
    available: true,
    country: "Ghana",
    variants: [
      {
        id: "14",
        color: "Gray",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_Gray,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: true,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
      },
      {
        id: "15",
        color: "Light Gray",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_LIGHTGRAY,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: true,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
      },
      {
        id: "16",
        color: "Cream",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_CREAM,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: true,
        name: "Men's Woven Jacket",
        brand: "Under Armour",
      },
    ],
  },
  {
    id: "6",
    name: "Men's Woven Pants",
    brand: "Under Armour",
    activityType: "",
    color: "Gray",
    price: 149.97,
    image: productsImages.MENS_WOVEN_PANTS_Gray,
    alt: "Men's Woven Pants",
    category: "Wear",
    colorsAvailable: ["Black", "White"],
    sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
    quantity: 34,
    available: true,
    country: "Ghana",
    variants: [
      {
        id: "17",
        color: "Light Gray",
        description: "This is the description for Men's Woven Pants",
        image: productsImages.MENS_WOVEN_PANTS_LIGHTGRAY,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: false,
        name: "Men's Woven Pants",
        brand: "Under Armour",
      },
      {
        id: "18",
        color: "Cream",
        description: "This is the description for Men's Woven Pants",
        image: productsImages.MENS_WOVEN_PANTS_CREAM,
        alt: "Men's Woven Pants",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: false,
        name: "Men's Woven Pants",
        brand: "Under Armour",
      },
    ],
  },
  {
    id: "7",
    name: "Women's Pants",
    brand: "Patagonia",
    activityType: "",
    color: "Pink",
    price: 199.97,
    image: productsImages.WOMEN_SHORT_PINK,
    alt: "Women's Pants",
    category: "Wear",
    colorsAvailable: ["Pink", "Blue"],
    sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
    quantity: 34,
    available: true,
    country: "Ghana",
    variants: [
      {
        id: "14",
        color: "Blue",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_Gray,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: false,
        name: "Women's Pants",
        brand: "Patagonia",
      },
      {
        id: "15",
        color: "Gray",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_LIGHTGRAY,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: true,
        name: "Women's Pants",
        brand: "Patagonia",
      },
      {
        id: "16",
        color: "Cream",
        description: "This is the description for Men's Woven Jacket",
        image: productsImages.MENS_WOVEN_PANTS_CREAM,
        alt: "Men's Woven Jacket",
        sizesAvailable: ["SM", "XL", "XXL", "XXXL"],
        available: true,
        name: "Women's Pants",
        brand: "Patagonia",
      },
    ],
  },

  {
    id: "8",
    name: "Nike Air Pegasus",
    brand: "Nike",
    activityType: "Running",
    color: "Black",
    colorsAvailable: ["Black", "Green", "Pink"],
    sizesAvailable: ["7", "8", "9", "10", "11"],
    image: productsImages.NIKE_AIR_PEGASUS_BLACK_Men,
    price: 129.99,
    category: "footwear",
    quantity: 50,
    available: true,
    country: "Vietnam",
    variants: [
      {
        id: "8a",
        color: "Green",
        image: productsImages.NIKE_AIR_PEGASUS_GREEN,
        alt: "Nike Air Pegasus Green",
        sizesAvailable: ["7", "8", "9", "10"],
        available: true,
        name: "Nike Air Pegasus",
        brand: "Nike",
      },
      {
        id: "8b",
        color: "Pink",
        image: productsImages.NIKE_AIR_PEGASUS_PINK,
        alt: "Nike Air Pegasus Pink",
        sizesAvailable: ["7", "8", "9", "10"],
        available: false,
        name: "Nike Air Pegasus",
        brand: "Nike",
      },
    ],
  },
  {
    id: "9",
    name: "Patagonia Pullover",
    brand: "Patagonia",
    activityType: "Casual",
    color: "Black",
    colorsAvailable: ["Black"],
    sizesAvailable: ["S", "M", "L"],
    image: productsImages.PULLOVER_BLACK,
    price: 85.0,
    category: "outerwear",
    quantity: 20,
    available: true,
    country: "China",
    variants: [],
  },
  {
    id: "10",
    name: "VaporFly Next",
    brand: "Nike",
    activityType: "Running",
    color: "Blue",
    colorsAvailable: ["Blue", "Green", "Pink"],
    sizesAvailable: ["8", "9", "10", "11"],
    image: productsImages.VAPORFLY_MEN_BLUE,
    price: 250.0,
    category: "footwear",
    quantity: 15,
    available: true,
    country: "Japan",
    variants: [
      {
        id: "10a",
        color: "Green",
        image: productsImages.VAPORFLY_WOMEN_GREEN,
        alt: "VaporFly Next Green",
        sizesAvailable: ["8", "9", "10", "12"],
        available: true,
        name: "VaporFly Next",
        brand: "Nike",
      },
      {
        id: "10b",
        color: "Pink",
        image: productsImages.VAPORFLY_WOMEN_PINK,
        alt: "VaporFly Next Pink",
        sizesAvailable: ["8", "9", "10"],
        available: false,
        name: "VaporFly Next",
        brand: "Nike",
      },
    ],
  },
  {
    id: "11",
    name: "Women's VaporFly Next",
    brand: "Nike",
    activityType: "Running",
    color: "Green",
    colorsAvailable: ["Green", "Pink"],
    sizesAvailable: ["6", "7", "8", "9"],
    image: productsImages.VAPORFLY_WOMEN_GREEN,
    price: 240.0,
    category: "footwear",
    quantity: 25,
    available: true,
    country: "USA",
    variants: [
      {
        id: "11a",
        color: "Pink",
        image: productsImages.VAPORFLY_WOMEN_PINK,
        alt: "Women's VaporFly Next Pink",
        sizesAvailable: ["6", "7", "8", "9"],
        available: true,
        name: "Women's VaporFly Next",
        brand: "Nike",
      },
    ],
  },
  {
    id: "12",
    name: "Men's Woven Jacket",
    brand: "Nike",
    activityType: "Casual",
    color: "Gray",
    colorsAvailable: ["Gray", "Black"],
    sizesAvailable: ["M", "L", "XL"],
    image: productsImages.MEN_WOVEN_JACKET,
    price: 98.0,
    category: "outerwear",
    quantity: 40,
    available: true,
    country: "China",
    variants: [
      {
        id: "12a",
        color: "Black",
        image: productsImages.MEN_WOVEN_JACKET1,
        alt: "Men's Woven Jacket Black",
        sizesAvailable: ["M", "L", "XL"],
        available: true,
        name: "Men's Woven Jacket",
        brand: "Nike",
      },
      {
        id: "12b",
        color: "Gray",
        image: productsImages.MEN_WOVEN_JACKET2,
        alt: "Men's Woven Jacket Gray",
        sizesAvailable: ["M", "L", "XL"],
        available: false,
        name: "Men's Woven Jacket",
        brand: "Nike",
      },
    ],
  },
  {
    id: "13",
    name: "Women's Short",
    brand: "Adidas",
    activityType: "Training",
    color: "Blue",
    colorsAvailable: ["Blue", "Green", "Pink"],
    sizesAvailable: ["XS", "S", "M"],
    image: productsImages.WOMEN_SHORT_BLUE,
    price: 30.0,
    category: "shorts",
    quantity: 60,
    available: true,
    country: "Vietnam",
    variants: [
      {
        id: "13a",
        color: "Green",
        image: productsImages.WOMEN_SHORT_GREEN,
        alt: "Women's Short Green",
        sizesAvailable: ["XS", "S", "M"],
        available: true,
        name: "Women's Short",
        brand: "Adidas",
      },
      {
        id: "13b",
        color: "Pink",
        image: productsImages.WOMEN_SHORT_PINK,
        alt: "Women's Short Pink",
        sizesAvailable: ["XS", "S", "M"],
        available: false,
        name: "Women's Short",
        brand: "Adidas",
      },
    ],
  },
  {
    id: "14",
    name: "Long Sleeve Tee",
    brand: "Under Armour",
    activityType: "Training",
    color: "White",
    colorsAvailable: ["White", "Gray"],
    sizesAvailable: ["S", "M", "L", "XL"],
    image: productsImages.LongSleeve_White,
    price: 45.0,
    category: "tops",
    quantity: 100,
    available: true,
    country: "Bangladesh",
    variants: [
      {
        id: "14a",
        color: "Gray",
        image: productsImages.LongSleeve_White,
        alt: "Long Sleeve Tee Gray",
        sizesAvailable: ["S", "M", "L", "XL"],
        available: true,
        name: "Long Sleeve Tee",
        brand: "Under Armour",
      },
    ],
  },
  {
    id: "15",
    name: "Hi Shoe",
    brand: "Vans",
    activityType: "Casual",
    color: "Black",
    colorsAvailable: ["Black", "Blue"],
    sizesAvailable: ["8", "9", "10", "11"],
    image: productsImages.HI_SHOE_BLACK,
    price: 65.0,
    category: "footwear",
    quantity: 85,
    available: true,
    country: "USA",
    variants: [
      {
        id: "15a",
        color: "Blue",
        image: productsImages.HI_SHOE_BLUE,
        alt: "Hi Shoe Blue",
        sizesAvailable: ["8", "9", "10"],
        available: true,
        name: "Hi Shoe",
        brand: "Vans",
      },
    ],
  },
  {
    id: "16",
    name: "Skool Black",
    brand: "Vans",
    activityType: "Casual",
    color: "Black",
    colorsAvailable: ["Black"],
    sizesAvailable: ["8", "9", "10", "11"],
    image: productsImages.SKOOL_BLACK,
    price: 55.0,
    category: "footwear",
    quantity: 150,
    available: true,
    country: "Vietnam",
    variants: [],
  },
  {
    id: "17",
    name: "Snap Hat",
    brand: "New Era",
    activityType: "Casual",
    color: "Black",
    colorsAvailable: ["Black"],
    sizesAvailable: ["One Size"],
    image: productsImages.SNAP_HAT,
    price: 28.0,
    category: "accessories",
    quantity: 200,
    available: true,
    country: "China",
    variants: [],
  },
];

export const informationProducts: ProdcutDescription[] = [
  {
    id: "11a",
    title: "Dri-Fit",
    refId: "1",
    content:
      "he Dri-FIT Nike is designed for active kids who need to stay comfortable and dry during their adventures. Whether they're on the field, in the gym, or just hanging out, this top combines style and performance.",
    features: [
      {
        header: "Dri-FIT Technology",
        description:
          "This innovative fabric wicks away moisture, keeping kids dry even during the most intense activities. Say goodbye to sweaty shirts!",
      },
      {
        header: "Lightweight and Breathable",
        description:
          "The breathable material allows for optimal airflow, making it perfect for layering or wearing on its own. Kids can move freely without feeling restricted.",
      },
      {
        header: "Stylish Design",
        description:
          "With vibrant colors and the iconic Nike logo, this long sleeve shirt is as fashionable as it is functional. It's perfect for both sports and casual wear.",
      },
      {
        header: "Durable Construction",
        description:
          "Made to withstand active play, the high-quality fabric ensures that this shirt can handle whatever kids throw at it—literally!",
      },
      {
        header: "Versatile Wear",
        description:
          "Ideal for school, sports practice, or just hanging out with friends, the Dri-Fit Long Sleeve is a versatile piece that fits seamlessly into any kid's wardrobe.",
      },
    ],
  },
  {
    id: "11b",
    refId: "2",
    title: "Puma Long Sleeve",
    content:
      "The Long Sleeve Puma top  is perfect for those who want to look good while staying active. Combining functionality with a sporty aesthetic, this shirt is designed for the young athlete.",
    features: [
      {
        header: "Moisture-Wicking Fabric",
        description:
          "Crafted with moisture-wicking technology, this shirt keeps kids dry and comfortable during any activity. Whether they're running, jumping, or playing, they'll stay cool.",
      },
      {
        header: "Stay Cool and Comfortable",
        description:
          "Crafted with moisture-wicking technology, this shirt keeps kids dry and comfortable during any activity. Whether they're running, jumping, or playing, they'll stay cool.",
      },
      {
        header: "Comfortable Fit",
        description:
          "The relaxed fit provides ease of movement, allowing kids to play without any restrictions. It's ideal for everything from sports practice to everyday wea",
      },
      {
        header: "Quality Craftsmanship",
        description:
          "Constructed with durable materials, this shirt is designed to withstand the rigors of play. Parents can trust that it will last through all kinds of adventures",
      },
      {
        header: "Perfect for Layering",
        description:
          "This long sleeve top is perfect for layering during cooler weather, making it a versatile piece for any wardrobe. It pairs well with shorts, leggings, or joggers for a complete look.",
      },
    ],
    subContent: {
      title: "Performance and Style Combined",
      desc: "Both the Big Kids Dri-FIT Nike Long Sleeve and Long Sleeve Puma are fantastic options that combine comfort, style, and performance for active youngsters",
    },
  },
  {
    id: "11c",
    title: "Nike Air Zoom",
    refId: "3",
    content:
      "The Air Zoom Puma top is perfect for those who want to look good while staying active. Combining functionality with a sporty aesthetic, this shirt is designed for the young athlete.",
    features: [
      {
        header: "Moisture-Wicking Fabric",
        description:
          "Crafted with moisture-wicking technology, this shirt keeps kids dry and comfortable during any activity. Whether they're running, jumping, or playing, they'll stay cool.",
      },
      {
        header: "Stay Cool and Comfortable",
        description:
          "Crafted with moisture-wicking technology, this shirt keeps kids dry and comfortable during any activity. Whether they're running, jumping, or playing, they'll stay cool.",
      },
      {
        header: "Comfortable Fit",
        description:
          "The relaxed fit provides ease of movement, allowing kids to play without any restrictions. It's ideal for everything from sports practice to everyday wear.",
      },
      {
        header: "Quality Craftsmanship",
        description:
          "Constructed with durable materials, this shirt is designed to withstand the rigors of play. Parents can trust that it will last through all kinds of adventures",
      },
    ],
  },
  {
    id: "11c",
    refId: "10",
    title: "VaporFly Next",
    content:
      "The LeBron Nike 16 Low is a masterpiece that perfectly marries cutting-edge technology with a stylish, performance-driven design. Crafted for the athlete who demands the best, these sneakers are engineered to elevate your game on and off the court.",
    features: [
      {
        header: "LightWeight",
        description:
          "The low-cut design offers enhanced mobility and breathability, allowing for quick cuts and agile movements. You'll feel light on your feet without sacrificing support.",
      },
      {
        header: "Responsive Cushioning",
        description:
          "Equipped with Nike's innovative Air Zoom technology, the LeBron 16 Low delivers exceptional cushioning and responsiveness. Every step is cushioned, providing the comfort you need during intense gameplay.",
      },
      {
        header: "Dynamic Traction",
        description:
          "The outsole is designed with a multidirectional traction pattern, providing grip and stability on various surfaces. Whether you're on the hardwood or the street, these sneakers will keep you grounded.",
      },
      {
        header: "Signature Style",
        description:
          "With bold colorways and the iconic LeBron logo, the Nike 16 Low makes a statement. It's a sneaker that transitions seamlessly from court to casual wear, making it a versatile addition to any wardrobe.",
      },
    ],
  },
];

/* 
### Big Kids Dri-FIT Nike Long Sleeve

**Stay Cool and Comfortable**

The Big Kids Dri-FIT Nike Long Sleeve is designed for active kids who need to stay comfortable and dry during their adventures. Whether they're on the field, in the gym, or just hanging out, this top combines style and performance.

**Key Features**

**Dri-FIT Technology:**
This innovative fabric wicks away moisture, keeping kids dry even during the most intense activities. Say goodbye to sweaty shirts!

**Lightweight and Breathable:**
The breathable material allows for optimal airflow, making it perfect for layering or wearing on its own. Kids can move freely without feeling restricted.

**Stylish Design:**
With vibrant colors and the iconic Nike logo, this long sleeve shirt is as fashionable as it is functional. It’s perfect for both sports and casual wear.

**Durable Construction:**
Made to withstand active play, the high-quality fabric ensures that this shirt can handle whatever kids throw at it—literally!

**Versatile Wear:**
Ideal for school, sports practice, or just hanging out with friends, the Dri-FIT Long Sleeve is a versatile piece that fits seamlessly into any kid's wardrobe.

---

### Long Sleeve Puma

**Performance Meets Style**

The Long Sleeve Puma top for kids is perfect for those who want to look good while staying active. Combining functionality with a sporty aesthetic, this shirt is designed for the young athlete.

**Key Features**

**Moisture-Wicking Fabric:**
Crafted with moisture-wicking technology, this shirt keeps kids dry and comfortable during any activity. Whether they’re running, jumping, or playing, they’ll stay cool.

**Comfortable Fit:**
The relaxed fit provides ease of movement, allowing kids to play without any restrictions. It’s ideal for everything from sports practice to everyday wear.

**Bold Puma Branding:**
With a striking Puma logo, this long sleeve shirt makes a statement. Kids will love the sporty look and feel, making it a go-to choice for any occasion.

**Quality Craftsmanship:**
Constructed with durable materials, this shirt is designed to withstand the rigors of play. Parents can trust that it will last through all kinds of adventures.

**Perfect for Layering:**
This long sleeve top is perfect for layering during cooler weather, making it a versatile piece for any wardrobe. It pairs well with shorts, leggings, or joggers for a complete look.

---

Both the Big Kids Dri-FIT Nike Long Sleeve and Long Sleeve Puma are fantastic options that combine comfort, style, and performance for active youngsters!

*/
