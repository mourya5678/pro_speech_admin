$(document).ready(function () {
	new DataTable('#example');
})
ClassicEditor
	.create(document.querySelector('#editor'))
	.catch(error => {
		console.error(error);
	});