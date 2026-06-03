const form = document.getElementById("expenseForm");
const tableBody = document.getElementById("tableBody");
const balanceEl = document.getElementById("balance");
const clearAllBtn = document.getElementById("clearAllBtn");
const pdfBtn = document.getElementById("pdfBtn");

let balance = Number(localStorage.getItem("balance")) || 0;
balanceEl.innerText = `₹${balance}`;

function loadEntries() {

    const entries = JSON.parse(localStorage.getItem("entries")) || [];

    tableBody.innerHTML = "";

    entries.forEach(entry => {

        tableBody.innerHTML += `
            <tr style="background-color:aqua;">
                <td>${entry.date}</td>
                <td>${entry.reason}</td>
                <td>₹${entry.expense}</td>
                <td>₹${entry.received}</td>
                <td>₹${entry.balance}</td>
                <td>${entry.bill}</td>
                <td>${entry.description}</td>
            </tr>
        `;
    });
}

loadEntries();

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const date = document.getElementById("date").value;
    const reason = document.getElementById("reason").value;
    const expense = Number(document.getElementById("amount").value) || 0;
    const received = Number(document.getElementById("received").value) || 0;
    const bill = document.getElementById("bill").value;
    const description = document.getElementById("description").value;

    balance = balance + received - expense;

    balanceEl.innerText = `₹${balance}`;

    const entry = {
        date,
        reason,
        expense,
        received,
        balance,
        bill,
        description
    };

    const entries = JSON.parse(localStorage.getItem("entries")) || [];

    entries.push(entry);

    localStorage.setItem("entries", JSON.stringify(entries));
    localStorage.setItem("balance", balance);

    loadEntries();

    form.reset();
});

if (clearAllBtn) {

    clearAllBtn.addEventListener("click", function () {

        if (confirm("Are you sure you want to clear all records?")) {

            localStorage.removeItem("entries");
            localStorage.removeItem("balance");

            tableBody.innerHTML = "";

            balance = 0;
            balanceEl.innerText = "₹0";

            form.reset();
        }
    });
}

if (pdfBtn) {

    pdfBtn.addEventListener("click", async function () {

        const table = document.getElementById("expenseTable");

        if (!table) {
            alert("Table ID 'expenseTable' not found.");
            return;
        }

        const canvas = await html2canvas(table, {
            scale: 2
        });

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = 190;
        const pageHeight = (canvas.height * pageWidth) / canvas.width;

        pdf.setFontSize(18);
        pdf.text("Daily Expense Report", 10, 10);

        pdf.addImage(
            imgData,
            "PNG",
            10,
            20,
            pageWidth,
            pageHeight
        );

        pdf.save("Daily_Expense_Report.pdf");
    });
}