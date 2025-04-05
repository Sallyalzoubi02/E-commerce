import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  dataForm: any;

  setDataForm(data: any) {
    this.dataForm = data;
  }

  getDataForm() {
    return this.dataForm;
  }
}

