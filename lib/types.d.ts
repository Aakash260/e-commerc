type CollectionType={
    id:string,
    title:string,
    description:string,
    image:string;
    products:ProductType[];
    productsId:[string]
}

type ProductType={
    id:string,
    title:string,
    description:string,
    media:string[],
    category:string,
    collections:CollectionType[],
    tags:string[],
    sizes:string[],
    colors:string[],
    price:number,
    expense:number,
}
