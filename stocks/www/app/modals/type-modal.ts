import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
    templateUrl: 'app/modals/type-modal.html'
})

export class TypeModal {
  type: Control = new Control('');
  typeForm: ControlGroup = new ControlGroup({
    "type": this.type
  });
  
  constructor(nav: NavParams) {
      this.type.value = nav.get('type');
  }
  
  closePage() {
      this.close(this.type.value);
  }
}