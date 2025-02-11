// קריאת נתונים מהשרת
async function loadFromServer() {
    let response = await fetch("http://localhost:3000/get-data");
    return response.json();
}

// שמירת נתונים לשרת
async function saveToServer(data) {
    await fetch("http://localhost:3000/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

// התחברות למנהלים
const ADMIN_USER = "STEVE24";
const ADMIN_PASS = "0584443017";

function adminLogin() {
    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        alert("✅ התחברות מוצלחת!");
        document.getElementById("loginPopup").classList.add("hidden");
        document.getElementById("adminPanel").classList.remove("hidden");
    } else {
        alert("❌ שם משתמש או סיסמה שגויים!");
    }
}

// שמירת טבלה לשרת
async function saveTable() {
    let selected = document.getElementById("tableSelect").value.split("-");
    let sport = selected[0];
    let league = selected[1];

    let savedData = await loadFromServer();
    savedData[sport] = savedData[sport] || {};
    savedData[sport][league] = [];

    document.querySelectorAll("#adminTableBody tr").forEach(row => {
        let rowData = [];
        row.querySelectorAll("td").forEach(cell => {
            rowData.push(cell.textContent);
        });
        savedData[sport][league].push(rowData);
    });

    await saveToServer(savedData);
    alert("💾 התוצאות נשמרו בהצלחה!");
}
