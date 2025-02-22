  // Mock data for the charts
  document.addEventListener("DOMContentLoaded", function () {
    // Simulate fetching data
    const dashboardData = {
      totalUsers: 250,
      activeUsers: 180,
      pendingApprovals: 20,
      newUsersWeek: 35,
      recentUsers: [
        { username: 'johndoe', email: 'johndoe@example.com', regDate: '2025-02-10' },
        { username: 'janedoe', email: 'janedoe@example.com', regDate: '2025-02-11' },
        { username: 'bobsmith', email: 'bobsmith@example.com', regDate: '2025-02-12' }
      ],
      userGrowthData: [10, 20, 30, 40, 50], // Data for the line chart
      userActivityData: [70, 30], // Active vs Inactive data for the pie chart
      monthlyRegistrationsData: [15, 20, 25, 30, 18, 22, 28, 35, 40, 50, 45, 30] // Registrations per month
    };

    // Set dashboard data
    document.getElementById('totalUsers').innerText = dashboardData.totalUsers;
    document.getElementById('activeUsers').innerText = dashboardData.activeUsers;
    document.getElementById('pendingApprovals').innerText = dashboardData.pendingApprovals;
    document.getElementById('newUsersWeek').innerText = dashboardData.newUsersWeek;

    // Populate recent users table
    const recentUsersTable = document.getElementById('recentUsersTable');
    dashboardData.recentUsers.forEach((user, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.regDate}</td>
            `;
      recentUsersTable.appendChild(row);
    });

    // User Growth Line Chart
    const ctxUserGrowth = document.getElementById('userGrowthChart').getContext('2d');
    const userGrowthChart = new Chart(ctxUserGrowth, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'User Growth',
          data: dashboardData.userGrowthData,
          fill: false,
          borderColor: 'rgba(0, 123, 255, 1)',
          tension: 0.1
        }]
      }
    });

    // User Activity Breakdown Pie Chart
    const ctxActivityBreakdown = document.getElementById('activityBreakdownChart').getContext('2d');
    const activityBreakdownChart = new Chart(ctxActivityBreakdown, {
      type: 'pie',
      data: {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [{
          data: dashboardData.userActivityData,
          backgroundColor: ['#28a745', '#dc3545'],
          hoverOffset: 4
        }]
      }
    });

    // Monthly User Registrations Bar Chart
    const ctxMonthlyRegistrations = document.getElementById('monthlyRegistrationsChart').getContext('2d');
    const monthlyRegistrationsChart = new Chart(ctxMonthlyRegistrations, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Registrations',
          data: dashboardData.monthlyRegistrationsData,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      }
    });
  });




  