import {Modal, Page, NavParams} from 'ionic-framework/ionic';
import {DateRangeModal} from '../modals/date-modal';
import {TypeModal} from '../modals/type-modal';
import {DateModalPipe, TypeModalPipe} from '../libs/pipes/chart-pipe';

@Page({
    templateUrl: 'app/modals/options-modal.html',
    pipes: [DateModalPipe, TypeModalPipe]
})

export class OptionsModal {
  options: Array<any>;
  modal: Modal;
  
  constructor(nav: NavParams, modal: Modal) {
      this.options = nav.get('options');
      this.modal = modal;
  }
  
  closePage() {
      this.close(this.options);
  }
  
    openDateModal() {
        this.modal.open(DateRangeModal, {date: this.options[0]}).then( modalRef => {
            modalRef.onClose = data => {
                if(data != "")
                    this.options[0] = data;
            }
        });
    }
    
    openTypeModal() {
        this.modal.open(TypeModal, {type: this.options[1]}).then( modalRef => {
            modalRef.onClose = data => {
                if(data != "")
                    this.options[1] = data;
            }
        });
    }
}