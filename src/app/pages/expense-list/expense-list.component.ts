import { Component, inject } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);
  expenses: Expense[] = [];

  constructor() {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe({
      next: (data) => this.expenses = data,
      error: (err) => console.error('Error fetching expenses:', err)
    });
  }
}
