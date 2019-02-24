var itemNumber = 1;

function appendListItem(id) {
	//debugger;
	var olNode = document.getElementById(id);
	var liNode = document.createElement('li');

	var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "name";
		checkbox.value = "value";
		checkbox.id = "id";
	var label = document.createElement('label')
		label.htmlFor = "id";
		label.appendChild(document.createTextNode('#' + itemNumber + 'To Do:'));
	
	liNode.appendChild(checkbox);
	liNode.appendChild(label);

	olNode.appendChild(liNode)
	itemNumber += 1;
}