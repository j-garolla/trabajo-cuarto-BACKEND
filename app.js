import express from "express";
// importamos el productManager:
import productManager from "./desafio/productManager";
// importamos el router principal:
import router  from "./desafio/routes/index.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Todas las rutas que tengamos deben comenzar con el prefijo api:
app.use("/api", router);

app.get("/products", async (req, res) => {
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


app.get("/products/:pid", async (req, res) => {
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

app.listen(8080, () => {
    console.log("Escuchando el servidor en el puerto 8080");
})