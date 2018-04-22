import { Component, Input } from '@angular/core';

@Component({
    selector: 'simple-modal2',
    template: `
    <div id="simple-modal2">
   
  </div>
    `,
styles: [`
 .modal-body { height:250px; overflow-y:scroll }
`]
})

export class SimpleModal2Component {
   @Input() title:string;
}