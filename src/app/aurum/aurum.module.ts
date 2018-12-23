import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice/notice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
 } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from './../shared/shared.module';

import { CreateNoticeComponent } from './create-notice/create-notice.component';
import { DisplayExamComponent } from './display-exam/display-exam.component';
import { AurumComponent } from './aurum.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { EvaluateTestComponent } from './evaluate-test/evaluate-test.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { EditResultComponent } from './edit-result/edit-result.component';
import { CreateAttendanceComponent } from './attendance/create-attendance/create-attendance.component';
import { CertificateComponent } from './certificate/certificate.component';
import { PrintCertificateComponent } from './print-certificate/print-certificate.component';
import { NewsComponent } from './news/news.component';
import { UploadNewsComponent } from './upload-news/upload-news.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    NgxDatatableModule,


    FlexLayoutModule,
  ],
  declarations: [NoticeComponent, CreateNoticeComponent, DisplayExamComponent, AurumComponent, CreateExamComponent, EvaluateTestComponent, DisplayResultComponent, EditResultComponent, CreateAttendanceComponent, CertificateComponent, PrintCertificateComponent, NewsComponent, UploadNewsComponent],
  bootstrap: [AurumComponent]

})
export class AurumModule { }
