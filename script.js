document.addEventListener("DOMContentLoaded", function () {
    // Get current user data
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userType !== 'student') {
        window.location.href = 'login.html';
        return;
    }

    // Get latest student data
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const userData = students.find(s => s.id === currentUser.id) || currentUser;

    // Update profile information
    document.getElementById("userName").textContent = userData.name || "User";
    document.getElementById("userEmail").textContent = userData.email || "user@example.com";
    document.getElementById("userEducation").textContent = userData.education || "Not Specified";

    // Update skills
    const skillsContainer = document.getElementById("skillsContainer");
    if (userData.skills && userData.skills.length > 0) {
        skillsContainer.innerHTML = userData.skills
            .map(skill => `<span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">${skill.trim()}</span>`)
            .join("");
    } else {
        skillsContainer.innerHTML = "<p class='text-gray-500'>No skills added yet</p>";
    }

    // Add notifications if any
    if (userData.notifications && userData.notifications.length > 0) {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'mt-8';
        notificationDiv.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Notifications</h2>
            <div class="space-y-4">
                ${userData.notifications.map(notification => `
                    <div class="bg-blue-50 p-4 rounded-xl">
                        <p class="text-blue-800">${notification.message}</p>
                        <p class="text-sm text-blue-600 mt-1">${new Date(notification.date).toLocaleDateString()}</p>
                    </div>
                `).join('')}
            </div>
        `;
        document.querySelector('.profile-content').appendChild(notificationDiv);
    }

    // Add sample transactions (you can modify this to use real data)
    const transactions = [
        { date: "2024-03-01", amount: 1000, type: "Investment", status: "success" },
        { date: "2024-02-15", amount: 500, type: "Withdrawal", status: "pending" },
        { date: "2024-02-01", amount: 2000, type: "Investment", status: "success" }
    ];

    const transactionContainer = document.querySelector(".divide-y");
    transactions.forEach(transaction => {
        const statusColors = {
            success: "text-green-600",
            pending: "text-yellow-600",
            failed: "text-red-600"
        };

        transactionContainer.innerHTML += `
            <div class="flex items-center justify-between p-4 hover:bg-gray-100">
                <div>
                    <p class="font-medium">${transaction.type}</p>
                    <p class="text-sm text-gray-500">${transaction.date}</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold ${transaction.type === "Withdrawal" ? "text-red-600" : "text-green-600"}">
                        ${transaction.type === "Withdrawal" ? "-" : "+"}$${transaction.amount}
                    </p>
                    <p class="text-sm ${statusColors[transaction.status]}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</p>
                </div>
            </div>
        `;
    });
});
