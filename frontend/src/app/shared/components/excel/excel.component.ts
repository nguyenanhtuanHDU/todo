import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.scss']
})
export class ExcelComponent {
  constructor(private toast: ToastrService) {

  }
  fileName: string = ''
  data: any

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(data);
    const workbook: xlsx.WorkBook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };

    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const fileNameWithDate = `${fileName}_${date}.xlsx`;

    this.saveAsExcelFile(blob, fileNameWithDate);
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const link: HTMLAnchorElement = document.createElement('a');

    link.href = window.URL.createObjectURL(data);
    link.download = fileName;
    link.click();
  }

  onExport() {
    if (!this.data) {
      this.toast.error("Data not found")
      return
    }
    if (!this.fileName) {
      this.toast.error("File name not found")
      return
    }
    if(confirm("Export to excel now ?")){
      this.exportToExcel(this.data, this.fileName, 'Sheet1')
    }
  }
}
