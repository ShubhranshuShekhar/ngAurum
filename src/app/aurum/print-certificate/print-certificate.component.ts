import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-print-certificate',
  templateUrl: './print-certificate.component.html',
  styleUrls: ['./print-certificate.component.scss']
})
export class PrintCertificateComponent implements OnInit {
  public division: string
  public firstName: string
  public lastName: string
  public serialNo: string

  constructor(private router: Router, private route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.division = params["division"]
      this.firstName = params["firstName"]
      this.lastName = params["lastName"]
      this.serialNo = params["serialNo"]
    })
  }

  ngOnInit() {
  }
  onPrintCertificate(){
    console.log("Print certificate clicked!!")
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
