add = document.getElementById("add");
function getandupdate() {
  let tit = document.getElementById('title').value;
  let desc = document.getElementById('description').value;
  console.log("Updating List...");

  if (tit == "" && desc == "") {
    alert('Enter title and description')
  } else {
    if (localStorage.getItem('itemsJson') == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } else {
      itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'))
      itemJsonArray.push([tit, desc])
      localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
  }
  Update()
}
function Update() {
  if (localStorage.getItem('itemsJson') == null) {
    itemJsonArray = [];
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  } else {
    itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'))
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  }
  // populate the table
  let tableBody = document.getElementById('tableBody')
  let str = ""
  itemJsonArray.forEach((element, index) => {
    str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td> 
                    <td><button class="btn btn-sm btn-danger" onclick="deleted(${index})">Delete</button></td> 
                  </tr>`
  });
  tableBody.innerHTML = str
  document.getElementById('title').value = ""
  document.getElementById('description').value = ""
}
function deleted(itemIndex) {
  console.log("Deleted", itemIndex + 1)
  itemJsonArray = JSON.parse(localStorage.getItem('itemsJson'))
  //Delete itemIndex element from the Array
  itemJsonArray.splice(itemIndex, 1)
  localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
  Update()
}
function clearStorage() {
  if (confirm('Do you really want to Clear List?')) {
    console.log('Clearing the Storage')
    localStorage.clear()
    Update()
  }
}
add.addEventListener("click", getandupdate);
Update()