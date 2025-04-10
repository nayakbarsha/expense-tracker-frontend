declare var bootstrap: any;
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  expense: Expense = {
    title: '',
    description: '',
    amount: 0,
    date: ''
  };

  constructor(private expenseService: ExpenseService, private router: Router) {}

  

  saveExpense(): void {
    this.expenseService.create(this.expense).subscribe({
      next: () => {
        this.showModal();
      },
      error: (err) => {
        console.error('Error creating expense:', err);
        alert('Failed to create expense.');
      }
    });
  }
  // Show the modal after successfully creating an expense
  // This method is called when the user clicks the "Save" button
  // It uses Bootstrap's modal functionality to display a success message

  showModal() {
    const modalEl = document.getElementById('successModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }
  onModalHidden() {
    this.router.navigate(['/']);
  }
}
