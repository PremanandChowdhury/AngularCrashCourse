import { Component, OnInit } from '@angular/core';
import * as xlsx from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-dynamic-message',
  templateUrl: './dynamic-message.component.html',
  styleUrls: ['./dynamic-message.component.css'],
})
export class DynamicMessageComponent implements OnInit {
  data: any = [];

  wopts: xlsx.WritingOptions = {
    bookType: 'xlsx',
    type: 'array',
  };

  onFileChange(e: any) {
    // Wire up the reader
    const target: DataTransfer = <DataTransfer>e.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      // read workbook
      const bstr: string = e.target.result;
      const wb: xlsx.WorkBook = xlsx.read(bstr, {
        type: 'binary',
      });

      // Grab first sheet
      const wsname: string = wb.SheetNames[0];
      const ws: xlsx.WorkSheet = wb.Sheets[wsname];

      // save data
      this.data = <AOA>xlsx.utils.sheet_to_json(ws, {
        header: 1,
      });

      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  constructor() {}

  ngOnInit() {}
}
