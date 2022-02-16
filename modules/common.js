const fetch = require('node-fetch');

const request = (options, callback) => {
	var headers = {
		"Content-Type": "application/json"
	};
	return fetch(options.uri, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(options.body),
	}).then(function (res) {
		callback(null, res);
	}).catch(function (err) {
		callback(err);
	});
}

const paginationData = (page_number, page_size, count) => {
	const pageNumber = parseInt(page_number);
	const pageSize = parseInt(page_size);
	const totalPage = Math.ceil(count / pageSize);
	const pagination = {
		current_page: pageNumber,
		page_size: pageSize,
		total_page: totalPage,
		first_page: 1,
		next_page: totalPage > pageNumber ? (pageNumber + 1) : pageNumber,
		prev_page: 1 < pageNumber ? (pageNumber - 1) : pageNumber,
	};
	return pagination;
}

module.exports = {
	request,
	paginationData
}