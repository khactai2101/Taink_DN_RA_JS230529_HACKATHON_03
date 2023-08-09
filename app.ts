interface Content {
    id: number;
    content: string;
}

const listContent = localStorage.getItem("listContent");
const listContentLocal = listContent ? JSON.parse(listContent) : [];

const btnAdd = document.querySelector('.btn-add') as HTMLElement;
btnAdd.addEventListener("click", () => {
    let contentValue = (document.querySelector('#input-text') as HTMLInputElement).value;

    if (listContentLocal.length === 0) {
        const newContent: object = { id: 1, content: contentValue };
        listContentLocal.push(newContent);
        localStorage.setItem("listContent", JSON.stringify(listContentLocal));
    } else {
        const maxId = Math.max(...listContentLocal.map((note: any) => note.id));

        const newContent: object = { id: maxId + 1, content: contentValue };
        listContentLocal.push(newContent);
        localStorage.setItem("listContent", JSON.stringify(listContentLocal));

    } renderContent(listContentLocal)
})
function renderContent(data: any) {
    const printContent = document.querySelector('#warper-list-note') as HTMLDivElement;
    let content = "";
    data.forEach((item: any) => {
        content += ` <div class="display">
        <p>${item.content}</p>
        <button><i class='bx bx-trash' style='color:#bbacac' onclick =" deleteContent(${item.id})"  ></i></button>
     </div>   `
    });
    printContent.innerHTML = content;
}
renderContent(listContentLocal)
function deleteContent(id: number) {
    listContentLocal.forEach((item: any, index: number) => {
        if (item.id === id) {
            listContentLocal.splice(index, 1)
            localStorage.setItem("listContent", JSON.stringify(listContentLocal));
            renderContent(listContentLocal)
        }
    });


}