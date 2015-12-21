import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
    templateUrl: 'app/modals/ema-modal.html'
})

export class ExpAvgModal {
  em1: Control = new Control('');
  em2: Control = new Control('');
  em3: Control = new Control('');
  em4: Control = new Control('');
  em5: Control = new Control('');
  em6: Control = new Control('');
  emaForm: ControlGroup = new ControlGroup({
    "em1": this.em1,
    "em2": this.em2,
    "em3": this.em3,
    "em4": this.em4,
    "em5": this.em5,
    "em6": this.em6
  });
  
  constructor(nav: NavParams) {
  }
  
  closePage() {
      let a = [];
      if( this.em1.value )
          a.push("e5");
      if( this.em2.value )
          a.push("e10");
      if( this.em3.value )
          a.push("e20");
      if( this.em4.value )
          a.push("e50");
      if( this.em5.value )
          a.push("e100");
      if( this.em6.value )
          a.push("e200");
      this.close(a);
  }
}