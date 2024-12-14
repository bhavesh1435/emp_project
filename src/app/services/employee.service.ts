import { Injectable } from '@angular/core';

export interface Employee {
  id: string; // Unique ID for each employee
  name: string;
  role: string;
  startDate: string;
  endDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private storageKey = 'employeeData';

  constructor() {}

  // Get all employees
  getEmployees(): Employee[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save employees to LocalStorage
  saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(employees));
  }

  // Add a new employee
  addEmployee(employee: Employee): void {
    const employees = this.getEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
  }

  // Update an employee
  updateEmployee(updatedEmployee: Employee): void {
    const employees = this.getEmployees();
    const index = employees.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      employees[index] = updatedEmployee;
      this.saveEmployees(employees);
    }
  }

  // Delete an employee
  deleteEmployee(id: string): void {
    const employees = this.getEmployees();
    const filtered = employees.filter((e) => e.id !== id);
    this.saveEmployees(filtered);
  }
}
