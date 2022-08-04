import { Component, OnInit } from '@angular/core';
import {FeeStructure} from 'src/app/core/model/FeeStructure';
import {FeeStructureService} from 'src/app/features/admin/pages/fee-structure/services/fee-structure.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-admission-detail',
  templateUrl: './admission-detail.component.html',
  styleUrls: ['./admission-detail.component.css',
              // '../../../../assets/css/font-awesome.min.css',
              // '../../../../assets/css/animate.css',
              // '../../../../assets/css/off-canvas.css',
              // '../../../../assets/css/rsmenu-main.css',
              // '../../../../assets/css/style1.css',
              // '../../../../assets/css/responsive.css']
            ]
})
export class AdmissionDetailComponent implements OnInit {

  feeStucture1:Array<FeeStructure>= new Array();
  feeStucture2:Array<FeeStructure>= new Array();

  feeData1:FeeStructure;
  feeData2:FeeStructure;
  feeData3:FeeStructure;
  feeData4:FeeStructure;
  feeData5:FeeStructure;
  feeData6:FeeStructure;
  constructor(private FeeStructureService: FeeStructureService,private router : Router) { }

  ngOnInit(): void 
  {

    this.loadScript("../../../../assets/JS/modernizr-3.6.0.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    // this.loadScript("node_modules/bootstrap/dist/js/bootstrap.min.js");
    this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    this.loadScript("../../../../assets/JS/rsmenu-main.js");
    this.loadScript("../../../../assets/JS/isotope.pkgd.min.js");
    this.loadScript("../../../../assets/JS/wow.min.js");
    this.loadScript("../../../../assets/JS/jquery.counterup.min.js");
    this.loadScript("../../../../assets/JS/jquery.waypoints.min.js");
    this.loadScript("../../../../assets/JS/jquery.magnific-popup.min.js");
    this.loadScript("../../../../assets/JS/plugins.js");
    this.loadScript("../../../../assets/JS/contact.form.js");
    this.loadScript("../../../../assets/JS/main2.js");


    this.feeStructureList();
  }
  handleError(error)
  {
  console.log("status code..");  
  console.log(error);
  if(error==404)
  {
    console.log("hi")
    this.router.navigate(['/page-not-found']);
  }
  else if(error==500)
  {
    console.log("hi")
    this.router.navigate(['/internal-server-error']);
  }
  else
  {
    console.log("hi")
    this.router.navigate(['/error-page']);
  }
}
  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);   
  }

  feeStructureList(){
    this.FeeStructureService.getFeeStructureByMedium("English").subscribe(data=>{
      this.feeStucture1=data;
      console.log(this.feeStucture1);
      console.log(this.feeStucture1[0]);
      console.log(this.feeStucture1[8]);
      this.feeData1=this.feeStucture1[0];
    this.feeData2=this.feeStucture1[3];
    this.feeData3=this.feeStucture1[11];
    },error=>{
      this.handleError(error);
    })

    

    this.FeeStructureService.getFeeStructureByMedium("Gujarati").subscribe(data=>{
      this.feeStucture2=data;
      console.log("gujarati");
      console.log(this.feeStucture2);
      this.feeData4=this.feeStucture2[0];
      this.feeData5=this.feeStucture2[3];
      this.feeData6=this.feeStucture2[11];
    },error=>{
      this.handleError(error);
    })


  }

}
