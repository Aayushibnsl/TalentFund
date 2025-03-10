const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Main routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/userform', (req, res) => {
    res.sendFile(path.join(__dirname, 'userform.html'));
});

app.get('/student-corner', (req, res) => {
    res.sendFile(path.join(__dirname, 'userform.html'));
});

app.get('/investor-corner', (req, res) => {
    res.sendFile(path.join(__dirname, 'investor_form.html'));
});

app.get('/student-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'userprofile.html'));
});

app.get('/investor-profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'investor_profile.html'));
});

// API Routes
app.post('/api/save-student', async (req, res) => {
    try {
        const studentData = req.body;
        const dbPath = path.join(__dirname, 'db', 'students.json');
        
        // Read current data
        const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        
        // Check if email already exists
        if (data.students.some(s => s.email === studentData.email)) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }
        
        data.students.push(studentData);
        
        // Write updated data
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/save-investor', async (req, res) => {
    try {
        const investorData = req.body;
        const dbPath = path.join(__dirname, 'db', 'investors.json');
        
        // Read current data
        const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        
        // Check if email already exists
        if (data.investors.some(i => i.email === investorData.email)) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }
        
        data.investors.push(investorData);
        
        // Write updated data
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving investor:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/update-application', async (req, res) => {
    try {
        const { studentId, status, investorId } = req.body;
        const studentsDbPath = path.join(__dirname, 'db', 'students.json');
        const investorsDbPath = path.join(__dirname, 'db', 'investors.json');
        
        // Read both database files
        const studentsData = JSON.parse(await fs.readFile(studentsDbPath, 'utf8'));
        const investorsData = JSON.parse(await fs.readFile(investorsDbPath, 'utf8'));
        
        // Find student and investor
        const studentIndex = studentsData.students.findIndex(s => s.id === studentId);
        const investorIndex = investorsData.investors.findIndex(i => i.id === investorId);
        
        if (studentIndex !== -1 && investorIndex !== -1) {
            const investor = investorsData.investors[investorIndex];
            
            // Update student status and add notification
            studentsData.students[studentIndex].status = status;
            studentsData.students[studentIndex].notifications = studentsData.students[studentIndex].notifications || [];
            studentsData.students[studentIndex].notifications.push({
                message: `Your application has been ${status} by investor ${investor.name}`,
                date: new Date().toISOString(),
                read: false
            });
            
            // Update investor's applications lists
            if (status === 'approved') {
                investor.approvedApplications = investor.approvedApplications || [];
                investor.approvedApplications.push(studentId);
            }
            investor.pendingApplications = investor.pendingApplications || [];
            investor.pendingApplications = investor.pendingApplications.filter(id => id !== studentId);
            
            // Write updates to both files
            await fs.writeFile(studentsDbPath, JSON.stringify(studentsData, null, 2));
            await fs.writeFile(investorsDbPath, JSON.stringify(investorsData, null, 2));
            
            res.json({ 
                success: true,
                message: `Application ${status} successfully`
            });
        } else {
            res.status(404).json({ error: 'Student or investor not found' });
        }
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

app.get('/api/get-students', async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile(path.join(__dirname, 'db', 'students.json'), 'utf8'));
        res.json(data.students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to fetch students' });
    }
});

app.get('/api/get-student', async (req, res) => {
    try {
        const { id } = req.query;
        const data = JSON.parse(await fs.readFile(path.join(__dirname, 'db', 'students.json'), 'utf8'));
        const student = data.students.find(s => s.id === id);
        
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to fetch student' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, userType } = req.body;
        
        // Read appropriate database file
        const dbPath = path.join(__dirname, 'db', userType === 'student' ? 'students.json' : 'investors.json');
        const data = JSON.parse(await fs.readFile(dbPath, 'utf8'));
        
        // Find user
        const users = userType === 'student' ? data.students : data.investors;
        const user = users.find(u => u.email === email);

        if (user) {
            res.json({
                ...user,
                userType: userType
            });
        } else {
            res.status(404).json({ error: 'User not found. Please register first.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed. Please try again.' });
    }
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});