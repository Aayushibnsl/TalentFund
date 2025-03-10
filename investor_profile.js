document.addEventListener('DOMContentLoaded', function() {
    // Get current investor data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userType !== 'investor') {
        window.location.href = 'login.html';
        return;
    }

    // Update investor profile information
    document.getElementById('investorName').textContent = currentUser.name;
    document.getElementById('investorEmail').textContent = currentUser.email;
    document.getElementById('investorInterest').textContent = `Interest Area: ${currentUser.interest || 'Not specified'}`;

    // Get all students
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentCards = document.getElementById('studentCards');

    // Function to update student status
    function updateStudentStatus(studentId, status) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const studentIndex = students.findIndex(s => s.id === studentId);
        
        if (studentIndex !== -1) {
            students[studentIndex].status = status;
            students[studentIndex].notifications = students[studentIndex].notifications || [];
            students[studentIndex].notifications.push({
                message: `Your application has been ${status} by investor ${currentUser.name}`,
                date: new Date().toISOString(),
                read: false
            });
            localStorage.setItem('students', JSON.stringify(students));
            
            // Refresh the cards
            renderStudentCards();
        }
    }

    // Function to render student cards
    function renderStudentCards() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        studentCards.innerHTML = '';

        students.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card bg-white rounded-xl shadow-sm overflow-hidden';
            
            const statusColors = {
                pending: 'bg-yellow-100 text-yellow-800',
                approved: 'bg-green-100 text-green-800',
                rejected: 'bg-red-100 text-red-800'
            };

            card.innerHTML = `
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold">${student.name}</h3>
                        <span class="px-3 py-1 rounded-full text-sm ${statusColors[student.status || 'pending']}">
                            ${(student.status || 'pending').toUpperCase()}
                        </span>
                    </div>
                    <p class="text-gray-600 text-sm mb-2">${student.email}</p>
                    <p class="text-gray-600 text-sm mb-4">${student.education}</p>
                    
                    <div class="mb-4">
                        <h4 class="text-sm font-medium mb-2">Skills</h4>
                        <div class="flex flex-wrap gap-2">
                            ${(student.skills || []).map(skill => 
                                `<span class="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>

                    ${!student.status || student.status === 'pending' ? `
                        <div class="flex gap-2 mt-4">
                            <button onclick="updateStudentStatus('${student.id}', 'approved')" 
                                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Approve
                            </button>
                            <button onclick="updateStudentStatus('${student.id}', 'rejected')"
                                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                Reject
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;

            studentCards.appendChild(card);
        });
    }

    // Initial render of student cards
    renderStudentCards();

    // Make updateStudentStatus available globally
    window.updateStudentStatus = updateStudentStatus;
}); 