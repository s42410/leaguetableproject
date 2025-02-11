const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const DATA_FILE = "data.json";

// קריאת נתונים מהשרת
app.get("/get-data", (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "שגיאה בקריאת הנתונים" });
        }
        res.json(JSON.parse(data));
    });
});

// שמירת נתונים לשרת
app.post("/save-data", (req, res) => {
    fs.writeFile(DATA_FILE, JSON.stringify(req.body), err => {
        if (err) {
            return res.status(500).json({ error: "שגיאה בשמירת הנתונים" });
        }
        res.json({ message: "✅ הנתונים נשמרו בהצלחה!" });
    });
});

app.listen(PORT, () => console.log(`📡 השרת פועל בכתובת: http://localhost:${PORT}`));
