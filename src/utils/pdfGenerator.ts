import { jsPDF } from 'jspdf';
import { StudyMaterial } from '../types';
import { containsHebrew, reverseHebrewForPdf } from './hebrewUtils';

export function downloadTxt(study: StudyMaterial) {
  // \uFEFF is UTF-8 Byte Order Mark (BOM) to ensure exact Unicode rendering in text editors
  let textContent = `\uFEFF==================================================
TALMIDIM ACADEMY
Academia Digital de Estudos das Escrituras
Tora • Pardes • Parasha • Shabat • Hebraico • Brit Hadasha
==================================================

TÍTULO: ${study.title || 'Estudo'}
${study.subtitle ? `SUBTÍTULO: ${study.subtitle}\n` : ''}TEMA: ${study.topic || ''}
MODO DE ESTUDO: ${(study.mode || '').toUpperCase()}
PÚBLICO: ${study.targetAudience || 'Geral'} | NÍVEL: ${(study.depthLevel || '').toUpperCase()}
DATA: ${new Date(study.createdAt).toLocaleDateString('pt-BR')}

--------------------------------------------------
CONTEÚDO DO ESTUDO:
--------------------------------------------------

${study.contentMarkdown}

`;

  if (study.slides && study.slides.length > 0) {
    textContent += `\n--------------------------------------------------\nESTRUTURA DE SLIDES DE APRESENTAÇÃO:\n--------------------------------------------------\n\n`;
    study.slides.forEach(slide => {
      textContent += `SLIDE ${slide.slideNumber}: ${slide.title}\n`;
      if (slide.subtitle) textContent += `Subtítulo: ${slide.subtitle}\n`;
      if (slide.hebrewQuote) textContent += `Texto Hebraico: ${slide.hebrewQuote}\n`;
      slide.bullets.forEach(b => {
        textContent += `  • ${b}\n`;
      });
      if (slide.reference) textContent += `Referência: ${slide.reference}\n`;
      textContent += `\n`;
    });
  }

  textContent += `\n==================================================\nGerado por Talmidim Academy - Todos os direitos reservados.\n==================================================\n`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(study.title || 'estudo').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_talmidim.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generatePdfWithoutSlides(study: StudyMaterial) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Header Colors: Deep Blue (#0F172A), Gold Accent (#D4AF37)
  doc.setFillColor(15, 23, 42); // #0F172A
  doc.rect(0, 0, pageWidth, 32, 'F');

  doc.setFillColor(212, 175, 55); // Gold line
  doc.rect(0, 32, pageWidth, 2, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TALMIDIM ACADEMY', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(212, 175, 55);
  doc.text('ACADEMIA DIGITAL DE ESTUDOS DAS ESCRITURAS', margin, 20);

  doc.setFontSize(8);
  doc.setTextColor(220, 220, 220);
  doc.text('Torá • Pardes • Parashá • Shabat • Hebraico • Brit Hadasha', margin, 26);

  // Document Title & Metadata
  let y = 45;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(study.title, margin, y, { maxWidth: contentWidth });
  
  y += 10;
  if (study.subtitle) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text(study.subtitle, margin, y, { maxWidth: contentWidth });
    y += 8;
  }

  // Meta Pill Box
  doc.setFillColor(245, 239, 235); // Parchment tone
  doc.rect(margin, y, contentWidth, 14, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text(`Modo: ${(study.mode || '').toUpperCase()}`, margin + 5, y + 6);
  doc.text(`Tema: ${study.topic || ''}`, margin + 50, y + 6);
  doc.text(`Nível: ${(study.depthLevel || '').toUpperCase()}`, margin + 110, y + 6);
  doc.text(`Data: ${new Date(study.createdAt).toLocaleDateString('pt-BR')}`, margin + 5, y + 11);

  y += 22;

  // Render Main Body Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);

  const rawLines = study.contentMarkdown.split('\n');

  for (let rawLine of rawLines) {
    const cleanLine = rawLine.replace(/^#+\s+/, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();
    if (!cleanLine) {
      y += 3;
      continue;
    }

    const isHebrew = containsHebrew(cleanLine);
    const lineToPrint = isHebrew ? reverseHebrewForPdf(cleanLine) : cleanLine;
    const splitSubLines = doc.splitTextToSize(lineToPrint, contentWidth);

    for (let line of splitSubLines) {
      if (y > pageHeight - 25) {
        // Add Page Number Footer before new page
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text(`Talmidim Academy • Página ${doc.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
        
        doc.addPage();
        y = 25;
        
        // Mini Top Border on Sub-pages
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 8, 'F');
        doc.setFillColor(212, 175, 55);
        doc.rect(0, 8, pageWidth, 1, 'F');
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
      }

      if (isHebrew) {
        doc.text(line, pageWidth - margin, y, { align: 'right' });
      } else {
        doc.text(line, margin, y);
      }
      y += 5.5;
    }
  }

  // Footer on Last Page
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(`Talmidim Academy • Apostila de Estudo • Página ${doc.internal.pages.length - 1}`, pageWidth / 2, pageHeight - 10, { align: 'center' });

  doc.save(`${(study.title || 'estudo').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_apostila.pdf`);
}

export function generatePdfWithSlides(study: StudyMaterial) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4' // 297mm x 210mm
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const slides = study.slides && study.slides.length > 0 ? study.slides : [
    { slideNumber: 1, title: study.title, subtitle: study.subtitle || 'Talmidim Academy', bullets: ['Apresentação de Estudo das Escrituras', `Tema: ${study.topic}`, `Modo: ${study.mode}`] },
    { slideNumber: 2, title: 'Introdução & Contexto', bullets: ['Análise fundamental do texto bíblico', 'Perspectiva histórica do Segundo Templo', 'Conexões no Tanakh'] },
    { slideNumber: 3, title: 'Conclusão e Aplicação', bullets: ['Reflexão para a vida diária', 'Aprofundamento no estudo pessoal'] }
  ];

  slides.forEach((slide, idx) => {
    if (idx > 0) doc.addPage();

    // Background - Dark Blue for Slide 1, Light Parchment for others
    if (idx === 0) {
      doc.setFillColor(15, 23, 42); // #0F172A
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Accent Gold Frame
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(1.5);
      doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

      // Title Slide Content
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.text(slide.title, pageWidth / 2, 80, { align: 'center', maxWidth: pageWidth - 50 });

      if (slide.subtitle) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(14);
        doc.setTextColor(212, 175, 55);
        doc.text(slide.subtitle, pageWidth / 2, 100, { align: 'center', maxWidth: pageWidth - 50 });
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(200, 200, 200);
      doc.text('TALMIDIM ACADEMY', pageWidth / 2, 130, { align: 'center' });
      doc.setFontSize(9);
      doc.text('Academia Digital de Estudos das Escrituras', pageWidth / 2, 137, { align: 'center' });
      doc.text(`Modo: ${(study.mode || '').toUpperCase()} | ${new Date(study.createdAt).toLocaleDateString('pt-BR')}`, pageWidth / 2, 144, { align: 'center' });
    } else {
      // Content Slides
      doc.setFillColor(253, 251, 247); // Light Parchment
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // Top Header Bar
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 22, 'F');
      doc.setFillColor(212, 175, 55);
      doc.rect(0, 22, pageWidth, 1.5, 'F');

      // Header Brand
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('TALMIDIM ACADEMY', 15, 14);

      doc.setFontSize(9);
      doc.setTextColor(212, 175, 55);
      doc.text(`Slide ${slide.slideNumber} / ${slides.length}`, pageWidth - 15, 14, { align: 'right' });

      // Slide Title
      let y = 38;
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(slide.title, 20, y);

      y += 12;

      // Hebrew Quote if present
      if (slide.hebrewQuote) {
        doc.setFillColor(240, 235, 225);
        doc.rect(20, y - 4, pageWidth - 40, 14, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(180, 130, 20);
        const formattedQuote = containsHebrew(slide.hebrewQuote) ? reverseHebrewForPdf(slide.hebrewQuote) : slide.hebrewQuote;
        doc.text(formattedQuote, pageWidth / 2, y + 4, { align: 'center' });
        y += 18;
      }

      // Bullets
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(30, 41, 59);

      slide.bullets.forEach(bullet => {
        const isHebrew = containsHebrew(bullet);
        const bulletText = isHebrew ? reverseHebrewForPdf(bullet) : bullet;
        const wrappedBullet = doc.splitTextToSize(`• ${bulletText}`, pageWidth - 50);
        wrappedBullet.forEach((line: string) => {
          if (y < pageHeight - 25) {
            if (isHebrew) {
              doc.text(line, pageWidth - 25, y, { align: 'right' });
            } else {
              doc.text(line, 25, y);
            }
            y += 8;
          }
        });
        y += 3;
      });

      // Reference if present
      if (slide.reference) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.setTextColor(100, 116, 139);
        doc.text(`Referência: ${slide.reference}`, 25, pageHeight - 15);
      }
    }
  });

  doc.save(`${(study.title || 'estudo').replace(/[^a-z0-9]/gi, '_').toLowerCase()}_slides.pdf`);
}

