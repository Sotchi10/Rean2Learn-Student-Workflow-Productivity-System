// Get stored subjects
let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
const dSubjects = document.getElementById("subjectsDis");


function dashSub() {
    dSubjects.innerHTML = "";
    subjects.forEach((subject) => {
        const div = document.createElement("div");
        div.className = "w-full flex flex-row justify-start items-center shadow-[2px_2px_30px_-10px_rgba(0,0,0,0.2)] p-8 rounded-[20px]";
        const imgURL = subject.image;
        div.innerHTML = `
            <img src="${imgURL}" alt="" class="w-25 h-25">
            <div class="flex flex-col ml-6">
                <h4 class="font-medium">${subject.title}</h4>
                <p class="text-[15px] text-darkgrey">${subject.shortDesc}</p>
                <a href="taskmanager.html" class="text-blue-600">Manage task here</a>
            </div>
        `;
        dSubjects.appendChild(div);
    });
}

function updateDashboardStats() {
    const totalSubjects = document.getElementById("totalSubjects");
    const totalTasks = document.getElementById("totalTasks");

    totalSubjects.textContent = subjects.length;
    const allTasks = subjects.reduce((acc, sub) => acc + sub.tasks.length, 0);
    totalTasks.textContent = allTasks;
}

dashSub();
updateDashboardStats();
