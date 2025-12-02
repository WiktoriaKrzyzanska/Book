import * as THREE from 'three';

export function createPageTexture() {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#fffdf5';
  ctx.fillRect(0, 0, 128, 128);

  ctx.fillStyle = '#e3e3e3';
  for (let i = 0; i < 128; i += 2) {
    if (Math.random() > 0.3) {
        ctx.fillStyle = Math.random() > 0.5 ? '#dcdcdc' : '#eeeeee';
        ctx.fillRect(0, i, 128, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createBackCoverTexture(
  description: string
): Promise<THREE.CanvasTexture | null> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(null);
      return;
    }

    document.fonts.ready.then(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.fillStyle = '#1f1f1f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 8000; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.04})`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          2,
          2
        );
      }

      ctx.fillStyle = '#e0e0e0';
      ctx.font = 'bold 30px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText('O FABULE', canvas.width / 2, 80);

      ctx.strokeStyle = '#cfa86e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.lineTo(412, 100);
      ctx.stroke();

      ctx.font = '20px "Inter", sans-serif';
      ctx.fillStyle = '#cccccc';
      ctx.textAlign = 'left';

      const text = description;
      const x = 50;
      let y = 150;
      const maxWidth = 412;
      const lineHeight = 30;
      const words = text.split(' ');
      let line = '';

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, y);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      resolve(texture);
    });
  });
}

export function createFrontCoverTexture(
  title: string,
  author: string,
  baseColor: string
): Promise<THREE.CanvasTexture | null> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(null);
      return;
    }

    document.fonts.ready.then(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#5a3b34');
      grad.addColorStop(0.5, baseColor);
      grad.addColorStop(1, '#1f1410');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(232,228,220,0.7)';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.fillStyle = '#e8e4dc';
      ctx.textAlign = 'left';
      ctx.font = 'bold 46px "Playfair Display", serif';

      const words = title.split(' ');
      const maxWidth = canvas.width - 120;
      const lineHeight = 54;
      let line = '';
      let y = 200;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const w = ctx.measureText(testLine).width;
        if (w > maxWidth && i > 0) {
          ctx.fillText(line, 60, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 60, y);

      ctx.font = '20px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(232,228,220,0.9)';
      ctx.fillText(author, 60, y + 60);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      resolve(texture);
    });
  });
}

export function createInnerRightPageTexture(
  heading: string,
  dateLine: string,
  placeLine: string,
  note: string
): Promise<THREE.CanvasTexture | null> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') {
      resolve(null);
      return;
    }

    document.fonts.ready.then(() => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 800;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(null);
        return;
      }

      ctx.fillStyle = '#fffdf5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#f0e4cf';
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.fillStyle = '#3d1a14';
      ctx.textAlign = 'left';

      ctx.font = 'bold 20px "Inter", sans-serif';
      ctx.fillStyle = '#7a5b3f';
      ctx.fillText(heading.toUpperCase(), 80, 150);

      ctx.fillStyle = '#3d1a14';
      ctx.font = 'bold 24px "Inter", sans-serif';
      ctx.fillText('Kiedy:', 80, 210);
      ctx.font = '22px "Inter", sans-serif';
      ctx.fillText(dateLine, 80, 245);

      ctx.font = 'bold 24px "Inter", sans-serif';
      ctx.fillText('Gdzie:', 80, 310);
      ctx.font = '22px "Inter", sans-serif';
      
      const placeWords = placeLine.split(' ');
      let pLine = '';
      let pY = 345;
      
      for(const w of placeWords) {
          if(ctx.measureText(pLine + w).width > 350) {
              ctx.fillText(pLine, 80, pY);
              pLine = w + ' ';
              pY += 30;
          } else {
              pLine += w + ' ';
          }
      }
      ctx.fillText(pLine, 80, pY);

      ctx.font = '18px "Inter", sans-serif';
      ctx.fillStyle = '#5a4634';
      const noteMaxWidth = canvas.width - 160;
      const noteWords = note.split(' ');
      let line = '';
      let y = 500;

      for (let i = 0; i < noteWords.length; i++) {
        const testLine = line + noteWords[i] + ' ';
        const w = ctx.measureText(testLine).width;
        if (w > noteMaxWidth && i > 0) {
          ctx.fillText(line, 80, y);
          line = noteWords[i] + ' ';
          y += 28;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 80, y);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      resolve(texture);
    });
  });
}

export function createShadowTexture(): THREE.Texture | null {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(
    128,
    128,
    10,
    128,
    128,
    120
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0.6)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}