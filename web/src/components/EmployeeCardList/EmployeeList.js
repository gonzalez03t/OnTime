import React from 'react';
import EmployeeCard from './EmployeeCard/EmployeeCard';
import './EmployeeList.css';

// TODO: concat list, add 'see more' button if too many
export default function EmployeeList({ employees }) {
  return (
    <div className="employee-list__container">
      {employees?.map((employee) => (
        <EmployeeCard key={employee.email} {...employee} />
      ))}
    </div>
  );
}
