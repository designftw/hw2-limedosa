import { createApp } from "https://mavue.mavo.io/mavue.js";

globalThis.app = createApp(
  {
    data: {
      expenses: [],
    },

    computed: {
      total_balance() {
        let total = 0;

        for (let expense of this.expenses) {
          let trinity_paid = expense.trinity_paid ?? 0;
          let neo_paid = expense.neo_paid ?? 0;
          let trinity_paid_for_neo = expense.trinity_paid_for_neo ?? 0;
          let neo_paid_for_trinity = expense.neo_paid_for_trinity ?? 0;

          total +=
            (trinity_paid - neo_paid) / 2 +
            trinity_paid_for_neo -
            neo_paid_for_trinity;
        }

        return total;
      },
    },
  },
  "#app"
);
function addItem() {
  const item = document.getElementById("item").value;
  const price = parseFloat(document.getElementById("price").value);
  const neoSplit = parseInt(document.getElementById("Neo").value);
  const trinitySplit = parseInt(document.getElementById("Trinity").value);

  if (!item || isNaN(price) || isNaN(neoSplit) || isNaN(trinitySplit)) {
    alert("Please fill out all parts of the form!");
    return;
  }

  // Makes new expense object
  const expense = {
    title: item,
    trinity_paid: ((price * trinitySplit) / 100).toFixed(2),
    neo_paid: ((price * neoSplit) / 100).toFixed(2),
    trinity_paid_for_neo: "0.00",
    neo_paid_for_trinity: "0.00",
  };

  // Adds new expense to be spliy
  expenses.push(expense);

  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
  document.getElementById("Neo").value = "";
  document.getElementById("Trinity").value = "";
}
