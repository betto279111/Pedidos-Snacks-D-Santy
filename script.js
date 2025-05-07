// Productos disponibles y sus precios
const products = [
    { name: "PAPA HOT DOG RODAJA", price: 1.60 },
    { name: "PAPA SALSA /MAYONESA TRANSP. 28gm.", price: 0.20 },
    { name: "PAPA NATURAL PEQUEÑA TRANSP. 50gm.", price: 0.45 },
    { name: "PAPA NATURAL MEDIANA TRANSP. 80gm.", price: 0.80 },
    { name: "PAPA CEBOLLA MEDIANA 80gm.", price: 0.80 },
    { name: "PAPA PICANTE MEDIANA 80gm.", price: 0.80 },
    { name: "PAPA NATURAL GRANDE TRANSP. 140gm.", price: 1.15 },
    { name: "PAPA CEBOLLA GRANDE 140gm.", price: 1.15 },
    { name: "PAPA PICANTE GRANDE 140gm.", price: 1.15 },
    { name: "PAPA NATURAL GIGANTE TRANSP. 230gm.", price: 2.15 },
    { name: "PAPA NATURAL GRANDE 100gm.", price: 0.90 },
    { name: "PAPA PALILLO TIRA x 10 UN. 40gm.", price: 0.20 },
    { name: "PAPA PALILLO PEQUEÑA 65gm.", price: 0.45 },
    { name: "PAPA PALILLO MEDIANA TRANSP. 105gm.", price: 0.80 },
    { name: "PAPA PALILLO GRANDE 130gm.", price: 0.90 },
    { name: "PAPA PALILLO GIGANTE TRANSP. 310gm.", price: 2.15 },
    { name: "CHIFLE DE SAL PEQUEÑO 30gm.", price: 0.22 },
    { name: "CHIFLE DE SAL MEDIANO 40gm.", price: 0.30 },
    { name: "CHIFLE DE SAL 60 gm.", price: 0.45 },
    { name: "CHIFLE DE SAL GRANDE 100gm.", price: 1.00 },
    { name: "CHIFLE DE DULCE PEQUEÑO 30gm.", price: 0.22 },
    { name: "CHIFLE DE DULCE MEDIANO 40gm.", price: 0.30 },
    { name: "CHIFLE DE DULCE GRANDE 110gm.", price: 1.00 },
    { name: "MANI DE DULCE CON CHICLE", price: 0.20 },
    { name: "MANI DE DULCE TIRA CON AJONJOLI 45gm.", price: 0.20 },
    { name: "MANI DULCE GRANDE 140gm.", price: 1.00 },
    { name: "MANI DE SAL PAQUETE", price: 0.20 },
    { name: "MANI DE SAL TIRA 0,40", price: 0.40 },
    { name: "MANI SAL GRANDE 140gm.", price: 1.00 },
    { name: "TOSTADO DE SAL EN TIRA 45gm.", price: 0.22 },
    { name: "TOSTADO DE SAL GRANDE 135gm.", price: 1.00 },
    { name: "TOSTADO DE DULCE EN TIRA 45gm.", price: 0.20 },
    { name: "TOSTADO DE DULCE GRANDE 135gm.", price: 1.00 },
    { name: "HABAS DE SAL EN TIRA 24gm.", price: 0.20 },
    { name: "HABAS DE SAL GRANDE 105gm.", price: 1.00 },
    { name: "YUCA PEQUEÑA", price: 0.22 },
    { name: "YUCA MEDIANA", price: 0.45 },
    { name: "YUCA GRANDE", price: 1.00 },
    { name: "MIX TOSTADO", price: 0.90 },
    { name: "FRUTOS SECOS", price: 0.80 },
    { name: "CUERITOS 20 gm.", price: 0.40 },
    { name: "CUERITOS 40 gm.", price: 0.90 },
    { name: "TOTOPOS 50 gm", price: 0.40 },
    { name: "TOTOPOS 80 gm", price: 0.85 },
    { name: "TOTOPOS 120 gm", price: 1.30 },
    { name: "TOTOPOS 180 gm", price: 1.75 },
    { name: "TOTOPOS 300 gm", price: 2.70 }
];

document.getElementById('addProductBtn').addEventListener('click', addProductRow);
document.getElementById('generatePDF').addEventListener('click', generatePDF);

// Función para agregar una nueva fila de producto
function addProductRow() {
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();

    const quantityCell = row.insertCell(0);
    const productCell = row.insertCell(1);
    const unitPriceCell = row.insertCell(2);
    const totalPriceCell = row.insertCell(3);

    // Crear el menú desplegable de productos
    const productSelect = document.createElement('select');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.price;
        option.textContent = `${product.name} - $${product.price}`;
        productSelect.appendChild(option);
    });
    productCell.appendChild(productSelect);

    // Crear campo de cantidad
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityCell.appendChild(quantityInput);

    // Crear campo editable para valor unitario
    const unitPriceInput = document.createElement('input');
    unitPriceInput.type = 'number';
    unitPriceInput.classList.add('valor-unitario');
    unitPriceInput.value = parseFloat(productSelect.value).toFixed(2);
    unitPriceInput.min = '0.01';
    unitPriceCell.appendChild(unitPriceInput);

    // Calcular precio total inicial
    const initialTotal = (parseFloat(quantityInput.value) * parseFloat(unitPriceInput.value)).toFixed(2);
    totalPriceCell.textContent = initialTotal;

    // Función para actualizar total de fila y factura
    function updateTotal() {
        const quantity = parseFloat(quantityInput.value);
        const unitPrice = parseFloat(unitPriceInput.value);
        totalPriceCell.textContent = (quantity * unitPrice).toFixed(2);
        updateInvoiceTotal();
    }

    // Eventos para actualizar total cuando cambia cantidad o valor unitario
    quantityInput.addEventListener('input', updateTotal);
    unitPriceInput.addEventListener('input', updateTotal);

    // Evento al cambiar de producto
    productSelect.addEventListener('change', function () {
        const selectedPrice = parseFloat(this.value);
        unitPriceInput.value = selectedPrice.toFixed(2);
        updateTotal();
    });
}

function updateInvoiceTotal() {
    let total = 0;
    const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const totalCell = row.cells[3];
        const totalValue = parseFloat(totalCell.textContent);
        if (!isNaN(totalValue)) {
            total += totalValue;
        }
    });

    document.getElementById('invoiceTotal').textContent = total.toFixed(2);
}

// Función para generar el PDF de la factura
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Datos del cliente
    const clientName = document.getElementById('clientName').value;
    const clientRUC = document.getElementById('clientRUC').value;
    const clientAddress = document.getElementById('clientAddress').value;
    const clientPhone = document.getElementById('clientPhone').value;

    // Fecha de la factura
    const date = new Date();
    const dateString = date.toLocaleDateString(); // Formato dd/mm/yyyy

    // Generar número de factura basado en la fecha y hora
    const invoiceNumber = `NOTA-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;

    // Título de la factura
    doc.setFontSize(16);
    doc.text("Pedido Snacks D`Santy", 105, 15, { align: "center" });

    // Información de la factura
    doc.setFontSize(10);
    doc.text(`Número de Nota de Venta: ${invoiceNumber}`, 14, 30);
    doc.text(`Fecha: ${dateString}`, 14, 37);

    // Información del cliente
    const infoY = 45;
    doc.text(`Cliente: ${clientName}`, 14, infoY);
    doc.text(`RUC: ${clientRUC}`, 14, infoY + 7);
    doc.text(`Dirección: ${clientAddress}`, 14, infoY + 14);
    doc.text(`Teléfono: ${clientPhone}`, 14, infoY + 21);

    // Tabla de productos
    const tableColumn = ["Cantidad", "Producto", "Valor Unitario", "Valor Total"];
    const tableRows = [];

    const rows = document.getElementById('invoice-table').getElementsByTagName('tbody')[0].rows;
    Array.from(rows).forEach(row => {
        const quantity = row.cells[0].querySelector("input").value;
        const product = row.cells[1].querySelector("select").selectedOptions[0].textContent;
        const unitPrice = row.cells[2].querySelector("input") ? row.cells[2].querySelector("input").value : row.cells[2].textContent;
        const totalPrice = row.cells[3].textContent;
        tableRows.push([quantity, product, `$${unitPrice}`, `$${totalPrice}`]);
    });

    // Estilo de tabla
    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: infoY + 30,
        theme: 'grid',
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            lineWidth: 0.1
        },
        bodyStyles: {
            lineWidth: 0.05,
            fontSize: 9
        },
        styles: {
            cellPadding: 2
        }
    });

    // Total final
    const finalY = doc.lastAutoTable.finalY || infoY + 40;
    const total = document.getElementById('invoiceTotal').textContent;
    doc.setFontSize(12);
    doc.text(`Total a pagar: $${total}`, 14, finalY + 10);

    // Guardar PDF
    doc.save(`pedido-snacks-D-Santy_${invoiceNumber}.pdf`);
}

// Asignar evento de click al botón
document.getElementById('generatePDF').addEventListener('click', generatePDF);




// Función para enviar mensaje a WhatsApp
function sendToWhatsApp() {
    const phone = document.getElementById('clientPhone').value;
    const url = `https://wa.me/${phone}`;
    window.open(url, '_blank');
}