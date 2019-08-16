import { Component, OnInit, Input } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PDFAnnotationData, PDFRenderTextLayer } from 'pdfjs-dist';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { getTestBed } from '@angular/core/testing';


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss'],
  animations: [routerTransition()]

})
export class RecetaComponent implements OnInit {
  pdfSrc = 'assets/docs/formato_receta.pdf';
  // screen DPI / PDF DPI
  readonly dpiRatio = 96 / 72;

    constructor() {
     }


    private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
        // add input to page
        console.log(annotation);

    }




  loadComplete(pdf: PDFDocumentProxy): void {
      for (let i = 1; i <= pdf.numPages; i++) {

          // track the current page
          let currentPage = null;
          pdf.getPage(i).then(p => {
              currentPage = p;

              // get the annotations of the current page
              console.log(p.getTextContent);
              return p.getAnnotations();
          }).then(ann => {

              // ugly cast due to missing typescript definitions
              // please contribute to complete @types/pdfjs-dist
              const annotations = (<any>ann) as PDFAnnotationData[];

              annotations
                  .filter(a => a.subtype === 'Widget') // get the form field annotation only
                  .forEach(a => {

                      // get the rectangle that represent the single field
                      // and resize it according to the current DPI
                      const fieldRect = currentPage.getViewport(this.dpiRatio)
                                                  .convertToViewportRectangle(a.rect);

                      // add the corresponding input
                      this.addInput(a, fieldRect);
                  });
          });
      }
  }

  ngOnInit() {

  }

}
