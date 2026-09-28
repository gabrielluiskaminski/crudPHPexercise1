import { renderUsers, findUserById } from './scripts/dom/render.js';
import { createUsers } from './scripts/api/create.js';
import { deleteUser  } from './scripts/api/delete.js';

// refatorar código colocando variáveis no inicio
const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/users';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await renderUsers(apiUrl);
    } catch (error) {
        console.log(error);
    }
});

const form = document.getElementById('create-user-form');
const formError = document.getElementById('form-error');

function showError(message) {
    formError.textContent = message;
    formError.classList.remove('d-none');
}

function hideError() {
    formError.classList.add('d-none');
    formError.textContent = '';
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    hideError();

    try {
        await createUsers(apiUrl, { name, age, email });

        form.reset();
        await renderUsers(apiUrl);
    } catch (error) {
        showError(error.message);
    }
});

function getUserFromCard(button) {
    const card = button.closest('.user-card');
    return findUserById(Number(card.id));
}

const userSection = document.getElementById('users');

userSection.addEventListener('click', async (event) => {
    const { target } = event;

    if (target.dataset.action === 'delete') {
        const user = getUserFromCard(target);

        if(!confirm('Are you sure you want to delete this user?')) return;

        try {
            await deleteUser(apiUrl, user.id);
            await renderUsers(apiUrl);
        } catch (error) {
            showError(error.message);
        }
    }
});
