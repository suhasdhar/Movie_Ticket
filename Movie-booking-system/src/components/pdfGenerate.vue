<template>
    <div>
      <button @click="generatePDF">Generate PDFs</button>
    </div>
  </template>
  
  <script>
  import jsPDF from 'jspdf';
  
  export default {
    name: 'PDFGenerator',
    props: {
      ticketData: {
        type: Array,
        required: true,
      },
    },
    methods: {
      generatePDF() {
        // Create a new PDF document
        const doc = new jsPDF();
  
        for (let i = 0; i < this.ticketData.length; i++) {
          // Extract ticket data from the prop
          const { movieName, theaterName, seatNumber, time } = this.ticketData[i];
  
          // Calculate page number and position on page
          const pageNumber = Math.floor(i / 3) + 1;
          const yPosition = 10+((i % 3) * 90);
          const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
          // Create a new page if necessary
          if (i % 3 === 0 && i > 0) {
            doc.addPage();
          }
  
          // Set the background color of the ticket
          doc.setFillColor(255, 255, 255);
  
          // Draw the border of the ticket
          doc.setDrawColor(0, 0, 0);
          doc.rect(10, yPosition, 170, 90, 'FD');
  
          // Add the ticket information to the document
          doc.setFontSize(20);
          doc.text(`Movie Ticket ${i + 1}`, 30, 20 + yPosition);
  
          doc.setFontSize(14);
          doc.text(`Movie: ${movieName}`, 30, 30 + yPosition);
          doc.text(`Theater: ${theaterName}`, 30, 40 + yPosition);
          doc.text(`Date: ${currentDate}`, 30, 50 + yPosition);
          doc.text(`Time: ${time}`, 30, 60 + yPosition);
          doc.text(`Seat: ${seatNumber}`, 30, 70 + yPosition);
        }
  
        // Save the PDF document to a variable
        const pdfOutput = doc.output('arraybuffer');
  
        // Trigger a download of the PDF document
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(new Blob([pdfOutput], { type: 'application/pdf' }));
        downloadLink.download = 'tickets.pdf';
        downloadLink.click();
      },
    },
  };
  </script>
  
  <style scoped>
    /* Add any custom styles here */
  </style>
  