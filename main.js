const showDealsBtn = document.querySelector('#show-deals');
const minSumInput = document.querySelector('#min-sum');
const dealsTable = document.querySelector('#deals-table');
const totalLeads = document.querySelector('#total-leads');

const methods = {
	CRM_DEALS_LIST: 'crm.deal.list',
}

function handleDealsResponse(result, minSum = 0, tbody) {
	if (result.error()) {
		tbody.innerHTML = `<tr><td colspan='3'>Ошибка ${result.error()}</td></tr>`;
		return;
	}

	const deals = result.data().filter(
		d => parseFloat(d.OPPORTUNITY) >= minSum
	);
	
	totalLeads.textContent = deals.length;

	tbody.innerHTML = "";
	deals.forEach(d => {
		tbody.insertAdjacentHTML("beforeend",
			`<tr>
				<td>${d.ID}</td>
				<td>${d.TITLE}</td>
				<td>${d.OPPORTUNITY}</td>
			</tr>`
		);
	});
}

function loadDeals() {
	const minSum = parseFloat(minSumInput.value) || 0;
	const tbody = dealsTable.querySelector('tbody');
	tbody.innerHTML = "<tr><td colspan='3'>Загрузка...</td></tr>";
	BX24.callMethod(
		methods.CRM_DEALS_LIST,
		{ select: ["ID", "TITLE", "OPPORTUNITY"] },
		result => handleDealsResponse(result, minSum, tbody)
	)
}

showDealsBtn.addEventListener("click", loadDeals);