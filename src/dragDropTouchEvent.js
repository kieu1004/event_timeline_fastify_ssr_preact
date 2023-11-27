const sortableListTouch = document.querySelector(".sortable-list");
const itemsTouch = sortableList.querySelectorAll(".item");

itemsTouch.forEach(item => {
    item.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        const offsetX = touch.clientX - item.getBoundingClientRect().left;
        const offsetY = touch.clientY - item.getBoundingClientRect().top;
        
        item._touchInfo = {
            offsetX,
            offsetY
        };
        
        setTimeout(() => item.classList.add("dragging"), 0);
    });

    item.addEventListener("touchend", () => {
        item.classList.remove("dragging");
        delete item._touchInfo;
    });
});

const initSortableListTouch = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    
    if (draggingItem) {
        let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

        let nextSibling = siblings.find(sibling => {
            return e.touches[0].clientY - draggingItem._touchInfo.offsetY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });

        sortableList.insertBefore(draggingItem, nextSibling);
    }
};

sortableListTouch.addEventListener("touchmove", initSortableListTouch);