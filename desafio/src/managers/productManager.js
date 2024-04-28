// Agregamos el módulo de fs
const fs = require("fs");

let products = [];

let pathfile ="./data/products.json";

// Función que agrega productos:
const addProduct = async (product) => {
    //Desestructuramos, ya que es mala práctica usar más de 3 parámetros, creando este const:
    const {title, description, price, thumbnail, code, stock} = product;
    await getProducts();
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    //Tenemos dos capas de control: 1) Que no se repita ningún campo. 2) Que no se repita ningún código.


    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios.");
        return;
    }

    const productExists = products.find(product => product.code === code);
    if (productExists) {
        console.log('El producto con el código ' + code + ' ya existe');
        return;
    }
    products.push(newProduct);

    await fs.promises.writeFile(pathfile, JSON.stringify(products));
}

// Función que nos muestra los productos:
const getProducts = async (limit) => {

    const ProductsJson = await fs.promises.readFile(pathfile, "utf8");

    products = JSON.parse(ProductsJson) || [];

    // Si el limite es undefined, retornar todos los productos, sino, se deben filtrar los mismos:

    if(!limit)  return products;

    return products.slice(0, limit);
    
    // return products;
}

// Función que nos muestra los productos por ID:
const getProductById = async (id) => {
    await getProducts();
    const foundProduct = products.find(product => product.id === id);
    if (!foundProduct) {
        console.log('No se encontró el producto con el id: ' + id );
        return;
    }
    console.log(foundProduct);
    return foundProduct;
};


//Creamos función para editar productos: 
const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const productManager = products.findProductManager(product => product.id === id);
    products[productManager] = {
        ...products[productManager],
        // Se sobreescriben las propiedades que sean dataProduct:
        ...dataProduct
    };

    await fs.promises.writeFile(pathfile, JSON.stringify(products));
};

//Creamos un método deleteProduct y utilizamos el método filter para quitar elementos de un array:
const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter( product => product.id !== id);
    await fs.promises.writeFile(pathfile, JSON.stringify(products));
};

// Exportamos nuestras funciones:
export default {
    addProduct,
    getProductById,
    getProducts,
    updateProduct,
    deleteProduct
}



// Test
// addProduct("Rosa Mosqueta", 
//     "La Rosa Mosqueta es conocida por sus pétalos rosados y su resistencia a las condiciones climáticas variadas.",
//     14.99,
//     "URL de la imagen",
//     "RM001",
//     "50 unidades");
//     addProduct("Rosa Amarilla", 
//     "La Rosa Amarilla es valorada por su durabilidad y resistencia, lo que la convierte en una opción ideal para decorar.",
//     19.99,
//     "URL de la imagen",
//     "RA002",
//     "20 unidades");
//     //Producto con igual código:
//     addProduct("Rosa Roja", 
//     "La Rosa Amarilla es valorada por su durabilidad y resistencia, lo que la convierte en una opción ideal para decorar.",
//     70.99,
//     "URL de la imagen",
//     "RA002",
//     "10 unidades");
//     //Producto sin stock:
//     addProduct("Rosa Lila", 
//     "La Rosa Amarilla es valorada por su durabilidad y resistencia, lo que la convierte en una opción ideal para decorar.",
//     70.99,
//     "URL de la imagen",
//     "RA004"
//     );



// getProducts();

// getProductById(2);

// updateProduct(3, {
//     // Modificamos el titulo y la descripción del producto 3:
//     "title": "Rosa Blanca",
//     "description": "La Rosa Blanca se caracteriza por ser poco común y por su versatilidad a la hora de decorar espacios.",
// });

deleteProduct(2);