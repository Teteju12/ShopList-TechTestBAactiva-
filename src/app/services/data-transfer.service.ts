import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  dataTransferList: any[] = [];
  dataTransferObservable: any;


  constructor() {
    this.dataTransferList = [
      {
        "varname": "template",
        "data": undefined
      }
    ];
    this.dataTransferObservable = of(this.dataTransferList);
  }

  insertData(_varname: string, _data: any){
    if(this.dataTransferList.find(element => element.varname == _varname)){ //then the object exists in the list
      this.dataTransferList.find(element => element.varname == _varname).data = _data;
      console.info("[TDS] Updated to dataTrasnferList var \'" + _varname + "\' with data =>");
      console.log(_data);
    }
    else{ //then it doesnt exists
      this.dataTransferList.push({"varname": _varname, "data": _data});
      console.info("[TDS] Added to dataTrasnferList var \'" + _varname + "\' with data =>");
      console.log(_data);
    }
  }

  getData(_varname: string): any{
    if(this.dataTransferList.find(element => element.varname == _varname))
      return this.dataTransferList.find(element => element.varname == _varname).data;

    return null;
  }

  getdataTransferList(){
    return this.dataTransferList;
  }

  getObservableData(_varname: string){
    if(this.dataTransferList.find(element => element.varname == _varname))
      return of(this.dataTransferList.find(element => element.varname == _varname).data);

    return null;
  }
}
