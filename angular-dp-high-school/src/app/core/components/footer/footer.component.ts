import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css',
              ]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void 
  {
    this.addStyleSheet()
  }

  addStyleSheet() {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'widget_styles';
    headID.appendChild(link);
  
    // link.href = '../../../../assets/css/normalize.css';
    // link.href = '../../../../assets/css/main.css';
    // link.href = '../../../../assets/css/bootstrap.min.css';
    // link.href = '../../../../assets/css/all.min.css';
    // link.href = '../../../../assets/fonts/flaticon.css';
    // link.href = '../../../../assets/css/animate.min.css';
    // link.href = '../../../../assets/css/select2.min.css';
    // link.href = '../../../../assets/css/datepicker.min.css';
    // link.href = '../../../../assets/css/jquery.dataTables.min.css';
    // link.href = '../../../../assets/css/dashboardstyle.css';
  }
}
