import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentEmployees: Employee[] = [];
  previousEmployees: Employee[] = [];
  selectedEmployeeId: string | null = null; // Track selected employee

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    const allEmployees = this.employeeService.getEmployees();
    const today = new Date().toISOString().split('T')[0];

    this.currentEmployees = allEmployees.filter((emp) => !emp.endDate || emp.endDate > today);
    this.previousEmployees = allEmployees.filter((emp) => emp.endDate && emp.endDate <= today);
  }

  onSelectEmployee(id: string): void {
    // Set the selected employee's ID when clicked
    this.selectedEmployeeId = id === this.selectedEmployeeId ? null : id; // Toggle selection
  }

  onEditEmployee(id: string): void {
    // Navigate to the edit page with the employee ID
    this.router.navigate(['/employee/edit', id]);
  }

  onDeleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.loadEmployees(); // Refresh the employee data after deletion
    }
  }
}
