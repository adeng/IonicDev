import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
    templateUrl: 'app/modals/ma-modal.html'
})

export class MovingAvgModal {
  m1: Control = new Control('');
  m2: Control = new Control('');
  m3: Control = new Control('');
  m4: Control = new Control('');
  m5: Control = new Control('');
  m6: Control = new Control('');
  maForm: ControlGroup = new ControlGroup({
    "m1": this.m1,
    "m2": this.m2,
    "m3": this.m3,
    "m4": this.m4,
    "m5": this.m5,
    "m6": this.m6
  });
  
  constructor(nav: NavParams) {
  }
  
  closePage() {
      let a = [];
      if( this.m1.value )
          a.push("m5");
      if( this.m2.value )
          a.push("m10");
      if( this.m3.value )
          a.push("m20");
      if( this.m4.value )
          a.push("m50");
      if( this.m5.value )
          a.push("m100");
      if( this.m6.value )
          a.push("m200");
      this.close(a);
  }
}