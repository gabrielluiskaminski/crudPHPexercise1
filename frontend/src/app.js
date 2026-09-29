import { renderUsers, findUserById } from './scripts/dom/render.js';
import { createUser } from './scripts/api/create.js';
import { deleteUser } from './scripts/api/delete.js';
import { updateUser, patchUser } from './scripts/api/update.js';

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/users';

const form = document.getElementById('create-user-form');
const formError = document.getElementById('form-error');
const formTitle = document.getElementById('form-title');
const submitBtn = form.querySelector('button[type="submit"]');
const cancelBtn = document.getElementById('cancel-edit');
const usersSection = document.getElementById('users');

let editingId = null;
let originalUser = null;

function showError(message) {
    formError.textContent = message;
    formError.classList.remove('d-none');
}

function hideError() {
    formError.classList.add('d-none');
    formError.textContent = '';
}