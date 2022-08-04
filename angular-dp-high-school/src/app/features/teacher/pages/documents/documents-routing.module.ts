import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';
import { UpdateDocumentComponent } from './pages/update-document/update-document.component';
import { UploadDocumentComponent } from './pages/upload-document/upload-document.component';
import { ViewUploadedDocumentComponent } from './pages/view-uploaded-document/view-uploaded-document.component';
// import { ViewDocumentComponent } from './pages/view-document1/view-document.component';

const routes: Routes = [
  {path:'all-study-material',component:AllDocumentsComponent},
  {path:'upload-study-material',component:UploadDocumentComponent},
  {path:'all-study-material/view-study-material/:document_id',component:ViewUploadedDocumentComponent},
  {path:'all-study-material/update-study-material/:document_id',component:UpdateDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
