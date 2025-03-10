document.getElementById("eduFundForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Create new user profile
    const userData = {
        id: 'student_' + Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        dob: document.getElementById("dob").value,
        skills: document.getElementById("skills").value.split(",").map(s => s.trim()),
        portfolio: document.getElementById("portfolio").value,
        education: document.getElementById("education").value,
        status: 'pending',
        notifications: [],
        createdAt: new Date().toISOString()
    };
    
    // Store in students array
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(userData);
    localStorage.setItem('students', JSON.stringify(students));

    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify({
        ...userData,
        userType: 'student'
    }));

    // Show success message and redirect
    document.getElementById("message").textContent = "Creating your profile...";
    document.getElementById("message").classList.remove("hidden");
    
    // Quick redirect to profile
    setTimeout(() => {
        window.location.href = "userprofile.html";
    }, 1000);
}); 