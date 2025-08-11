// Mock API service to simulate backend responses
class MockAPIService {
    constructor() {
        this.people = [...mockPeople]; // Copy the array so we can modify it
        this.supplies = [...mockSupplies];
        this.equipments = [...mockEquipments];
        this.delay = 800; // Simulate network delay
    }

    // Simulate network delay
    async _simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, this.delay));
    }

    // Mock person search by CPF
    async findPersonByCPF(cpf) {
        await this._simulateDelay();
        const person = this.people.find(p => p.cpf === cpf);
        if (!person) {
            throw new Error('Person not found');
        }
        return { data: person, status: 200 };
    }

    // Mock people search by department
    async findPeopleByDepartment(department) {
        await this._simulateDelay();
        const people = this.people.filter(p => 
            p.departamento && p.departamento.toLowerCase() === department.toLowerCase()
        );
        return { data: people, status: 200 };
    }

    // Mock supplies list
    async getSupplies() {
        await this._simulateDelay();
        return { data: this.supplies, status: 200 };
    }

    // Mock equipments list
    async getEquipments() {
        await this._simulateDelay();
        return { data: this.equipments, status: 200 };
    }

    // Mock person registration
    async registerPerson(personData, personType) {
        await this._simulateDelay();
        
        // Check if CPF already exists
        const existingPerson = this.people.find(p => p.cpf === personData.cpf);
        if (existingPerson) {
            throw new Error('CPF já cadastrado');
        }

        const newPerson = {
            ...personData,
            tipoPessoa: personType,
            departamento: personType === 'funcionario' ? 'Cardiologia' : null
        };
        
        this.people.push(newPerson);
        return { data: newPerson, status: 201 };
    }

    // Mock person deletion
    async deletePerson(cpf) {
        await this._simulateDelay();
        const personIndex = this.people.findIndex(p => p.cpf === cpf);
        if (personIndex === -1) {
            throw new Error('Person not found');
        }
        
        const deletedPerson = this.people.splice(personIndex, 1)[0];
        return { data: deletedPerson, status: 200 };
    }

    // Get all people (for testing)
    async getAllPeople() {
        await this._simulateDelay();
        return { data: this.people, status: 200 };
    }
}

// Create global instance after DOM loads
let mockAPI;
document.addEventListener('DOMContentLoaded', function() {
    if (typeof MockAPIService !== 'undefined') {
        mockAPI = new MockAPIService();
        console.log('✅ Mock API initialized successfully');
        console.log('📊 Available test CPFs:', mockPeople.map(p => p.cpf));
    } else {
        console.error('❌ MockAPIService not available');
    }
});