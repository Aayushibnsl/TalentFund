class Database {
    static students = new Map();
    static investors = new Map();
    static nextId = 1;

    static clearAll() {
        console.log('Clearing all data...');
        this.students = new Map();
        this.investors = new Map();
        this.nextId = 1;
        sessionStorage.clear();
        console.log('Data cleared successfully');
    }

    static generateId() {
        return this.nextId++;
    }

    static saveStudent(data) {
        const id = this.generateId();
        const student = {
            id,
            ...data,
            status: 'pending',
            approvals: [],
            notifications: [],
            requestedAmount: data.requestedAmount || 0
        };
        this.students.set(id, student);
        console.log('Saved student:', student);
        return student;
    }

    static saveInvestor(data) {
        const id = this.generateId();
        const investor = {
            id,
            ...data,
            approvedApplications: [],
            totalFunds: data.totalFunds || 0
        };
        this.investors.set(id, investor);
        console.log('Saved investor:', investor);
        return investor;
    }

    static getStudentById(id) {
        return this.students.get(Number(id)) || null;
    }

    static getInvestorById(id) {
        return this.investors.get(Number(id)) || null;
    }

    static getAllStudents() {
        return Array.from(this.students.values());
    }

    static getAllInvestors() {
        return Array.from(this.investors.values());
    }

    static async updateApplication(studentId, status, investorId) {
        console.log('Updating application:', { studentId, status, investorId });
        
        const student = this.students.get(Number(studentId));
        const investor = this.investors.get(Number(investorId));
        
        if (!student || !investor) {
            console.error('Student or investor not found');
            return false;
        }

        student.status = status;
        const notification = {
            id: Date.now(),
            date: new Date().toISOString(),
            read: false
        };

        if (status === 'approved') {
            investor.approvedApplications.push(studentId);
            notification.message = `Your application has been approved by ${investor.name} from ${investor.organization}!`;
            notification.type = 'approval';
            notification.investorDetails = {
                name: investor.name,
                organization: investor.organization,
                email: investor.email
            };
        } else if (status === 'rejected') {
            notification.message = `Your application has been reviewed by ${investor.name} from ${investor.organization}.`;
            notification.type = 'rejection';
        }

        // Add notification to student's notifications
        if (!student.notifications) {
            student.notifications = [];
        }
        student.notifications.unshift(notification);

        // Add approval to student's approvals if approved
        if (status === 'approved') {
            if (!student.approvals) {
                student.approvals = [];
            }
            student.approvals.push({
                investorId,
                investorName: investor.name,
                organization: investor.organization,
                status: 'approved',
                date: notification.date
            });
        }

        console.log('Updated student:', student);
        return true;
    }

    static async login(email, userType) {
        console.log('Attempting login:', { email, userType });
        const collection = userType === 'student' ? this.students : this.investors;
        const user = Array.from(collection.values()).find(u => u.email === email);
        
        if (!user) {
            console.error('User not found');
            throw new Error('User not found. Please register first.');
        }
        
        console.log('Login successful:', user);
        return user;
    }
} 