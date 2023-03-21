export const itemLayout = (item, objectHandler) => {
    const { _id, name, color, quantity, imageUrl, altTxt, price } = item;
    const { updateQuantityHandler, deleteItemHandler } = objectHandler;
    const cartItemContainer = document.getElementById("cart__items");

    const cartItem = document.createElement("article");
    cartItem.className = "cart__item";
    cartItem.setAttribute("data-id", _id);
    cartItem.setAttribute("data-color", color);

    const cartItemImgContainer = document.createElement("div");
    cartItemImgContainer.className = "cart__item__img";
    const cartItemImage = document.createElement("img");
    cartItemImage.src = imageUrl;
    cartItemImage.alt = altTxt;

    const cartItemContent = document.createElement("div");
    cartItemContent.className = "cart__item__content";

    const cartItemContentDesc = document.createElement("div");
    cartItemContentDesc.className = "cart__item__content__titlePrice";

    const productName = document.createElement("h2");
    productName.innerText = name;

    const productColor = document.createElement("p");
    productColor.innerText = color;
    const productPrice = document.createElement("p");
    productPrice.innerText = price + " €";
    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";

    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.className =
        "cart__item__content__settings__quantity";

    const quantityParagraph = document.createElement("p");
    quantityParagraph.innerText = "Qté :";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "itemQuantity";
    quantityInput.name = "itemQuantity";
    quantityInput.value = quantity;
    quantityInput.setAttribute("min", 1);
    quantityInput.setAttribute("max", 100);
    quantityInput.addEventListener("change", updateQuantityHandler);

    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.className =
        "cart__item__content__settings__delete";

    const deleteItem = document.createElement("p");
    deleteItem.className = "deleteItem";
    deleteItem.innerText = "Supprimer";
    deleteItem.addEventListener("click", deleteItemHandler);

    cartItemContainer.appendChild(cartItem);

    cartItem.appendChild(cartItemImgContainer);
    cartItemImgContainer.appendChild(cartItemImage);

    cartItem.appendChild(cartItemContent);
    cartItemContent.appendChild(cartItemContentDesc);
    cartItemContentDesc.appendChild(productName);
    cartItemContentDesc.appendChild(productColor);
    cartItemContentDesc.appendChild(productPrice);

    cartItemContent.appendChild(cartItemContentSettings);
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettingsQuantity.appendChild(quantityParagraph);
    cartItemContentSettingsQuantity.appendChild(quantityInput);

    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.appendChild(deleteItem);
};