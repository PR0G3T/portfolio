declare module 'html2canvas' {
  const html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;
  export default html2canvas;
}

declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: any);
    internal: { pageSize: { getWidth(): number; getHeight(): number } };
    addImage(imageData: string, format: string, x: number, y: number, width: number, height: number, alias?: string, compression?: string): void;
    save(filename?: string): void;
  }
}



