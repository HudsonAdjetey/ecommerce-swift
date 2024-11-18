export const searchFunctionProduct = (
  searchQuery: string,
  products: ProductContainerType[]
) => {
  const searchGroup = searchQuery.toLowerCase().split(/[ ,._-]+/);
  const listItems: ListItems[] = [];

  if (searchQuery.trim() == "") {
    return products;
  }

  products.forEach((product) => {
    const productKeys = [product.brand, product.name, product.color]
      .join(" ")
      .toLowerCase();

    const productMatch = searchGroup.some((word) => productKeys.includes(word));

    // Add product if it matches the search query
    if (productMatch) {
      listItems.push({ ...product, variants: undefined });
    }

    const variantMatch =
      product.variants &&
      product.variants.filter((variant) => {
        const variantKeys = [variant.brand, variant.name, variant.color]
          .join(" ")
          .toLowerCase();
        return searchGroup.some((word) => variantKeys.includes(word));
      });

    // Add variants if they match the search query
    if (variantMatch && variantMatch.length > 0) {
      variantMatch.forEach((pro) => {
        listItems.push({ ...product, ...pro, variants: undefined });
      });
    }
  });

  // create suggestions

  return listItems.slice(0, 4);
};
