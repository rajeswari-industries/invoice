function addRow() {
    let table = document.getElementById("invoiceTable").getElementsByTagName('tbody')[0];
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);
    row.classList.add("invoice-row");

    row.innerHTML = `
    <td>${rowCount + 1}</td>
    <td><textarea name="text" id="particular"></textarea></td>
    <td><input type="text" class="itemNo"></td>
    <td><input type="number" class="weight" oninput="calculateTotal()"></td>
    <td><input type="number" class="rate" oninput="calculateTotal()"></td>
    <td class="amount">0.00</td>
    <td><button class="delete-btn" onclick="removeRow(this)" style="color: red;
background: white;
border: 0;
border-radius: 5px;">❌</button></td>
`;

    updateRowNumbers();
}

function removeRow(button) {
    let row = button.closest("tr");
    row.remove();
    calculateTotal();
    updateRowNumbers(); 
}

function calculateTotal() {
    let rows = document.querySelectorAll(".invoice-row");
    let subtotal = 0;

    rows.forEach(row => {
        let weight = parseFloat(row.querySelector(".weight").value) || 0;
        let rate = parseFloat(row.querySelector(".rate").value) || 0;
        let amount = weight * rate;
        row.querySelector(".amount").textContent = amount.toFixed(2);
        subtotal += amount;
    });

    let gst = subtotal * 0.12; // 12% GST
    let grandTotal = subtotal + gst;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("gst").textContent = gst.toFixed(2);
    document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
}

function updateRowNumbers() {
    let rows = document.querySelectorAll(".invoice-row");
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}

function printInvoice() {
    document.querySelectorAll("input").forEach(input => {
        let span = document.createElement("span");
        span.textContent = input.value;
        input.replaceWith(span);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => btn.remove()); // Hide delete buttons before printing

    window.print();

     
}
