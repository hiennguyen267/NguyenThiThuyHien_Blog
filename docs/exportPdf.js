const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Đọc file HTML CV
  const html = fs.readFileSync(path.join(__dirname, 'cv.html'), 'utf8');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Xuất PDF
  await page.pdf({
    path: 'CV_NguyenThiThuyHien.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
  });

  await browser.close();
  console.log('✅ PDF đã được tạo: CV_NguyenThiThuyHien.pdf');
})();
