window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    const spanOrderId = document.querySelector('#orderId');
    spanOrderId.innerText = orderId;

}
