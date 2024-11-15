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
