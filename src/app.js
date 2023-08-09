"use strict";
const listContent = localStorage.getItem("listContent");
const listContentLocal = listContent ? JSON.parse(listContent) : [];
const btnAdd = document.querySelector('.btn-add');
btnAdd.addEventListener("click", () => {
    let contentValue = document.querySelector('#input-text').value;
    if (listContentLocal.length === 0) {
        const newContent = { id: 1, content: contentValue };
        listContentLocal.push(newContent);
        localStorage.setItem("listContent", JSON.stringify(listContentLocal));
    }
    else {
        const maxId = Math.max(...listContentLocal.map((note) => note.id));
        const newContent = { id: maxId + 1, content: contentValue };
        listContentLocal.push(newContent);
        localStorage.setItem("listContent", JSON.stringify(listContentLocal));
    }
    renderContent(listContentLocal);
});
function renderContent(data) {
    const printContent = document.querySelector('#warper-list-note');
    let content = "";
    data.forEach((item) => {
        content += ` <div class="display">
        <p>${item.content}</p>
        <button><i class='bx bx-trash' style='color:#bbacac' onclick =" deleteContent(${item.id})"  ></i></button>
     </div>   `;
    });
    printContent.innerHTML = content;
}
renderContent(listContentLocal);
function deleteContent(id) {
    listContentLocal.forEach((item, index) => {
        if (item.id === id) {
            listContentLocal.splice(index, 1);
            localStorage.setItem("listContent", JSON.stringify(listContentLocal));
            renderContent(listContentLocal);
        }
    });
}
