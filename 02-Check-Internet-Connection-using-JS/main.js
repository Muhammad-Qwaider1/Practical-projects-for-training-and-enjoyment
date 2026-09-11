const title = document.querySelector('.title');
const ul = document.querySelector('ul');
const reload = document.querySelector('.reload');
const container = document.querySelector('.container');

function updateConnectionStatus(isOnline) {
    if (isOnline) {
        title.textContent = "Online Now";
        title.style.color = "green";
        reload.classList.add('hide');
        ul.classList.add('hide');
    } else {
        title.textContent = "Offline Now";
        title.style.color = "red";
        reload.classList.remove('hide');
        ul.classList.remove('hide');
    }
}

updateConnectionStatus(navigator.onLine);

window.addEventListener('online', () => updateConnectionStatus(true));
window.addEventListener('offline', () => updateConnectionStatus(false));

reload.addEventListener('click', () => {
    if (navigator.onLine) {
        location.reload();
    } else {
        const originalText = reload.textContent;
        reload.textContent = "Still Offline!";
        
        setTimeout(() => {
            reload.textContent = originalText;
        }, 2000);
    }
});