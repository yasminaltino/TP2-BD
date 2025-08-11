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


// Falta:
// - Listar suprimentos
// - Listar equipamentos
// - Registrar pessoa (funcionário ou candidato)
// - Eliminar pessoa pelo CPF