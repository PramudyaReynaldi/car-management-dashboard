const handleActionEdit = (elementId) => {
   const el = document.getElementById(elementId);
   const inputName = document.getElementById("inputName");
   const inputDesc = document.getElementById("inputDesc");
   const inputPrice = document.getElementById("inputPrice");

   inputName.value = el.children[1].innerText;
   inputDesc.value = el.children[2].innerText;
   inputPrice.value = el.children[3].innerText;

   document.getElementById("buttonInsert").disabled = true;
   document.getElementById("buttonEdit").disabled = false;

   let menuId = elementId.split("-")[2];
   document.getElementById("buttonEdit").onclick = () => {
      handleSubmitEdit(menuId);
   };
   //document.getElementById("buttonEdit").setAttribute('onclick',`handleSubmitEdit(${menuId})`)
};

const handleInsertMenu = async () => {
   const inputName = document.getElementById("inputName");
   const inputDesc = document.getElementById("inputDesc");
   const inputPrice = document.getElementById("inputPrice");

   const resp = await fetch("http://localhost:7070/menu", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         name: inputName.value,
         description: inputDesc.value,
         price: inputPrice.value,
      }),
   });

   location.reload();
};

const handleSubmitEdit = async (menuId) => {
   const inputName = document.getElementById("inputName");
   const inputDesc = document.getElementById("inputDesc");
   const inputPrice = document.getElementById("inputPrice");

   const resp = await fetch(`http://localhost:7070/menu/${menuId}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         name: inputName.value,
         description: inputDesc.value,
         price: inputPrice.value,
      }),
   });

   location.reload();
};

const handleDelete = async (menuId) => {
   alert("Are you sure?");

   const resp = await fetch(`http://localhost:7070/menu/${menuId}`, {
      method: "DELETE",
   });
   location.reload();
};
