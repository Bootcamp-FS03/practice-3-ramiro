type CallbackFunction = () => void;

export class NotificationBuilder {
  static showNotification(
    message: string,
    confirmCallback?: CallbackFunction,
    modalContent?: HTMLDivElement,
  ) {
    const modal = document.getElementById(
      "notification-dialog",
    ) as HTMLDialogElement;

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.classList.add("close-btn");
    closeButton.addEventListener("click", () => {
      while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
      }
      modal.close();
      modal.style.display = "none";
    });

    const notification = document.createElement("p");
    notification.innerHTML = message;

    modal.appendChild(closeButton);
    modal.appendChild(notification);

    if (modalContent) {
      modal.appendChild(modalContent);
    }

    // If a confirmation callback is provided, add a confirm button
    if (confirmCallback) {
      const confirmButton = document.createElement("button");
      confirmButton.innerText = "Confirm";
      confirmButton.classList.add("confirm-btn");
      confirmButton.addEventListener("click", () => {
        while (modal.firstChild) {
          modal.removeChild(modal.firstChild);
        }
        confirmCallback();
        modal.close();
        modal.style.display = "none";
      });
      modal.appendChild(confirmButton);
    }

    modal.style.display = "flex";
    modal.showModal();
  }
}
