function countSupplier(transactionGroups) {
  const modifiedTransactionGroups = [];
  for (const transactionGroup of transactionGroups) {
    if (transactionGroup.type !== "purchase") {
      modifiedTransactionGroups.push(transactionGroup);
      continue;
    }

    // Collect all supplier id transaction
    const supplierIds = [];
    for (const transaction of transactionGroup.Transactions) {
      supplierIds.push(transaction.id);
    }

    // Create set from all supplier id
    const countSupplierId = new Set(supplierIds);

    // Add new key from supplier id set
    transactionGroup.supplierCount = countSupplierId.size;

    // Push new data to the array
    modifiedTransactionGroups.push(transactionGroup);
  }

  return modifiedTransactionGroups;
}

export default countSupplier;
