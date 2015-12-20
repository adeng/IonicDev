import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {Control, ControlGroup} from 'angular2/angular2';

@Page({
    templateUrl: 'app/modals/date-modal.html'
})

export class DateRangeModal {
  date: Control = new Control('');
  dateForm: ControlGroup = new ControlGroup({
    "date": this.date
  });
  
  constructor(nav: NavParams) {
      this.date.value = nav.get('date');
  }
  
  closePage() {
      this.close(this.date.value);
  }
}