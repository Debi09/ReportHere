// Small employee dataset with intentional problems: duplicate IDs, missing and invalid emails,
// mixed date formats, a negative salary, blank rows, extra whitespace, missing departments, repeated records.
export const DEMO_CSV = `employee_id,name,email,department,salary,hire_date,phone
101,Asha Verma,asha.verma@example.com,Engineering,85000,2021-03-15,+91 98765 43210
102,Ravi Kumar,ravi.kumar@example.com,Sales,62000,15/04/2020,9876501234
103,  Meera Nair ,meera.nair@example,Marketing,58000,2019-07-01,98765 11111
104,John Smith,,Engineering,-4500,2022-01-10,555-0100
105,Priya Das,priya.das@example.com,,71000,March 3 2021,12
105,Priya Das,priya.das@example.com,,71000,March 3 2021,12
,,,,,,
106,Omar Khan,omar.khan@example.com,Sales,64000,2023-02-28,+1 415 555 0132
107,Lena Fox,lena.fox@example.com,Finance,590000,2020/11/05,415-555-0188
108,Tom Lee,tom.lee@example.com,sales,60500,2022-09-09,415-555-0199
102,Ravi Kumar,ravi.kumar@example.com,Sales,62000,15/04/2020,9876501234
,,,,,,
`;

export function demoFile(): File {
  return new File([new Blob([DEMO_CSV], { type: "text/csv" })], "demo_employees.csv", { type: "text/csv" });
}
