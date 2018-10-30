import { EditResultComponent } from './aurum/edit-result/edit-result.component';
import { DisplayResultComponent } from './aurum/display-result/display-result.component';
import { EvaluateTestComponent } from './aurum/evaluate-test/evaluate-test.component';
import { CreateExamComponent } from './aurum/create-exam/create-exam.component';
import { DisplayExamComponent } from './aurum/display-exam/display-exam.component';
import { NoticeComponent } from './aurum/notice/notice.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { CreateNoticeComponent } from './aurum/create-notice/create-notice.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    // redirectTo: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'dashboard',

    // loadChildren: './views/home/home.module#HomeModule',
    data: { title: 'This is my title' }
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'User'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notice',
        // loadChildren: './aurum/notice/notic',
        component: NoticeComponent,
        data: { title: 'Notice', breadcrumb: 'NOTICE'}
      },
      {
        path: 'create_notice',
        // loadChildren: './aurum/notice/notic',
        component: CreateNoticeComponent,
        data: { title: 'Create Notice', breadcrumb: 'CREATE NOTICE'}
      },
      {
        path: 'exam',
        // loadChildren: './aurum/notice/notic',
        component: DisplayExamComponent,
        data: { title: 'Exams', breadcrumb: 'Exams'}
      },
      {
        path: 'create_exam',
        // loadChildren: './aurum/notice/notic',
        component: CreateExamComponent,
        data: { title: 'Create Exam', breadcrumb: 'Create Exam'}
      },
      {
        path: 'evaluate_test',
        // loadChildren: './aurum/notice/notic',
        component: EvaluateTestComponent,
        data: { title: 'Evaluate Test', breadcrumb: 'Evaluate Test'}
      },
      {
        path: 'display_result',
        // loadChildren: './aurum/notice/notic',
        component: DisplayResultComponent,
        data: { title: 'Result', breadcrumb: 'Result'}
      },
      {
        path: 'edit_result',
        component: EditResultComponent,
        data: { title: 'Edit Result', breadcrumb: 'Edit Result'}
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD'}
      },
      {
        path: 'material',
        loadChildren: './views/material/app-material.module#AppMaterialModule',
        data: { title: 'Material', breadcrumb: 'MATERIAL'}
      },
      {
        path: 'dialogs',
        loadChildren: './views/app-dialogs/app-dialogs.module#AppDialogsModule',
        data: { title: 'Dialogs', breadcrumb: 'DIALOGS'}
      },
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: { title: 'Profile', breadcrumb: 'PROFILE'}
      },
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule',
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'tables',
        loadChildren: './views/tables/tables.module#TablesModule',
        data: { title: 'Tables', breadcrumb: 'TABLES'}
      },
      {
        path: 'tour',
        loadChildren: './views/app-tour/app-tour.module#AppTourModule',
        data: { title: 'Tour', breadcrumb: 'TOUR'}
      },
      {
        path: 'forms',
        loadChildren: './views/forms/forms.module#AppFormsModule',
        data: { title: 'Forms', breadcrumb: 'FORMS'}
      },
      {
        path: 'charts',
        loadChildren: './views/charts/charts.module#AppChartsModule',
        data: { title: 'Charts', breadcrumb: 'CHARTS'}
      },
      {
        path: 'map',
        loadChildren: './views/map/map.module#AppMapModule',
        data: { title: 'Map', breadcrumb: 'MAP'}
      },
      {
        path: 'dragndrop',
        loadChildren: './views/dragndrop/dragndrop.module#DragndropModule',
        data: { title: 'Drag and Drop', breadcrumb: 'DND'}
      },
      {
        path: 'inbox',
        loadChildren: './views/app-inbox/app-inbox.module#AppInboxModule',
        data: { title: 'Inbox', breadcrumb: 'INBOX'}
      },
      {
        path: 'calendar',
        loadChildren: './views/app-calendar/app-calendar.module#AppCalendarModule',
        data: { title: 'Calendar', breadcrumb: 'CALENDAR'}
      },
      {
        path: 'chat',
        loadChildren: './views/app-chats/app-chats.module#AppChatsModule',
        data: { title: 'Chat', breadcrumb: 'CHAT'}
      },
      {
        path: 'cruds',
        loadChildren: './views/cruds/cruds.module#CrudsModule',
        data: { title: 'CRUDs', breadcrumb: 'CRUDs'}
      },
      {
        path: 'shop',
        loadChildren: './views/shop/shop.module#ShopModule',
        data: { title: 'Shop', breadcrumb: 'SHOP'}
      },
      {
        path: 'icons',
        loadChildren: './views/mat-icons/mat-icons.module#MatIconsModule',
        data: { title: 'Icons', breadcrumb: 'MATICONS'}
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

