document.getElementById("investorForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Create new investor profile
    const investorData = {
        id: 'investor_' + Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        interest: document.getElementById("interest").value,
        fundingAmount: document.getElementById("fundingAmount").value,
        createdAt: new Date().toISOString()
    };
    
    // Store in investors array
    const investors = JSON.parse(localStorage.getItem('investors')) || [];
    investors.push(investorData);
    localStorage.setItem('investors', JSON.stringify(investors));

    // Store current user session
    localStorage.setItem('currentUser', JSON.stringify({
        ...investorData,
        userType: 'investor'
    }));

    // Show success message and redirect
    document.getElementById("message").textContent = "Creating your profile...";
    document.getElementById("message").classList.remove("hidden");
    
    // Quick redirect to profile
    setTimeout(() => {
        window.location.href = "investor_profile.html";
    }, 1000);
}); 