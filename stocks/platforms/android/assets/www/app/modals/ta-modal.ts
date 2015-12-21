import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
    templateUrl: 'app/modals/ta-modal.html'
})

export class TechIndicatorsModal {
  bb: Control = new Control('');
  ps: Control = new Control('');
  v: Control = new Control('');
  taForm: ControlGroup = new ControlGroup({
    "bb": this.bb,
    "ps": this.ps,
    "v": this.v
  });
  
  constructor(nav: NavParams) {
  }
  
  closePage() {
      let a = [];
      if( this.bb.value )
          a.push("b");
      if( this.ps.value )
          a.push("p");
      if( this.v.value )
          a.push("v");
      this.close(a);
  }
}