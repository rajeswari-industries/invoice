function numberToWords(num) {
    const ones = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
    const thousands = ["", "Thousand", "Lakh", "Crore"];

    if (num === 0) return "Zero";

    let words = "";
    let i = 0;

    while (num > 0) {
        if (num % 1000 !== 0) {
            words = convertHundreds(num % 1000) + thousands[i] + " " + words;
        }
        num = Math.floor(num / 1000);
        i++;
    }

    return words.trim();
}

function convertHundreds(num) {
    const ones = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    if (num === 0) return "";
    if (num < 20) return ones[num] + " ";
    if (num < 100) return tens[Math.floor(num / 10)] + " " + ones[num % 10] + " ";
    return ones[Math.floor(num / 100)] + " Hundred " + convertHundreds(num % 100);
}

function formatInrWords(num) {
    return `INR ${numberToWords(num).toUpperCase()} ONLY`;
}

function calculateInvoice() {
    const qty = parseFloat(document.getElementById("qty-1").value) || 0;
    const rate = parseFloat(document.getElementById("rate-1").value) || 0;
    const cgst = parseFloat(document.getElementById("tax-cgst-igst-1").value) || 0;
    const sgst = parseFloat(document.getElementById("tax-sgst-1").value) || 0;

    const taxableValue = Math.round(qty * rate);
    const cgstAmount = Math.round((cgst / 100) * taxableValue);
    const sgstAmount = Math.round((sgst / 100) * taxableValue);
    const totalTax = cgstAmount + sgstAmount;
    const total = taxableValue + totalTax;

    document.getElementById("taxable-value-1").value = taxableValue;
    document.getElementById("amount-cgst-igst-1").value = cgstAmount;
    document.getElementById("amount-sgst-1").value = sgstAmount;
    document.getElementById("total-1").value = total;

    document.getElementById("total-qty").value = qty;
    document.getElementById("total-taxable-value").value = taxableValue;
    document.getElementById("total-cgst-igst").value = cgstAmount;
    document.getElementById('total-sgst').value = sgstAmount;
    document.getElementById("total-amount").value = total;

    document.getElementById("total-before-tax").value = taxableValue;
    document.getElementById("add-cgst").value = cgstAmount;
    document.getElementById("add-sgst").value = sgstAmount;
    document.getElementById("add-igst").value = 0;
    document.getElementById("total-tax").value = totalTax;
    document.getElementById("invoice-value").value = total;

    document.getElementById("total-tax-words").value = formatInrWords(total);
    document.getElementById("tax-amount-words").value = formatInrWords(totalTax);

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("qty-1").addEventListener("input", calculateInvoice);
    document.getElementById("rate-1").addEventListener("input", calculateInvoice);
    document.getElementById("tax-cgst-igst-1").addEventListener("input", calculateInvoice);
    document.getElementById("tax-sgst-1").addEventListener("input", calculateInvoice);
});
