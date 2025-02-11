const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = "data.json";

app.use(express.json());
app.use(cors());

app.get("/get-data", (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: "שגיאה בטעינת הנתונים" });
        res.json(JSON.parse(data));
    });
});

app.post("/save-data", (req, res) => {
    fs.writeFile(DATA_FILE, JSON.stringify(req.body), err => {
        if (err) return res.status(500).json({ error: "שגיאה בשמירת הנתונים" });
        res.json({ message: "✅ הנתונים נשמרו בהצלחה!" });
    });
});

app.listen(PORT, () => {
    console.log(`📡 השרת פועל על http://localhost:${PORT}`);
});
