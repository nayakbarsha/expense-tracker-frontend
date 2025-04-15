declare var bootstrap: any;

import { Component, inject } from '@angular/core';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  selectedExpenseId: number | null = null;
  private deleteModal: any;

  constructor() {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe({
      next: (data) => {
        // Sort expenses by date (ascending)
        this.expenses = data.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      },
      error: (err) => console.error('Error fetching expenses:', err)
    });
  }

  openDeleteModal(id: number): void {
    this.selectedExpenseId = id;
    const modalEl = document.getElementById('confirmDeleteModal');
    if (modalEl) {
      this.deleteModal = new bootstrap.Modal(modalEl);
      this.deleteModal.show();
    }
  }

  confirmDelete(): void {
    if (this.selectedExpenseId !== null) {
      this.expenseService.delete(this.selectedExpenseId).subscribe({
        next: () => {
          this.deleteModal.hide();
          this.loadExpenses(); // Refresh list
        },
        error: (err) => {
          console.error('Error deleting expense:', err);
          alert('Failed to delete expense.');
        }
      });
    }
  }
}
