import { Router } from "express";
// importamos el productManager.js
import productManager from "../src/managers/productManager.js";

const router = Router();

// Cambiamos el app.get por router.get:

router.get("/", async (req, res) => {
    try {

        //Desestructuramos la query que venga con el valor de limit:

        const{ limit } = req.query;
        //Acá aparecen todos los métodos importados:
        const products = await productManager.getProducts(limit);

        //Le decimos al servidor que nos de una respuesta:

        res.status(200).json(products);

    } catch (error) {
        console.log(error);
    }
})


router.get("/:pid", async (req, res) => {
    try {

        //Leemos por parámetros el product id que recibimos:

        const { pid } = req.params; //Todos los parámetros vienen en formato String

        //Determinar y buscar el producto por id:
        //Debemos parsear para pasar el String a número:

        const product = await productManager.getProductById(parseInt(pid));

        //Por defecto manda un 200, pero lo ponemos igual, pero si no está no sucede nada:

        res.status(200).json(product);
        
    } catch (error) {
        console.log(error);
        
    }
})

// Hacemos la ruta del POST:
router.post("/", async(req, res)=> {
    try {
        const product = req.body;
// Le pasamos el product que recibimos por body:
        const newProduct = await productManager.addProduct(product);
        res.status(201).json(newProduct);

    } catch(error) {
        console.log(error);
    }
})

// Endpoint del PUT:
router.put("/:pid", async(req, res)=> {
    try {
        //el product id lo recibiremos de los parámetros:
        const{pid} = req.params;
        const product = req.body;
        const updateProduct = await productManager.updateProduct(pid, product);
        res.status(201).json(newProduct);

    } catch(error) {
        console.log(error);
    }
})

// ruta del DELETE:
router.delete("/:pid", async(req, res)=> {
    try {
        //el product id lo recibiremos de los parámetros:
        const{pid} = req.params;
        
        await productManager.deleteProduct(pid);
// Le avisamos al cliente que se eliminó el producto.
        res.status(201).json(message: "Producto eliminado." );

    } catch(error) {
        console.log(error);
    }
})


export default router;
