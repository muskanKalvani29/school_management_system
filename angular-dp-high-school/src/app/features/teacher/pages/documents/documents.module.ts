import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { AllDocumentsComponent } from './pages/all-documents/all-documents.component';
import { UploadDocumentComponent } from './pages/upload-document/upload-document.component';
// import { ViewDocumentComponent } from './pages/view-document1/view-document.component';
import { UpdateDocumentComponent } from './pages/update-document/update-document.component';
import { FormsModule } from '@angular/forms';
// import { ViewUploadedDocumentComponent } from './pages/view-uploaded-document/view-uploaded-document.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AllDocumentsComponent, UploadDocumentComponent, UpdateDocumentComponent,],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    FormsModule,
    MatDialogModule
  ]
})
export class DocumentsModule { }
