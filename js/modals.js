var btn_open = document.querySelectorAll('.open-modal');

btn_open.forEach((btn) => {
    btn.addEventListener('click', () => {
        let modal = document.getElementById(btn.getAttribute('data-modal'));
        let modal_overlay = modal.querySelector('.modal-overlay');
        let modal_container = modal.querySelector('.modal-container');

        modal.style.display = 'block';
        
        setTimeout(() => {
            modal_overlay.classList.toggle('modal-fade');
            modal_container.classList.toggle('modal-fade-in');
        }, 10);
    });
});

var btn_close = document.querySelectorAll('.close-modal');

btn_close.forEach((btn) => {
    btn.addEventListener('click', () => {
        let modal = btn.closest('.modal');
        let modal_overlay = modal.querySelector('.modal-overlay');
        let modal_container = modal.querySelector('.modal-container');

        modal_container.style.transform = 'scaleY(0)';

        setTimeout(() => {
            modal_container.style.width = '100%';
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal_overlay.classList.toggle('modal-fade');
                modal_container.classList.toggle('modal-fade-in');
                modal_container.style.removeProperty('width');
                modal_container.style.removeProperty('transform');
            }, 300);
        }, 550);
    });
});


window.addEventListener('click', (e) => {
    if (e.target.className === 'modal-wrapper') {
        let modal = e.target.closest('.modal');
        let modal_overlay = modal.querySelector('.modal-overlay');
        let modal_container = modal.querySelector('.modal-container');

        modal_container.style.transform = 'scaleY(0)';

        setTimeout(() => {
            modal_container.style.width = '100%';
            
            setTimeout(() => {
                modal.style.display = 'none';
                modal_overlay.classList.toggle('modal-fade');
                modal_container.classList.toggle('modal-fade-in');
                modal_container.style.removeProperty('width');
                modal_container.style.removeProperty('transform');
            }, 300);
        }, 550);
    }
});

var notification = document.querySelector('.notification');
var notification_container = notification.querySelector('.notification-container');
var close_notification_timeout;

function open_notification(title = "", message = "", autoClose = true, type = 0) {
    notification.querySelector('.notification-title').innerHTML = title;
    notification.querySelector('.notification-message').innerHTML = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification_container.classList.toggle('notification-fade-in');

        if (autoClose)
            close_notification_timeout = setTimeout(close_notification, 3000);
    }, 10);
}


open_notification("Yeah boy!", "The notification is kicking...");
/*
*
*   The code below is for debug purposes
*

var btn_notification = document.querySelector('.open-notification');

btn_notification.addEventListener('click', () => {
    open_notification('Awesome.', 'You have successfully launched notification.', autoClose = false);
});

*/

var btn_close_notification = document.querySelector('.notification-close');

btn_close_notification.addEventListener('click', () => {
    close_notification();
});

function close_notification() {
    notification_container.style.transform = 'scaleY(0)';

    setTimeout(() => {
        notification_container.style.width = '100%';
        
        setTimeout(() => {
            notification.style.display = 'none';
            notification_container.classList.toggle('notification-fade-in');
            notification_container.style.removeProperty('width');
            notification_container.style.removeProperty('transform');

            if (close_notification_timeout !== undefined)
                clearTimeout(close_notification_timeout);
        }, 300);
    }, 550);
}