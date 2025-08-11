// Mock data for testing the frontend
const mockPeople = [
    {
        cpf: "12345678901",
        nome: "João Silva Santos",
        genero: "masculino",
        tipoPessoa: "funcionario",
        departamento: "Cardiologia",
        endereco: {
            logradouro: "Rua das Flores",
            numero: "123",
            cep: "12345678",
            cidade: "São Paulo"
        }
    },
    {
        cpf: "98765432100",
        nome: "Maria Oliveira Costa",
        genero: "feminino",
        tipoPessoa: "funcionario",
        departamento: "Neurologia",
        endereco: {
            logradouro: "Avenida Central",
            numero: "456",
            cep: "87654321",
            cidade: "Rio de Janeiro"
        }
    },
    {
        cpf: "11122233344",
        nome: "Carlos Eduardo Lima",
        genero: "masculino",
        tipoPessoa: "candidato",
        departamento: null,
        endereco: {
            logradouro: "Rua do Comércio",
            numero: "789",
            cep: "11223344",
            cidade: "Belo Horizonte"
        }
    },
    {
        cpf: "55566677788",
        nome: "Ana Paula Rodrigues",
        genero: "feminino",
        tipoPessoa: "funcionario",
        departamento: "Pediatria",
        endereco: {
            logradouro: "Praça da Liberdade",
            numero: "101",
            cep: "55667788",
            cidade: "Salvador"
        }
    },
    {
        cpf: "99988877766",
        nome: "Roberto Ferreira",
        genero: "masculino",
        tipoPessoa: "funcionario",
        departamento: "Cardiologia",
        endereco: {
            logradouro: "Rua da Esperança",
            numero: "202",
            cep: "99887766",
            cidade: "Brasília"
        }
    },
    {
        cpf: "44433322211",
        nome: "Lucia Helena Martins",
        genero: "feminino",
        tipoPessoa: "candidato",
        departamento: null,
        endereco: {
            logradouro: "Avenida Paulista",
            numero: "1500",
            cep: "44332211",
            cidade: "São Paulo"
        }
    }
];

const mockSupplies = [
    {
        nome: "Luvas Cirúrgicas",
        codigo: "LUV001",
        nomeDepartamento: "Cardiologia",
        quantidade: 500
    },
    {
        nome: "Máscaras N95",
        codigo: "MAS002",
        nomeDepartamento: "Neurologia",
        quantidade: 250
    },
    {
        nome: "Seringas Descartáveis",
        codigo: "SER003",
        nomeDepartamento: "Pediatria",
        quantidade: 1000
    },
    {
        nome: "Bandagens Estéreis",
        codigo: "BAN004",
        nomeDepartamento: "Cardiologia",
        quantidade: 300
    },
    {
        nome: "Termômetros Digitais",
        codigo: "TER005",
        nomeDepartamento: "Pediatria",
        quantidade: 50
    },
    {
        nome: "Álcool em Gel",
        codigo: "ALC006",
        nomeDepartamento: "Neurologia",
        quantidade: 100
    }
];

const mockEquipments = [
    {
        nome: "Monitor Cardíaco",
        codigo: "MON001",
        nomeDepartamento: "Cardiologia",
        marca: "CardiCor"
    },
    {
        nome: "Ressonância Magnética",
        codigo: "RES002",
        nomeDepartamento: "Neurologia",
        marca: "Ressonantes 3000"
    },
    {
        nome: "Ultrassom Pediátrico",
        codigo: "ULT003",
        nomeDepartamento: "Pediatria",
        marca: "Ultramini"
    },
    {
        nome: "Desfibrilador",
        codigo: "DES004",
        nomeDepartamento: "Cardiologia",
        marca: "Choquinho"
    },
    {
        nome: "Eletroencefalógrafo",
        codigo: "ELE005",
        nomeDepartamento: "Neurologia",
        marca: "Altiva"
    },
    {
        nome: "Incubadora Neonatal",
        codigo: "INC006",
        nomeDepartamento: "Pediatria",
        marca: "Neonatinho"
    }
];

// Mock API service to simulate backend responses
class MockAPIService {
    constructor() {
        this.people = mockPeople;
        this.supplies = mockSupplies;
        this.equipments = mockEquipments;
        this.delay = 1000; // Simulate network delay
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
            throw new Error('CPF already registered');
        }

        const newPerson = {
            ...personData,
            tipoPessoa: personType
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

// Create global instance
const mockAPI = new MockAPIService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockAPIService;
}