document.addEventListener("DOMContentLoaded", function () {
  // Select all navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").substring(1); // Remove #
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        event.preventDefault(); // Prevent default anchor behavior

        window.scrollTo({
          top: targetSection.offsetTop - 50, // Adjust offset if needed
          behavior: "smooth", // Enable smooth scrolling
        });
      }
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const aboutSection = document.querySelector(".about-content");

//   function revealAboutSection() {
//     const sectionPosition = aboutSection.getBoundingClientRect().top;
//     const screenHeight = window.innerHeight;

//     if (sectionPosition < screenHeight - 100) {
//       aboutSection.classList.add("show");
//     }
//   }

//   // Run on scroll
//   window.addEventListener("scroll", revealAboutSection);

// Run once on load in case already in view
//   revealAboutSection();
// });

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    burger.classList.toggle("active"); // Animate the burger icon
  });

  // Close menu when a link is clicked (optional)
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      burger.classList.remove("active");
    });
  });
});

function toggleMenu() {
  let nav = document.querySelector(".nav-links");
  let burger = document.querySelector(".burger");
  nav.classList.toggle("active");
  burger.classList.toggle("active");
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animation on Scroll
document.addEventListener("DOMContentLoaded", function () {
  let animatedSections = document.querySelectorAll(".slide-in");
  function handleScroll() {
    animatedSections.forEach((section) => {
      let sectionPosition = section.getBoundingClientRect().top;
      let screenPosition = window.innerHeight / 1.2;
      if (sectionPosition < screenPosition) {
        section.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", handleScroll);
});



function openLogin() {
  document.getElementById("adminModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("adminModal").style.display = "none";
}

function login() {
  // Accept any username and password
  window.location.href = "admin.html";
  return false;
}

  function addDonation() {
    const name = document.getElementById("donorName").value.trim();
    const amount = document.getElementById("donationAmount").value.trim();

    if (name === "" || amount === "") {
      alert("Please enter both name and amount.");
      return;
    }

    const donationList = document.getElementById("donationList");
    const newItem = document.createElement("li");
    newItem.innerHTML = `${name} - ₦${amount} <button onclick="deleteDonation(this)">Delete</button>`;
    donationList.appendChild(newItem);

    document.getElementById("donorName").value = "";
    document.getElementById("donationAmount").value = "";
  }

  function deleteDonation(button) {
    const li = button.parentElement;
    li.remove();
  }

      // Add campaign
    function addCampaign() {
      const title = prompt("Enter campaign title:");
      const amount = prompt("Enter target amount:");
      if (title && amount) {
        const table = document.getElementById("campaignTable").getElementsByTagName("tbody")[0];
        const newRow = table.insertRow();
        newRow.innerHTML = `
          <td>${title}</td>
          <td>₦${amount}</td>
          <td>Active</td>
          <td>
            <button class="btn edit-btn" onclick="editRow(this)">Edit</button>
            <button class="btn delete-btn" onclick="deleteRow(this)">Delete</button>
          </td>`;
      }
    }

    // Edit campaign
    function editRow(btn) {
      const row = btn.parentElement.parentElement;
      const newTitle = prompt("Edit title:", row.cells[0].textContent);
      const newAmount = prompt("Edit amount:", row.cells[1].textContent.replace("₦", ""));
      if (newTitle && newAmount) {
        row.cells[0].textContent = newTitle;
        row.cells[1].textContent = "₦" + newAmount;
      }
    }

    // Delete campaign
    function deleteRow(btn) {
      if (confirm("Are you sure you want to delete this campaign?")) {
        const row = btn.parentElement.parentElement;
        row.remove();
      }
    }

    // Calculate total donation
    function calculateTotalDonated() {
      const rows = document.querySelectorAll("#donationTable tbody tr");
      let total = 0;
      rows.forEach(row => {
        const amountText = row.cells[1].textContent.replace(/[₦,]/g, '').trim();
        const amount = parseFloat(amountText);
        if (!isNaN(amount)) total += amount;
      });
      document.getElementById("totalDonated").textContent = "₦" + total.toLocaleString();
    }

    // Call on load
    calculateTotalDonated();
 

