const btn = document.querySelector(".my-btn");
btn.onclick = function(e) {
    let ripple = document.createElement("span");

    ripple.classList.add("ripple");

    this.appendChild(ripple);

    let x = e.clientX - e.target.offsetLeft;

    let y = e.clientY - e.target.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
        ripple.remove();
    }, 300);
};