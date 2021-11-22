import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as xlsx from 'xlsx';

type AOA = any[][];
@Component({
  selector: 'app-dynamic-message',
  templateUrl: './dynamic-message.component.html',
  styleUrls: ['./dynamic-message.component.css'],
})
export class DynamicMessageComponent implements OnInit {
  data: any = [];
  headers: any = [];
  tableData: any = [];
  messageData: any = '';
  count = 0;

  // @ViewChild('headers') headersElem: ElementRef;
  // @ViewChild('headers') headersElem: ElementRef;

  @ViewChild('d_message')
  dMessageElem!: ElementRef;

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
      this.setHeader(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  constructor() {}

  ngOnInit() {}

  setHeader(data: any) {
    this.headers = data[0];
    console.log(this.headers);
  }

  selectHeader(head: any) {
    console.log(head.value);

    this.dMessageElem.nativeElement.value += '{' + head + '}';
  }

  showPreview() {
    this.count += 1;

    console.log(this.dMessageElem);

    if (this.count === 1) {
      this.data.map((item: any, i: number) => {
        if (i !== 0) this.tableData.push(item);
      });
      console.log(this.headers, this.tableData);
    }
  }
}
