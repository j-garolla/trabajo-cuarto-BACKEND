import fs from "fs";
import productManager from "./productManager";
import path from "path";

let carts = [];

const pathfile = "./src/data/carts.json"

const getCarts = async () => {
const cartsJson = await fs.promises.readFile(pathfile);
carts = JSON.parse(cartsJson) || [];

return carts;

}

// crear carrito:

const createCart = async () => {
    await getCarts();

    const newCart = {
        id: carts.length +1, 
        products: []
    };

    carts.push(newCart);

   await fs.promises.writeFile(pathfile, JSON.stringify(carts));

    return newCart;

}