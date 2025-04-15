import { Routes } from '@angular/router';
import { ExpenseListComponent } from './pages/expense-list/expense-list.component';
import { AddExpenseComponent } from './pages/add-expense/add-expense.component';

export const routes: Routes = [
    {path: '', component:ExpenseListComponent},
    {path: 'add', component:AddExpenseComponent},
    {path: 'edit/:id', component:AddExpenseComponent},
];
