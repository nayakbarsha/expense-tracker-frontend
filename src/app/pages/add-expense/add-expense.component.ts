declare var bootstrap: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit {
  isEditMode = false;
  expenseId!: number;
  expense: Expense = {
    id: 0,
    title: '',
    description: '',
    amount: 0,
    date: ''
  };

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.expenseId = +idParam;
      this.expenseService.get(this.expenseId).subscribe({
        next: (data) => this.expense = data,
        error: (err) => {
          console.error('Failed to load expense:', err);
          alert('Error loading expense');
        }
      });
    }
  }

  saveExpense(): void {
    // if (!this.expense.title || !this.expense.amount || !this.expense.date) {
    //   alert('Please fill out all fields before saving.');
    //   return;
    // }
  
    if (this.isEditMode) {
      this.expenseService.update(this.expenseId, this.expense).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => {
          console.error('Error updating expense:', err);
          alert('Failed to update expense.');
        }
      });
    } else {
      this.expenseService.create(this.expense).subscribe({
        next: () => this.showModal(),
        error: (err) => {
          console.error('Error creating expense:', err);
          alert('Failed to create expense.');
        }
      });
    }
  }

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
