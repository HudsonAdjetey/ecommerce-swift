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

type ProductsProps = Product & {
  variants?: Product[];
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
  available: boolean;
};

type VariantsType = {
  id: string;
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
