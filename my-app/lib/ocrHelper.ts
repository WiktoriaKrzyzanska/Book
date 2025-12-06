import Tesseract from 'tesseract.js';

export interface ParsedEventData {
  title?: string;
  dateStr?: string;
  description?: string;
}

export const parseImageText = async (file: File): Promise<ParsedEventData> => {
  try {
    const result = await Tesseract.recognize(file, 'pol', {
      // logger: (m) => console.log(m),
    });

    const text = result.data.text;
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    let title = '';
    let description = '';
    let dateStr = '';

    const dateRegex = /(\d{1,2})\s+(STYCZNIA|LUTEGO|MARCA|KWIETNIA|MAJA|CZERWCA|LIPIECA|SIERPNIA|WRZEŚNIA|PAŹDZIERNIKA|LISTOPADA|GRUDNIA|STYCZEŃ|LUTY|MARZEC|KWIECIEŃ|MAJ|CZERWIEC|LIPIEC|SIERPIEŃ|WRZESIEŃ|PAŹDZIERNIK|LISTOPAD|GRUDZIEŃ)/i;
    
    const titleCandidates = lines.filter(l => 
      !l.toUpperCase().includes('CMWBC') && 
      !l.toUpperCase().includes('LISTOPAD') && 
      l.length > 5
    );

    if (titleCandidates.length > 0) {
      title = titleCandidates[0];
      description = titleCandidates.slice(1).join(' ').substring(0, 300);
    }

    const dateMatch = text.match(dateRegex);
    if (dateMatch) {
      dateStr = dateMatch[0];
    }

    return {
      title,
      dateStr,
      description
    };

  } catch (error) {
    console.error("Błąd OCR:", error);
    return {};
  }
};