import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css',
              // '../../../assets/css/normalize.css',
              // '../../../assets/css/main.css',
              // '../../../assets/css/bootstrap.min.css',
              // '../../../assets/css/all.min.css',
              // '../../../assets/fonts/flaticon.css',
              // '../../../assets/css/animate.min.css',
              // '../../../assets/css/select2.min.css',
              // '../../../assets/css/datepicker.min.css',
              // '../../../assets/css/jquery.dataTables.min.css',
              // '../../../assets/css/dashboardstyle.css',]
            ]
              
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() 
  {
    this.loadScript("../../../assets/JS/plugins.js");
    this.loadScript("../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../assets/JS/plugins.js");
    this.loadScript("../../../assets/JS/popper.min.js");
    this.loadScript("../../../assets/JS/bootstrap.min.js");
    this.loadScript("../../../assets/JS/modernizr-3.6.0.min.js");
    this.loadScript("../../../assets/JS/jquery.counterup.min.js");
    this.loadScript("../../../assets/JS/moment.min.js");
    this.loadScript("../../../assets/JS/jquery.waypoints.min.js");
    this.loadScript("../../../assets/JS/jquery.scrollUp.min.js");
    this.loadScript("../../../assets/JS/fullcalendar.min.js");
    this.loadScript("../../../assets/JS/jquery.dataTables.min.js");
    this.loadScript("../../../assets/JS/select2.min.js");
    this.loadScript("../../../assets/JS/datepicker.min.js");
    this.loadScript("../../../assets/JS/Chart.min.js");
    this.loadScript("../../../assets/JS/main1.js");
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    //for not loading js again.
    if(!body.contains(script))
    {
      body.appendChild(script);
    }
  }
}
