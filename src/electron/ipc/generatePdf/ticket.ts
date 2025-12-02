
import { getPDFInvoiceFolder, getPDFTicketFolder } from "../../util.js";
import path from "path";
import fs from 'fs'
import PDFDocument from 'pdfkit'
import { app } from "electron";
import { Ticket } from "../../../types/models/ticket.js";

export function generateTicketPDF(isTicket: boolean = true, ticket: Ticket): Promise<string>{
  return new Promise((resolve, reject) => {
    try {
      const pdfFolderPath = isTicket ? getPDFTicketFolder() : getPDFInvoiceFolder();
      const pdfPath = path.join(pdfFolderPath, ticket.serie.toUpperCase() + ".pdf");

      const doc = new PDFDocument({size: "A4" ,margin: 40});
      const writeString = fs.createWriteStream(pdfPath);
      doc.pipe(writeString);

      const pageWidth = doc.page.width;
      const margin = 40;
      const contentWidth = pageWidth - margin * 2;

      // ---- Logo de la empresa
      const logoPath = path.join(app.getAppPath(), "public/logo.png")
      const qrPath = path.join(app.getAppPath(), "public/qrexample.png")
      const logoWidth = 100;
      try {
        if(fs.existsSync(logoPath)){
          doc.image(logoPath, margin, 30, {width: logoWidth});
        }
      } catch(err) {
        console.log(logoPath);
        // -- no hacer nada
      }

      // Título central (nombre empresa)
      doc
        .fontSize(18)
        .font("Helvetica-Bold")
        .fillColor("#1E2336")
        .text("Nombre de la compañía", margin + logoWidth + 10, 30, {
          width: contentWidth - logoWidth - 200,
          align: "center",
        });

      doc
        .fontSize(9)
        .font("Helvetica")
        .fillColor("black")
        .text("Dirección de la compañía", {
          width: contentWidth - logoWidth - 200,
          align: "center",
        });
      doc.text("Otra dirección de la compañía", { align: "center", width: contentWidth - logoWidth - 200});
      doc.moveDown(0.5);

      // Caja RUC / FACTURA a la derecha
      const rucBoxX = pageWidth - margin - 160;
      const rucBoxY = 30;
      const rucBoxW = 160;
      const rucBoxH = 100;
      doc
        .rect(rucBoxX, rucBoxY, rucBoxW, rucBoxH)
        .lineWidth(1)
        .stroke("#000");

      doc.fontSize(9).font("Helvetica-Bold").text("R.U.C. N° 10769527058", rucBoxX, rucBoxY + 10, {width: rucBoxW, align: "center"});
      doc.fontSize(14).text("FACTURA ELECTRÓNICA", rucBoxX, rucBoxY + 34, {width: rucBoxW, align: "center"});
      doc.fontSize(13).text(ticket.serie.toUpperCase(), rucBoxX + 8, rucBoxY + 80, {width: rucBoxW, align: "center"});

      // ---------- Datos del cliente / Info factura ----------
      const detailsTop = 150;
      const detailsLeft = margin;
      const detailsWidth = contentWidth;
      const colLeftW = Math.floor(detailsWidth * 0.6);
      const colRightW = detailsWidth - colLeftW - 10;

      // Box with client info (left)
      doc
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("CLIENTE:", detailsLeft, detailsTop);
      doc
        .font("Helvetica")
        .fontSize(9)
        .text(ticket.client.name ?? "-", detailsLeft + 70, detailsTop);

      doc.font("Helvetica-Bold").fontSize(9).text("RUC:", detailsLeft, detailsTop + 14);
      doc.font("Helvetica").fontSize(9).text(ticket.client.ruc ?? "-", detailsLeft + 70, detailsTop + 14);

      doc.font("Helvetica-Bold").fontSize(9).text("DIRECCIÓN:", detailsLeft, detailsTop + 28);
      doc.font("Helvetica").fontSize(9).text(ticket.client.address ?? "-", detailsLeft + 70, detailsTop + 28);

      // Fecha y N° (right)
      const rightX = detailsLeft + colLeftW + 10;
      doc.font("Helvetica-Bold").fontSize(9).text("FECHA EMISIÓN:", rightX, detailsTop);
      doc.font("Helvetica").fontSize(9).text(ticket.dateString, rightX + 90, detailsTop);

      doc.font("Helvetica-Bold").fontSize(9).text("N° FACTURA:", rightX, detailsTop + 14);
      doc.font("Helvetica").fontSize(9).text(ticket.serie.toUpperCase(), rightX + 90, detailsTop + 14);


      // Tabla de productos
      // ---------- Items Table Header ----------
      const tableTop = detailsTop + 60;
      const tableLeft = margin;
      const colWidths = {
        code: 60,
        desc: contentWidth - 60 - 60 - 60 - 40 - 80, // remaining for description
        qty: 60,
        cunit: 60,
        unit: 40,
        amount: 80,
      };

      // Header background
      doc
        .rect(tableLeft, tableTop, contentWidth + 20, 20)
        .fill("#f2f2f2")
        .stroke();

      doc.fillColor("black").fontSize(9).font("Helvetica-Bold");
      doc.text("CÓDIGO", tableLeft + 4, tableTop + 5, { width: colWidths.code, align: "left" });
      doc.text("DESCRIPCIÓN", tableLeft + colWidths.code + 4, tableTop + 5, { width: colWidths.desc, align: "left"});
      doc.text("CANT.", tableLeft + colWidths.code + colWidths.desc + 4, tableTop + 5, { width: colWidths.qty, align: "center" });
      doc.text("UNIDAD.", tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + 4, tableTop + 5, { width: colWidths.qty, align: "center" });
      doc.text("V. UNIT.", tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + colWidths.qty + 4, tableTop + 5, { width: colWidths.unit, align: "right" });
      doc.text("IMPORTE", tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + colWidths.qty + colWidths.unit + 4, tableTop + 5, { width: colWidths.amount, align: "right" });

      let elements = ticket.productsList;

      // Draw rows
      let y = tableTop + 25;
      doc.font("Helvetica").fontSize(9);
      for (const item of elements) {
        doc.text(item.id ?? "-", tableLeft + 4, y, { width: colWidths.code, align: "left" });
        doc.text(item.description, tableLeft + colWidths.code + 4, y, { width: colWidths.desc, align: "left"});
        doc.text(item.quantity?.toString(), tableLeft + colWidths.code + colWidths.desc + 4, y, { width: colWidths.qty, align: "center" });
        doc.text(item.unit, tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + 4, y, { width: colWidths.qty, align: "center" });
        doc.text(item.unitPrice?.toString(), tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + colWidths.qty + 4, y, { width: colWidths.unit, align: "right" });
        doc.text(item.importPrice?.toString(), tableLeft + colWidths.code + colWidths.desc + colWidths.cunit + colWidths.qty + colWidths.unit + 4, y, { width: colWidths.amount, align: "right" });

        y += 18;
        // draw line under row
        doc.moveTo(tableLeft, y - 6).lineTo(tableLeft + contentWidth, y - 6).strokeOpacity(0.05).stroke();
      }


      
      // ---------- QR (left lower) and totals (right) ----------
      const qrX = tableLeft;
      const qrY = y + 10;
      const qrSize = 70;

      if(fs.existsSync(qrPath)){
        try {
          doc.image(qrPath, qrX, qrY, { width: qrSize, height: qrSize });
        } catch (err) { /* ignore */ }
      } else {
        // small placeholder
        doc.rect(qrX, qrY, qrSize, qrSize).stroke();
        doc.fontSize(7).text("QR", qrX + qrSize / 2 - 8, qrY + qrSize / 2 - 5);
      }

      // Totals box
      const totalsX = qrX + qrSize;
      const totalsWidth = contentWidth - qrSize;
      const totalsBoxY = qrY;
      const totalsLineHeight = 16;

      doc.fontSize(9).font("Helvetica-Bold").text("TOTAL VALOR DE VENTA:", totalsX - 50, totalsBoxY, { width: totalsWidth - 20, align: "right" });
      doc.font("Helvetica").fontSize(9).text("S/ " + "35.50", totalsX + 120, totalsBoxY, { align: "right" });

      doc.font("Helvetica-Bold").fontSize(9).text("IGV (18%):", totalsX - 50, totalsBoxY + totalsLineHeight, { width: totalsWidth - 20, align: "right" });
      doc.font("Helvetica").fontSize(9).text("S/ " + "6.00", totalsX + 120, totalsBoxY + totalsLineHeight, { align: "right" });

      doc.font("Helvetica-Bold").fontSize(11).text("IMPORTE TOTAL:", totalsX - 50, totalsBoxY + totalsLineHeight * 2, { width: totalsWidth - 20, align: "right" });
      doc.font("Helvetica-Bold").fontSize(11).text("S/ " + elements.reduce((ac, e) => ac + e.unitPrice, 0), totalsX + 120, totalsBoxY + totalsLineHeight * 2, { align: "right" });

      // SON: texto con monto en letras (simple)
      doc.fontSize(9).font("Helvetica").text("SON: " + "CUARENTA Y SEIS CON CINCUENTA CÉNTIMOS", margin, totalsBoxY + qrSize + 10);

      // ---------- Observaciones / bancos (footer) ----------
      const footerY = totalsBoxY + qrSize + 30;
      doc.moveTo(margin, footerY).lineTo(pageWidth - margin, footerY).strokeOpacity(0.2).stroke();

      doc.font("Helvetica-Bold").fontSize(9).text("OBSERVACIONES:", margin, footerY + 8);
      doc.font("Helvetica").fontSize(9).text("-", margin + 90, footerY + 8);

      doc.end();

      resolve(pdfPath);

    } catch(err){
      reject(err)
      console.log("Error al generar el PDF: " + err)
    }
  })
}
