

// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

// Flag to enable/disable mock mode
const MOCK_MODE = true;

/**
 * Original API call function (for real backend)
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {Object} data - Data to send in request body
 * @returns {Promise} - API response
 */
async function originalApiCall(endpoint, method = 'GET', data = null) {
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

        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        showAlert("Erro na comunicação com o servidor", "danger");
        throw error;
    }
}

/**
 * API call function with mock override capability
 * @param {string} endpoint - API endpoint
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)  
 * @param {Object} data - Data to send in request body
 * @returns {Promise} - API response
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    // Use original API call if mock mode is disabled
    if (!MOCK_MODE) {
        return originalApiCall(endpoint, method, data);
    }

    // Mock API routing
    try {
        console.log(`Mock API Call: ${method} ${endpoint}`, data);
        
        // Check if mockAPI exists
        if (typeof mockAPI === 'undefined') {
            console.error('mockAPI is not defined! Make sure mock files are loaded.');
            throw new Error('Mock API not available');
        }
        
        // Route to appropriate mock function
        if (method === 'GET') {
            if (endpoint.startsWith('/pessoas/cpf/')) {
                const cpf = endpoint.split('/pessoas/cpf/')[1];
                return await mockAPI.findPersonByCPF(cpf);
            }
            
            if (endpoint.startsWith('/pessoas/departamento/')) {
                const department = endpoint.split('/pessoas/departamento/')[1];
                return await mockAPI.findPeopleByDepartment(department);
            }
            
            if (endpoint === '/suprimentos') {
                return await mockAPI.getSupplies();
            }
            
            if (endpoint === '/equipamentos') {
                return await mockAPI.getEquipments();
            }
            
            if (endpoint === '/pessoas') {
                return await mockAPI.getAllPeople();
            }
        }
        
        if (method === 'POST') {
            if (endpoint.startsWith('/pessoas/')) {
                const personType = endpoint.split('/pessoas/')[1];
                return await mockAPI.registerPerson(data, personType);
            }
        }
        
        if (method === 'DELETE') {
            if (endpoint.startsWith('/pessoas/')) {
                const cpf = endpoint.split('/pessoas/')[1];
                return await mockAPI.deletePerson(cpf);
            }
        }
        
        throw new Error(`Mock endpoint not found: ${method} ${endpoint}`);
        
    } catch (error) {
        console.error('Mock API call failed:', error);
        showAlert(error.message || 'Erro na comunicação com o servidor', 'danger');
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
        displayPersonResult(result.data);
        showAlert('Pessoa encontrada com sucesso!', 'success');
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
        displayPeopleList(result.data, department);
        showAlert(`Encontradas ${result.data?.length || 0} pessoas no departamento ${department}`, 'success');
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

        displaySuppliesList(supplies.data);
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

        displayEquipmentsList(equipment.data);
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
    const typeRadios = document.querySelectorAll('input[name="tipoPessoa"]');
    let tipoPessoa = '';
    for (const radio of typeRadios) {
        if(radio.checked) {
            tipoPessoa = radio.nextElementSibling.textContent.trim().toLowerCase();
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


/**
 * Validate person form data
 * @param {Object} data - Person data to validate
 * @return {boolean} - True if valid
 */
function validatePersonForm(data) {
    if (!data.cpf || !data.nome) {
        showAlert('CPF e Nome são obrigatórios', 'warning');
        return false;
    }

    if (!data.genero) {
        showAlert('Por favor, selcione o gênero', 'warning');
        return false;
    }

    if (!data.tipoPessoa) {
        showAlert('Por favor, defina se a pessoa registrada é um Funcionário ou um Candidato', 'warning');
        return false;
    }

    if (data.cpf.length !== 11) {
        showAlert('CPF deve ter 11 dígitos', 'warning')
        return false;
    }

    return true;
}

// ===========================================
// DISPLAY FUNCTIONS (Placeholder - you'll customize these)
// ===========================================

function displayPersonResult(pessoa) {
    // Find or create the display container
    let displayDiv = document.getElementById('person-result');
    if(!displayDiv) {
        displayDiv = document.createElement('div');
        displayDiv.id = 'person-result';
        displayDiv.className = 'mt-4';
        // Insert below all forms
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) {
            forms[forms.length -1].parentNode.insertBefore(displayDiv, forms[forms.length - 1].nextSibling);
        } else {
            document.body.appendChild(displayDiv);
        }
    }
    // Clear previous content
    displayDiv.innerHTML = '';

    if(!pessoa || !pessoa.cpf) {
        displayDiv.innerHTML = '<div class="alert alert-warning">Nenhnuma pessoa encontrada. </div>';
        return;
    }

    // Build info table
    displayDiv.innerHTML = `
        <div class="card">
            <div class="card-header">Informações da Pessoa</div>
            <div class="card-body">
                <table class="table table-bordered">
                    <tr><th>CPF</th><td>${pessoa.cpf}</td></tr>
                    <tr><th>Nome</th><td>${pessoa.nome}</td></tr>
                    <tr><th>Gênero</th><td>${pessoa.genero || ''}</td></tr>
                    <tr><th>Tipo</th><td>${pessoa.tipoPessoa || ''}</td></tr>
                    <tr><th>Endereço</th>
                        <td>
                            ${pessoa.endereco ? `
                                ${pessoa.endereco.logradouro || ''}, 
                                ${pessoa.endereco.numero || ''} <br>
                                ${pessoa.endereco.cidade || ''} - CEP: ${pessoa.endereco.cep || ''}
                            ` : ''}
                        </td>
                    </tr>
                </table>
            </div>
        </div>`;

}

function displayPeopleList(people, department) {
    let displayDiv = document.getElementById('people-result');
    if(!displayDiv) {
        displayDiv = document.createElement('div');
        displayDiv.id = 'people-result';
        displayDiv.className = 'mt-4';
        // Insert below all forms
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) {
            forms[forms.length -1].parentNode.insertBefore(displayDiv, forms[forms.length - 1].nextSibling);
        } else {
            document.body.appendChild(displayDiv);
        }
    }
    // Clear previous content
    displayDiv.innerHTML = '';

    // Build info table
    if (!people || people.length === 0) {
        displayDiv.innerHTML = `<div class="alert alert-warning">Nenhuma pessoa encontrada no departamento ${department}.</div>`;
        return;
    }

    // Build info table for multiple people
    let tableRows = people.map(pessoa => `
        <tr>
            <td>${pessoa.cpf}</td>
            <td>${pessoa.nome}</td>
            <td>${pessoa.genero || ''}</td>
            <td>${pessoa.tipoPessoa || ''}</td>
            <td>
                ${pessoa.endereco ? `
                    ${pessoa.endereco.logradouro || ''}, 
                    ${pessoa.endereco.numero || ''}<br>
                    ${pessoa.endereco.cidade || ''} - CEP: ${pessoa.endereco.cep || ''}
                ` : ''}
            </td>
        </tr>
    `).join('');

    displayDiv.innerHTML = `
        <div class="card">
            <div class="card-header">Pessoas do Departamento ${department}</div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Nome</th>
                            <th>Gênero</th>
                            <th>Tipo</th>
                            <th>Endereço</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
function displaySuppliesList(supplies) {
    let displayDiv = document.getElementById("supplies-result");
    if(!displayDiv) {
        displayDiv = document.createElement('div');
        displayDiv.id = 'supplies-result';
        displayDiv.className = 'mt-4';
        // Insert below all forms
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) {
            forms[forms.length - 1].parentNode.insertBefore(displayDiv, forms[forms.length -1].nextSibling);
        } else {
            document.body.appendChild(displayDiv);
        }
    }
    // Clear previous content
    displayDiv.innerHTML = '';

    // Build info table
    if(!supplies || supplies.length === 0) {
        displayDiv.innerHTML = '<div class="alert alert-warning">Nenhum suprimento encontrado</div>';
        return;
    }

    // Build info table for multiple supplies
    let tableRows = supplies.map(supplie => `
        <tr>
            <td>${supplie.nome}</td>
            <td>${supplie.codigo}</td>
            <td>${supplie.nomeDepartamento}</td>
            <td>${supplie.quantidade}</td>
        </tr>
        `).join('');

        displayDiv.innerHTML = `
        <div class="card">
            <div class="card-header">Lista de Suprimentos</div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Departamento</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function displayEquipmentsList(equipments) {
    let displayDiv = document.getElementById("equipments-result");
    if(!displayDiv) {
        displayDiv = document.createElement('div');
        displayDiv.id = 'equipments-result';
        displayDiv.className = 'mt-4';
        // Insert bellow all forms
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) {
            forms[forms.length - 1].parentNode.insertBefore(displayDiv, forms[forms.length -1].nextSibling);
        } else {
            document.body.append(displayDiv);
        }
    }
    // Clear previous content
    displayDiv.innerHTML = '';

    // Build info table
    if(!equipments || equipments.length === 0) {
        displayDiv.innerHTML = '<div class="alert alert-warning">Nenhum equipamento encontrado</div>';
        return;
    }

    // Build info table for multiple equipment
    let tableRows = equipments.map(equipment => `
        <tr>
            <td>${equipment.marca}</td>
            <td>${equipment.nome}</td>
            <td>${equipment.codigo}</td>
            <td>${equipment.nomeDepartamento}</td>
        </tr>
        `).join('');

        displayDiv.innerHTML = `
        <div class="card">
            <div class="card-header">Lista de Equipamentos</div>
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Marca</th>
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Departamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// ===========================================
// EVENT LISTENERS - Setup when DOM is loaded
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Search by CPF button
    const searchCPFBtn = document.getElementById('searchByCPFBtn');
    if(searchCPFBtn){
        searchCPFBtn.addEventListener('click', function() {
            const cpfInput = document.querySelector('input[placeholder="Busque pelo CPF"]');
            const cpf = cpfInput.value.trim();
            searchPersonByCPF(cpf);
        });
    }

    // Department dropdown items
    const departmentLinks = document.querySelectorAll('.dropdown-item');
    departmentLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const department = this.textContent.trim();
            searchPeopleByDepartment(department);
        });
    });

    // Supplies button
    const suppliesBtn = document.getElementById('listSupplies');
    if(suppliesBtn){
        suppliesBtn.addEventListener('click', listSupplies);
    }

    // Equipment button
    const equipmentBtn = document.getElementById('listEquipments');
    if(equipmentBtn) {
        equipmentBtn.addEventListener('click', listEquipment);
    } else {
        console.error('❌ Equipment button not found! Check the button ID in HTML');
    }

    // Register person button
    const registerBtn = document.getElementById('registerPerson');
    if(registerBtn) {
        registerBtn.addEventListener('click', function() {
            const personData = getPersonData();

            if(validatePersonForm(personData)) {
                registerPerson(personData, personData.tipoPessoa);
            }
        });
    }

    // Delete person button
    const deleteBtn = document.getElementById("deletePerson");
    if(deleteBtn) {
        deleteBtn.addEventListener('click', function(){
            const cpfInput = document.querySelector('input[placeholder="Escolher pelo CPF"]');
            const cpf = cpfInput.value.trim();
            deletePerson(cpf);
        })
    }

    const clearBtn = document.getElementById('clearScreen');
    if(clearBtn) {
        clearBtn.addEventListener('click', function(){
            const displayPerson = document.getElementById('person-result');
            if(displayPerson){
                displayPerson.innerHTML = '';
            }
            const displayPeople = document.getElementById('people-result');
            if(displayPeople){
                displayPeople.innerHTML = '';
            }
            const displaySupplies = document.getElementById('supplies-result');
            if(displaySupplies){
                displaySupplies.innerHTML = '';
            }
            const displayEquipments = document.getElementById('equipments-result');
            if(displayEquipments){
                displayEquipments.innerHTML = '';
                
            }
            showAlert('Tela limpa com sucesso!')
        });
        
    }

    // Add key support support for search inputs
    document.querySelector('input[placeholder="Busque pelo CPF"]')?.addEventListener('keypress', function(e) {
        if (e.key === "Enter") {
            searchPersonByCPF(this.value.trim());
        }

    });

    document.querySelector('input[placeholder="Escolher pelo CPF"]')?.addEventListener('keypress', function(e) {
        if(e.key === "Enter") {
            deletePerson(this.value.trim());
        }
    });
});