import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'flaticon-dashboard', class: '' ,}, 
  { path: '/account-setting', title: 'Account Setting',  icon:'flaticon-settings', class: '' },
  { path: '/sms', title: 'SMS',  icon:'flaticon-chat', class: '' },
  { path: '/students', title: 'Students',  icon:'flaticon-classmates', class: 'sidebar-nav-item',
    children:[
    {path:'/all-students' , icon: 'fas fa-angle-right' , title: 'All Students', class: ''},
    {path:'/add-students' , icon: 'fas fa-angle-right' , title: 'Add Student', class: ''},
    {path:'/student-promotion' , icon: 'fas fa-angle-right' , title: 'Student Promotion', class: ''},
    ]
  },
  { path: '/teachers', title: 'Teachers',  icon:'flaticon-multiple-users-silhouette', class: 'sidebar-nav-item',
    children:[
    {path:'/all-teachers' , icon: 'fas fa-angle-right' , title: 'All Teachers', class: ''},
    {path:'/add-teacher' , icon: 'fas fa-angle-right' , title: 'Add Teacher', class: ''},
    ]
  },
  { path: '/parents', title: 'Parents',  icon:'flaticon-couple', class: 'sidebar-nav-item',
    children:[
    {path:'/all-parents' , icon: 'fas fa-angle-right' , title: 'All Parents', class: ''},
    ]
  },
  { path: '/teachers-meeting', title: 'Teachers Meeting',  icon:'flaticon-calendar', class: 'sidebar-nav-item',
    children:[
    {path:'/all-meetings' , icon: 'fas fa-angle-right' , title: 'All Meetings', class: ''},
    {path:'/add-meeting' , icon: 'fas fa-angle-right' , title: 'Add New Meeting', class: ''},
    ]
  },
  { path: '/holiday', title: 'Holiday',  icon:'flaticon-menu-1', class: 'sidebar-nav-item',
    children:[
    {path:'/all-holidays' , icon: 'fas fa-angle-right' , title: 'All Holidays', class: ''},
    {path:'/add-holiday' , icon: 'fas fa-angle-right' , title: 'Add New Holiday', class: ''},
    ]
  },
  { path: '/event', title: 'Event Management',  icon:'flaticon-script', class: 'sidebar-nav-item',
    children:[
    {path:'/all-events' , icon: 'fas fa-angle-right' , title: 'All Events', class: ''},
    {path:'/add-event' , icon: 'fas fa-angle-right' , title: 'Add New Event', class: ''},
    ]
  },
  { path: '/fees', title: 'Fees',  icon:'flaticon-technological', class: 'sidebar-nav-item',
    children:[
    {path:'/all-fees' , icon: 'fas fa-angle-right' , title: 'All Fees Collection', class: ''},
    {path:'/add-fee' , icon: 'fas fa-angle-right' , title: 'Add Fee Detail', class: ''},
    ]
  },
  { path: '/query', title: 'Query',  icon:'far fa-bell', class: 'sidebar-nav-item',
    children:[
    {path:'/all-queries' , icon: 'fas fa-angle-right' , title: 'All Queries', class: ''},
    {path:'/add-query-response' , icon: 'fas fa-angle-right' , title: 'Add Query Response', class: ''},
    ]
  },
  { path: '/inquiry', title: 'Inquiry',  icon:'far fa-bell', class: 'sidebar-nav-item',
    children:[
    {path:'/all-inquires' , icon: 'fas fa-angle-right' , title: 'All Inquires', class: ''},
    {path:'/add-inquiry-response' , icon: 'fas fa-angle-right' , title: 'Add Inquiry Response', class: ''},
    ]
  },
];

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css',
              ]
})
export class AdminSidebarComponent implements OnInit {

  public menuItems: any[] | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.addStyleSheet()
    // this.loadScript("../../../../assets/JS/jquery-3.5.1.js");
    // this.loadScript("../../../../assets/JS/plugins.js");
    // this.loadScript("../../../../assets/JS/popper.min.js");
    // this.loadScript("../../../../assets/JS/modernizr-3.6.0.min.js");
    // this.loadScript("../../../../assets/JS/jquery.counterup.min.js");
    // this.loadScript("../../../../assets/JS/moment.min.js");
    // this.loadScript("../../../../assets/JS/jquery.waypoints.min.js");
    // this.loadScript("../../../../assets/JS/jquery.scrollUp.min.js");
    // this.loadScript("../../../../assets/JS/fullcalendar.min.js");
    // this.loadScript("../../../../assets/JS/jquery.dataTables.min.js");
    // this.loadScript("../../../../assets/JS/select2.min.js");
    // this.loadScript("../../../../assets/JS/datepicker.min.js");
    // this.loadScript("../../../../assets/JS/Chart.min.js");
    // this.loadScript("../../../../assets/JS/main1.js");
  }

  addStyleSheet() {
    var headID = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.id = 'widget_styles';
    headID.appendChild(link);
  
    link.href = '../../../../assets/css/normalize.css';
    link.href = '../../../../assets/css/main.css';
    link.href = '../../../../assets/css/bootstrap.min.css';
    link.href = '../../../../assets/css/all.min.css';
    // link.href = '../../../../assets/fonts/flaticon.css';
    link.href = '../../../../assets/css/animate.min.css';
    // link.href = '../../../../assets/css/select2.min.css';
    link.href = '../../../../assets/css/datepicker.min.css';
    link.href = '../../../../assets/css/jquery.dataTables.min.css';
    link.href = '../../../../assets/css/dashboardstyle.css';
    
  }
  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }
}
