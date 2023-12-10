const Employee = require("../models/Employee");
const Supplier = require("../models/Supplier");

async function addSellerToTransactionGroup(transactionGroup) {
  // Create object from transaction group
  const transactionGroupObj = transactionGroup.toJSON();

  // Search seller id in supplier table
  const supplier = await Supplier.findByPk(transactionGroupObj.seller);
  // If there is seller id in supplier table
  if (supplier) {
    const supplierObj = supplier.toJSON();
    transactionGroupObj.seller = supplierObj;
    return transactionGroupObj;
  }

  // Search seller id in employee table
  const employee = await Employee.findByPk(transactionGroupObj.seller);
  if (employee) {
    const employeeObj = employee.toJSON();
    transactionGroupObj.seller = employeeObj;
    return transactionGroupObj;
  }

  return transactionGroupObj;
}

module.exports = addSellerToTransactionGroup;
