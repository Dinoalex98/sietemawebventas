"use strict";
const dotenv = require("dotenv");
const app = require("./app").default;

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
