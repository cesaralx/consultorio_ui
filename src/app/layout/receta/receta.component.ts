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

  Input = {
    nombre:  'nada'
  };




  public myForm: FormGroup;
    public inputList: Input[] = [];

    constructor(private _fb: FormBuilder) {
      this.myForm = this._fb.group({});
     }

  //    private createInput(annotation: PDFAnnotationData, rect: number[] = null) {
  //     let formControl = new FormControl(annotation.buttonValue || '');

  //     const input = new Input();
  //     input.name = annotation.fieldName;

  //     if (annotation.fieldType === 'Tx') {
  //         input.type = 'text';
  //         input.value = annotation.buttonValue || '';
  //     }

  //     // Calculate all the positions and sizes
  //     if (rect) {
  //         input.top = rect[1] - (rect[1] - rect[3]);
  //         input.left = rect[0];
  //         input.height = (rect[1] - rect[3]);
  //         input.width = (rect[2] - rect[0]);
  //     }

  //     this.inputList.push(input);
  //     return formControl;
  // }


  //    private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
  //     // add input to page
  //     this.myForm.addControl(annotation.fieldName, this.createInput(annotation, rect));
  // }

    private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
        // add input to page
        console.log(annotation);

    }

  //   public getInputPosition(input: Input): any {
  //     return {
  //         top: `${input.top}px`,
  //         left: `${input.left}px`,
  //         height: `${input.height}px`,
  //         width: `${input.width}px`,
  //     };
  // }




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
