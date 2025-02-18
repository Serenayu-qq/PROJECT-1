document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".toggle-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const targetMenu = document.getElementById(button.dataset.target);

            // 关闭其他打开的菜单
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                if (menu !== targetMenu) {
                    menu.style.display = "none";
                }
            });

            // 切换当前菜单的显示状态
            if (targetMenu.style.display === "flex") {
                targetMenu.style.display = "none";
            } else {
                targetMenu.style.display = "flex";
            }
        });
    });
});
