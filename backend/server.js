require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// FRONTEND_URL can be a single origin or a comma-separated list
// (handy for previewing both a production and a Vercel preview URL).
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin/non-browser requests (no Origin header) and any
    // explicitly whitelisted origin. If FRONTEND_URL isn't set at all,
    // fall back to allowing all origins so local setup isn't blocked.
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "10mb" }));

const databaseUrl = new URL(process.env.DATABASE_URL);
databaseUrl.searchParams.delete("sslmode");

const db = new Pool({
  connectionString: databaseUrl.toString(),
  ssl: {
    rejectUnauthorized: false,
  },
});

const ensureDatabaseSchema = async () => {
  const requiredTables = ["admin", "profiles", "products", "cart", "orders", "order_details"];

  const result = await db.query(
    `SELECT table_name
     FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name = ANY($1)`,
    [requiredTables]
  );

  const foundTables = new Set(result.rows.map((row) => row.table_name));
  const missingTables = requiredTables.filter((table) => !foundTables.has(table));

  if (missingTables.length > 0) {
    throw new Error(
      `Missing required database tables: ${missingTables.join(", ")}. Create the schema in PostgreSQL first.`
    );
  }

  console.log("DB connected and required tables are present");
};

const dbReady = db.connect()
  .then(async () => {
    await ensureDatabaseSchema();
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    throw error;
  });

app.use(async (req, res, next) => {
  try {
    await dbReady;
    next();
  } catch (error) {
    res.status(503).json({ success: false, message: "Database is unavailable" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { first_name, last_name, email, password, address, city, photoData, photoMime } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  try {
    await db.query(
      "INSERT INTO profiles (first_name, last_name, email, password, address, city, photo_data, photo_mime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [first_name, last_name, email.toLowerCase(), password, address, city, photoData ? Buffer.from(photoData, "base64") : null, photoMime || null]
    );
    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ success: false, message: "An account with this email already exists" });
    }
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/health", async (req, res) => {
    try {
        await db.query("SELECT 1");

        res.json({
            success: true,
            database: "connected"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            database: "disconnected"
        });
    }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const result = await db.query(
      `SELECT pf_id, first_name, last_name, email, address, city, password,
        CASE WHEN photo_data IS NOT NULL
          THEN 'data:' || photo_mime || ';base64,' || encode(photo_data, 'base64')
          ELSE NULL END AS photo
       FROM profiles WHERE email = $1`,
      [email.toLowerCase()]
    );
    const user = result.rows[0];
    const passwordMatches = user ? user.password === password : false;
    if (passwordMatches) {
      delete user.password;
      res.json({ success: true, message: "Login successful", user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch(err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.post("/api/alogin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  try {
    const result = await db.query(
      "SELECT ad_id, email, password FROM admin WHERE email = $1",
      [email.toLowerCase()]
    );
    const admin = result.rows[0];
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isValidPassword = admin.password === password;
    if (isValidPassword) {
      const { password: _ignoredPassword, ...safeAdmin } = admin;
      return res.json({ success: true, message: "Login successful", admin: safeAdmin });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.post("/api/aproduct", async (req, res) => {
  const { id, name, price, description, stock, category, imageData, imageMime } = req.body;
  try {
    await db.query(
      "INSERT INTO products (pd_id, name, price, description, stock, category, image_data, image_mime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [id, name, price, description, stock, category, imageData ? Buffer.from(imageData, "base64") : null, imageMime || null]
    );
    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.put("/api/aproduct", async (req, res) => {
  const { e_id, e_name, e_price, e_description, e_stock, e_category, e_imageData, e_imageMime } = req.body;
  try {
   const editresult= await db.query(
      "UPDATE products SET name = $1, price = $2, description = $3, stock = $4, category = $5, image_data = COALESCE($6, image_data), image_mime = COALESCE($7, image_mime) WHERE pd_id = $8",
      [e_name, e_price, e_description, e_stock, e_category, e_imageData ? Buffer.from(e_imageData, "base64") : null, e_imageMime || null, e_id]
    );
     if (editresult.rowCount > 0) {
      res.json({ success: true, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});
app.delete("/api/aproduct", async (req, res) => {
  const { d_id } = req.body;
  try {
    const result = await db.query(
      "DELETE FROM products WHERE pd_id = $1",
      [d_id]
    );
    
    if (result.rowCount > 0) {
      res.json({ success: true, message: "Product deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/aallproducts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT pd_id, name, price, description, stock, category,
        CASE WHEN image_data IS NOT NULL
        THEN 'data:' || image_mime || ';base64,' || encode(image_data, 'base64')
        ELSE NULL END AS imageurl
      FROM products
    `);
    res.json({ success: true, products: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/auser", async (req, res) => {
  try {
    const result = await db.query("SELECT pf_id, first_name, last_name, email, address, city FROM profiles ORDER BY pf_id DESC");
    res.json({ success: true, users: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/aorders", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT o.o_id, o.profile_id, o.total_quantity, o.total_price,
        o.payment_method, o.created_at,
        p.first_name, p.last_name, p.email,
        od.pd_id, od.quantity, od.total_price AS item_total,
        products.name AS product_name
      FROM orders o
      JOIN profiles p ON p.pf_id = o.profile_id
      JOIN order_details od ON od.o_id = o.o_id
      JOIN products ON products.pd_id = od.pd_id
      ORDER BY o.o_id DESC
    `);
    res.json({ success: true, orders: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT pd_id, name, price, description, stock, category,
        CASE WHEN image_data IS NOT NULL
        THEN 'data:' || image_mime || ';base64,' || encode(image_data, 'base64')
        ELSE NULL END AS imageurl
      FROM products ORDER BY pd_id
    `);
    res.json({ success: true, products: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.post("/api/cart", async (req, res)=>{
  const { pd_id, profile_id, quantity = 1, totalprice } = req.body;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try{
    const existingItem = await db.query(
      "SELECT * FROM cart WHERE pd_id = $1 AND profile_id = $2",
      [pd_id, profile_id]
    );
    if (existingItem.rows.length > 0){
      await db.query(
        "UPDATE cart SET quantity = quantity + $1, total_price = total_price + $2 WHERE pd_id = $3 AND profile_id = $4",
        [quantity, totalprice, pd_id, profile_id]
      );
    } else {
      await db.query(
        "INSERT INTO cart (pd_id, profile_id, quantity, total_price) VALUES ($1, $2, $3, $4)",
        [pd_id, profile_id, quantity, totalprice]
      );
    }
    res.json({ success: true, message: "Item added to cart" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.get("/api/cart", async (req, res) => {
  const { profile_id } = req.query;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try {
    const result = await db.query(`
      SELECT c.*, p.name, p.description, p.price,
        CASE WHEN p.image_data IS NOT NULL
          THEN 'data:' || p.image_mime || ';base64,' || encode(p.image_data, 'base64')
          ELSE NULL END AS imageurl
      FROM cart c JOIN products p
      ON c.pd_id = p.pd_id
      WHERE c.profile_id = $1 ORDER BY c.c_id
    `, [profile_id]);
    res.json({ success: true, cartItems: result.rows });
  }
  catch(err)
  {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.put("/api/cart/increment", async (req, res) => {
  const { pd_id, profile_id, price } = req.body;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try {
    const result = await db.query(
      "UPDATE cart SET quantity = quantity + 1, total_price = total_price + $1 WHERE pd_id = $2 AND profile_id = $3",
      [price, pd_id, profile_id]
    );
    
    if (result.rowCount > 0) {
      res.json({ success: true, message: "Cart updated" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.put("/api/cart/decrement", async (req, res) => {
  const { pd_id, profile_id, price } = req.body;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try {
    const result = await db.query(
      "UPDATE cart SET quantity = quantity - 1, total_price = total_price - $1 WHERE pd_id = $2 AND profile_id = $3 AND quantity > 1",
      [price, pd_id, profile_id]
    );
    
    if (result.rowCount > 0) {
      res.json({ success: true, message: "Cart updated" });
    } else {
      res.status(404).json({ success: false, message: "Cannot decrease quantity" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});

app.delete("/api/cart/remove", async (req, res) => {
  const { pd_id, profile_id } = req.body;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try {
    const result = await db.query("DELETE FROM cart WHERE pd_id = $1 AND profile_id = $2", [pd_id, profile_id]);
    
    if (result.rowCount > 0) {
      res.json({ success: true, message: "Item removed from cart" });
    } else {
      res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error: " + err.message });
  }
});


app.post("/api/billing", async (req, res) => {
  const { orderItems, totalAmount, totalQuantity, paymentMethod, profile_id } = req.body;
  if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
  try {
    const order = await db.query(
      "insert into orders(profile_id, total_quantity, total_price, payment_method) VALUES ($1, $2, $3, $4) returning *",
      [profile_id, totalQuantity, totalAmount, paymentMethod]
    )
    const id=order.rows[0].o_id    
    for(const item of orderItems){
      await db.query(
        "insert into order_details (o_id,pd_id,quantity,total_price,payment_method) VALUES ($1,$2,$3,$4,$5)",
        [id,item.pd_id,item.quantity,item.total_price,paymentMethod]
      )}
    await db.query("delete from cart WHERE profile_id = $1", [profile_id])
    res.json({ success: true, message: "Billing processed successfully", order: order.rows[0] 
    });
  } catch (err) {
    console.error("Billing error:", err);
    res.status(500).json({ success: false,  message: "Database error: " + err.message });
  }});

  app.get("/api/order",async(req,res)=>{
    const { profile_id } = req.query;
    if (!profile_id) return res.status(401).json({ success: false, message: "Please log in first" });
    try{
       const result = await db.query(`
      SELECT od.*, p.pd_id, p.name, p.description, p.price, p.stock, p.category,
        CASE WHEN p.image_data IS NOT NULL
          THEN 'data:' || p.image_mime || ';base64,' || encode(p.image_data, 'base64')
          ELSE NULL END AS imageurl
      FROM order_details od 
      JOIN orders o ON od.o_id = o.o_id
      JOIN products p ON od.pd_id = p.pd_id 
      WHERE o.profile_id = $1
      ORDER BY od.o_id DESC
    `, [profile_id]);
         res.json({
          success:true,
          order:result.rows
         })
    } catch(err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database error: " + err.message 
    });
  }
})



// Vercel imports this file as a serverless function and calls the
// exported app directly, so we only need to start a real HTTP server
// when running locally (e.g. `node server.js` or `npm start`).
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;