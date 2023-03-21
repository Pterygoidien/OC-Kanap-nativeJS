
const sendOrder = async () => {
    const products = getLocalStore().map(item => item._id);
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact, products }),
    });
    const data = await response.json();
    return data;
};
