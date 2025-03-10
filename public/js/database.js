class Database {
    static getStudents() {
        return JSON.parse(localStorage.getItem('students') || '[]');
    }

    static getInvestors() {
        return JSON.parse(localStorage.getItem('investors') || '[]');
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static async saveStudent(userData) {
        try {
            const students = this.getStudents();
            // Check if email already exists
            if (students.some(student => student.email === userData.email)) {
                throw new Error('Email already registered');
            }
            // Add ID and default status
            userData.id = this.generateId();
            userData.status = 'pending';
            userData.notifications = [];
            userData.fundingRequest = {
                amount: userData.requestedAmount || 0,
                purpose: userData.fundingPurpose || '',
                timeline: userData.timeline || '',
                status: 'pending'
            };
            
            students.push(userData);
            localStorage.setItem('students', JSON.stringify(students));
            
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify({
                id: userData.id,
                email: userData.email,
                userType: 'student',
                name: userData.name
            }));
            
            return userData;
        } catch (error) {
            console.error('Error saving student:', error);
            throw error;
        }
    }

    static async saveInvestor(investorData) {
        try {
            const investors = this.getInvestors();
            // Check if email already exists
            if (investors.some(investor => investor.email === investorData.email)) {
                throw new Error('Email already registered');
            }
            // Add ID and initialize arrays
            investorData.id = this.generateId();
            investorData.approvedApplications = [];
            investorData.totalFunds = investorData.totalFunds || 0;
            
            investors.push(investorData);
            localStorage.setItem('investors', JSON.stringify(investors));

            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify({
                id: investorData.id,
                email: investorData.email,
                userType: 'investor',
                name: investorData.name
            }));

            return investorData;
        } catch (error) {
            console.error('Error saving investor:', error);
            throw error;
        }
    }

    static async login(email, userType) {
        try {
            const users = userType === 'student' ? this.getStudents() : this.getInvestors();
            const user = users.find(u => u.email === email);
            
            if (!user) {
                throw new Error('User not found. Please register first.');
            }

            return user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async updateStudent(studentId, data) {
        try {
            const students = this.getStudents();
            const index = students.findIndex(s => s.id === studentId);
            if (index === -1) throw new Error('Student not found');
            
            students[index] = { ...students[index], ...data };
            localStorage.setItem('students', JSON.stringify(students));
            return students[index];
        } catch (error) {
            console.error('Error updating student:', error);
            throw error;
        }
    }

    static async updateInvestor(investorId, data) {
        try {
            const investors = this.getInvestors();
            const index = investors.findIndex(i => i.id === investorId);
            if (index === -1) throw new Error('Investor not found');
            
            investors[index] = { ...investors[index], ...data };
            localStorage.setItem('investors', JSON.stringify(investors));
            return investors[index];
        } catch (error) {
            console.error('Error updating investor:', error);
            throw error;
        }
    }

    static async getStudentById(id) {
        const students = this.getStudents();
        return students.find(s => s.id === id);
    }

    static async getInvestorById(id) {
        const investors = this.getInvestors();
        return investors.find(i => i.id === id);
    }

    static getAllStudents() {
        return this.getStudents();
    }

    static async updateApplication(studentId, status, investorId, fundingResponse = {}) {
        try {
            const students = this.getStudents();
            const investors = this.getInvestors();
            
            const studentIndex = students.findIndex(s => s.id === studentId);
            const investorIndex = investors.findIndex(i => i.id === investorId);
            
            if (studentIndex === -1 || investorIndex === -1) {
                throw new Error('Student or Investor not found');
            }

            const investor = investors[investorIndex];
            const student = students[studentIndex];

            // Update student status
            student.status = status;
            student.investorId = investorId;
            
            // Add notification with investor details and funding response
            const notification = {
                id: Date.now(),
                message: status === 'approved' 
                    ? `Your application has been approved by ${investor.name} from ${investor.organization}! They ${fundingResponse.amount ? `are offering $${fundingResponse.amount} in funding.` : 'have approved your funding request.'}`
                    : `Your application has been rejected by ${investor.name} from ${investor.organization}.`,
                date: new Date().toISOString(),
                read: false,
                investorDetails: status === 'approved' ? {
                    name: investor.name,
                    organization: investor.organization,
                    email: investor.email,
                    fundingResponse: {
                        amount: fundingResponse.amount || student.fundingRequest.amount,
                        notes: fundingResponse.notes || ''
                    }
                } : null
            };
            
            if (!student.notifications) {
                student.notifications = [];
            }
            student.notifications.unshift(notification);

            // Update funding request status
            if (student.fundingRequest) {
                student.fundingRequest.status = status;
                if (status === 'approved') {
                    student.fundingRequest.approvedAmount = fundingResponse.amount || student.fundingRequest.amount;
                }
            }

            // Update investor's applications
            if (status === 'approved') {
                if (!investor.approvedApplications) {
                    investor.approvedApplications = [];
                }
                investor.approvedApplications.push({
                    studentId,
                    fundingAmount: fundingResponse.amount || student.fundingRequest.amount,
                    date: new Date().toISOString()
                });
            }

            localStorage.setItem('students', JSON.stringify(students));
            localStorage.setItem('investors', JSON.stringify(investors));
            
            return true;
        } catch (error) {
            console.error('Error updating application:', error);
            throw error;
        }
    }

    static clearAll() {
        console.log('Clearing all data...');
        localStorage.clear();
        sessionStorage.clear();
        console.log('Database cleared successfully');
    }
}

// Make Database available globally
window.Database = Database; 