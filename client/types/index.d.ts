type LinkTypes = {
  title: string;
  path: string;
};

interface NavLinksDataProps {
  [key: string]: {
    title: string;
    items: LinkTypes[];
  };
}

interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
  image: string | StaticImageData;
  totalPrice: number;
  attributes?: {
    // like size, color
    [key: string]: string;
  };
  size?: string | number;
}

interface CartProps {
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  subtotal: number;
  size: string;
  color: string;
  _id: string;
  image: string | StaticImageData;
  coupon: {
    code: string;
    discount: number;
    error?: string;
  };
  image?: StaticImageData | string;
  name?: string;
}
interface CartItemProps {
  items: CartProps[];
  totalPrice: number;
  currency?: string;
  totalItems: number;
  subtotal: number;
  isLoading?: boolean;
  error?: string | null;
}
interface CartState {
  items: CartItem[];
  totalItems: number;
  subTotal: number;
  isLoading: boolean;
  error: string | null;
  currency: string;
  totalPrice: number;
}

interface CartOrder {
  id: string | number;
  sizes?: string;
  activeSize?: string;
  color: string;
  description?: string;
  price: number;
  image: string | StaticImageData;
  category?: string;
  name: string;
  quantity?: number;
  attributes?: {
    [key: string]: string;
  };
  variants?: Product[];
  brand?: string;
  activityType?: string;
  alt?: string;
  availability?: boolean;
  gender?: string;
  totalPrice?: number;
}

// home products
interface ProductListLandingProps {
  src: string | StaticImageData;
  alt: string;
  title: string;
  description?: string;
  price: string;
  category?: string;
  link: string;
}

type Product = {
  id: string | number;
  gender: string;
  name: string;
  brand: string;
  activityType?: string;
  color: string;
  description: string;
  price: number;
  image: string | StaticImageData;
  alt: string;
  availability?: boolean;
  category?: string;
};

type ListItems = ProductType & {
  variants?: undefined;
};

type ProductType = {
  id: string;
  name: string;
  alt?: string;
  colorsAvailable: string[];
  color: string;
  sizesAvailable: string[];
  image: string | StaticImageData;
  price: number;
  category?: string;
  quantity: number;
  activityType?: string;
  brand: string;
  country: string;
  information?: ProdcutDescription;
  gender: string;

  available: boolean;
};

type VariantsType = {
  id: number;
  sizesAvailable: string[];
  color: string;
  image: string | StaticImageData;
  alt: string;
  description?: string;
  available: boolean;
  name: string;
  brand: string;
};

type ProductContainerType = ProductType & {
  variants?: VariantsType[];
};

type ProdcutDescription = {
  id: string;
  title: string;
  content: string;
  refId: string;
  features?: {
    [key: string]: string;
  }[];
  subContent?: {
    [key: string]: string;
  };
};

type ActiveProductType = {
  id: string;
  name: string;
  alt?: string;
  color: string;
  quantity: number;
  size?: string;
  image: string | StaticImageData;
  price: number;
  category?: string;
  total?: number;
  subTotal?: number;
};

interface Variant {
  id?: number;
  variantId: string;
  _id: string;
  attributes: Map<string, string>;
  price: number;
  stock: number;
  sku: string;
  size: string[];
  image: StaticImageData;
}

interface ProductInfoDetails {
  features: Array<{
    header: string;
    description: string;
  }>;
}

type ProductsProps = {
  _id: string;
  name: string;
  typeMain: string;
  availableSizes: string[];
  description: string;
  contentInfo: ProductInfoDetails;
  category: string;
  brand: string;
  tags: string[];
  variants: Variant[];
  subContent?: {
    [key: string]: string;
  };
  size?: string;
};
