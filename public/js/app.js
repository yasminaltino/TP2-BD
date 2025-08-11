// Application logic

const API_BASE_URL = 'http://localhost:8080/api'


/**
 * Generic function to make API calls
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Data to send in request body
 * @returns {Promise} - API response
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch (`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            throw new Error (`HTTP Error! status: ${response.status}`);
        }

        return await response.json()
    } catch (error) {
        console.error('API call failed:', error);
        showAlert("Erro na comunicação com o servidor", "danger");
        throw error;
    }
}

/**
 * Show alert messages to user
 * @param {string} message - Message to display
 * @param {string} type - Bootstrap alert type (success, danger, warning, info)
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML =
    `${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>`

    // Insert at top of container
    const container = document.querySelector('.container-fluid');
    container.insertBefore(alertDiv, container.firstChild)

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000)
}

// ===========================================
// SEARCH FUNCTIONS
// ===========================================

/**
 * Search person by CPF
 * @param {string} cpf - CPF to search for
 */
async function searchPersonByCPF(cpf) {
    if(!cpf.trim()){
        showAlert('Por favor, insira um CPF válido', 'warning')
        return;
    }

    try{
        showAlert('Buscando pessoa...', 'info');
        const result = await apiCall(`/pessoas/cpf/${cpf}`);

        // Display result // ! It is still necessary to create a display function
        displayPersonResult(result);
        showAlert('Pessoa encontrada com sucesso!', 'sucess');
    } catch (error) {
        showAlert('Pessoa não encontrada ou erro na busca', 'danger');
    }
}

/**
 * Search people by department
 * @param {string} department - Department name
 */
async function searchPeopleByDepartment(department) {
    try {
        showAlert(`Buscando pessoas do departamento ${department}`, 'info');
        const result = await apiCall(`/pessoas/departamento/${department}`);

        // Display results
        displayPeopleList(result);
        showAlert(`Encontradas ${result.length} pessoas no departamento ${department}`, 'success');
    } catch (error) {
        showAlert(`Erro ao buscar pessoas do departamento ${department}`, 'danger');
    }
    
}

// ===========================================
// INVENTORY FUNCTIONS
// ===========================================

/**
 * List supplies in stock
 */
async function listSupplies() {
    try {
        showAlert('Carregando suprimentos...', 'info');
        const supplies = await apiCall('/suprimentos');

        displaySuppliesList(supplies);
        showAlert('Suprimentos carregados com sucesso!', 'success');
    } catch (error) {
        showAlert('Erro ao carregar suprimentos', 'danger');
    }
    
}

/**
 * List equipment in stock
 */
async function listEquipment() {
    try {
        showAlert('Carregando equipamentos', 'info');
        const equipment = await apiCall('/equipamentos');

        displayEquipmentList(equipment);
        showAlert('Equipamentos carregados com sucesso!', 'success');
    } catch (error) {
        showAlert('Erro ao carregar equipamentos', 'danger');
    }
}

// ===========================================
// PERSON MANAGEMENT FUNCTIONS
// ===========================================

/**
 * Register a new person
 * @param {Object} personData - Person data from form
 * @param {string} personType - 'funcionario' or 'candidato'
 */

async function registerPerson(personData, personType) {
    try {
        showAlert('Cadastrando pessoa...', 'info');
        const result = await apiCall(`/pessoas/${personType}`, 'POST', personData);

        showAlert(`${personType == 'funcionario' ? 'Funcionário' : 'Candidato'} cadastrado com sucesso!`, 'success');

        clearPersonForm();

        return result;
    } catch (error) {
        showAlert('Erro ao cadastrar pessoa', 'danger');
    }
}

/**
 * Delete person by CPF
 * @param {string} cpf - CPF of person to delete
 */
async function deletePerson(cpf) {
    if(!cpf.trim()) {
        showAlert('Por favor, insira um CPF válido', 'warning');
        return;
    }

    if (!confirm(`Tem certeza de que deseja eliminar a pesosa com CPF ${cpf}?`)){
        return;
    }

    try {
        showAlert('Eliminando pessoa do banco de dados...', 'info');
        await apiCall(`/pessoas/${cpf}`, 'DELETE');

        showAlert('Pessoa eliminada com sucesso!', 'success');
        
        // clear input field
        document.querySelector('input[placeholder="Escolher pelo CPF"]').value = '';
    } catch (error) {
        showAlert('Erro ao eliminar pesosa', 'danger');
    }
    
}

// ===========================================
// FORM HANDLING FUNCTIONS
// ===========================================

/**
 * Get form data from person registration form
 * @returns {Object} - Person data object
 */
function getPersonData() {
    const cpf = document.querySelector('input[placeholder="CPF"]').value;
    const nome = document.querySelector('input[placeholder="Nome"]').value;

    // get selected gender
    const genderRadios = document.querySelectorAll('input[name="generoPessoa"]');
    let genero = "";
    for (const radio of genderRadios) {
        if (radio.checked) {
            genero = radio.nextElementSibling.textContent.trim().toLowerCase()
            break;
        }
    }

    // Get Address Data
    const logradouro = document.querySelector('input[placeholder="Logradouro"]').value;
    const numero = document.querySelector('input[placeholder="Número"]').value;
    const cep = document.querySelector('input[placeholder="CEP"]').value;
    const cidade = document.querySelector('input[placeholder="Cidade"]').value;

    // Get Person type
    const typeRadios = document.querySelectorAll('input[placeholder="tipoPessoa"]');
    let tipoPessoa = '';
    for (const radio of typeRadios) {
        if(radio.checked) {
            tipoPessoa = radio.nextElementSibling.textContent.trim().toLowerCase;
            break;
        }
    }

    return {
        cpf,
        nome,
        genero,
        endereco : {
            logradouro,
            numero,
            cep,
            cidade,
        },
        tipoPessoa
    };
}

/**
 * Clear person registration form
 */
function clearPersonForm() {
    document.querySelector('input[placeholder="CPF"]').value = "";
    document.querySelector('input[placeholder="Nome"]').value = "";
    document.querySelector('input[placeholder="Logradouro"]').value = "";
    document.querySelector('input[placeholder="Número"]').value = "";
    document.querySelector('input[placeholder="CEP"]').value = "";
    document.querySelector('input[placeholder="Cidade"]').value = "";
    
    // Clear radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

}
