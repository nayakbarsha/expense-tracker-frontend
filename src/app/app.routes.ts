import { Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';
import { AuthpageComponent } from './pages/authpage/authpage.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    // {path: 'auth', redirectTo: 'auth/login', pathMatch: 'full'},
    {path: 'auth/login', component:AuthpageComponent},
    {path: 'auth/signup', component:SignupComponent},
    {path: 'list', component:ExpenseListComponent},
    {path: 'add', component:AddExpenseComponent},
    {path: 'edit/:id', component:AddExpenseComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'login', component:AuthpageComponent},
];
