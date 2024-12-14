import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from '../services/employee.service';
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.scss']
})
export class EmployeedetailsComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });

    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.isEditMode = true;
        this.loadEmployeeData();
      }
    });
  }

  loadEmployeeData(): void {
    const employees = this.employeeService.getEmployees();
    const employee = employees.find((e) => e.id === this.employeeId);
    if (employee) {
      this.employeeForm.patchValue(employee);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        id: this.isEditMode ? this.employeeId! : uuidv4(),
        ...this.employeeForm.value,
      };

      if (this.isEditMode) {
        this.employeeService.updateEmployee(employee);
      } else {
        this.employeeService.addEmployee(employee);
      }

      this.router.navigate(['/']);
    }
  }
}