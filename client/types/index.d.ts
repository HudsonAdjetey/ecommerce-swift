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
