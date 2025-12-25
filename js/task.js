let subjects = [];
// Load subjects safely from localStorage
const savedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
subjects = savedSubjects.map(sub => ({
    title: sub.title,
    shortDesc: sub.shortDesc,
    image: sub.image, // Base64 string
    tasks: sub.tasks || []
}));

// Containers
let currentSubject = null;
const taskGrid = document.getElementById("taskGrid");
const taskContainer = document.getElementById("taskContainer");

// Elements
const popupModal = document.getElementById("popupModal");
const part1 = document.getElementById("part1");
const part2 = document.getElementById("part2");
const createTaskBtn = document.getElementById("createTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");
const backBtn = document.getElementById("backBtn");
const doneBtn = document.getElementById("doneBtn");

// Subject form
const subForm = document.getElementById("subForm");
const subTitle = document.getElementById("subTitle");
const subDesc = document.getElementById("subDesc");
const subImage = document.getElementById("subImage");

// Task form
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");

// Show popup for creating new task
createTaskBtn.addEventListener("click", () => {
    popupModal.classList.remove("hidden");
    part1.classList.remove("hidden");
    part2.classList.add("hidden");
});

// Cancel popup
cancelBtn.addEventListener("click", () => {
    popupModal.classList.add("hidden");
    part1.classList.add("hidden");
    part2.classList.add("hidden");
});

// Back to part1
backBtn.addEventListener("click", (e) => {
    e.preventDefault();
    part1.classList.remove("hidden");
    part2.classList.add("hidden");
});

// Done adding tasks
doneBtn.addEventListener("click", () => {
    popupModal.classList.add("hidden");
    part1.classList.add("hidden");
    part2.classList.add("hidden");
    taskContainer.innerHTML = "";
    subTitle.value = "";
    subDesc.value = "";
    subImage.value = "";
    displayCards();
});

// Convert File to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    });
}

// Submit new subject
subForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titleValue = subTitle.value.trim();
    const descValue = subDesc.value.trim();
    const imageFile = subImage.files[0];

    if (!titleValue || !descValue || !imageFile) {
        alert("You must fill in all fields!");
        return;
    }

    const base64Image = await fileToBase64(imageFile);

    currentSubject = {
        title: titleValue,
        shortDesc: descValue,
        image: base64Image,
        tasks: []
    };

    subjects.push(currentSubject);
    localStorage.setItem("subjects", JSON.stringify(subjects));

    part1.classList.add("hidden");
    part2.classList.remove("hidden");
});

// Add task
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = taskTitle.value.trim();
    if (!value) return alert("Must fill the field!");
    if (currentSubject.tasks.includes(value)) return alert("The task is already added!");

    currentSubject.tasks.push(value);
    localStorage.setItem("subjects", JSON.stringify(subjects));
    taskTitle.value = "";
    showTask();
});

// Show tasks in part2
function showTask() {
    taskContainer.innerHTML = "";

    currentSubject.tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "w-full py-[10px] flex flex-row items-center hover:bg-gray-100 cursor-pointer gap-2";
        div.innerHTML = `
            <img src="../assets/Icons/check.svg" alt="Check" class="checkBtn cursor-pointer w-5 h-5"/>
            <h6 class="ml-[10px] flex-1">${task}</h6>
            <img src="../assets/Icons/bin.svg" alt="Bin" class="bin ml-auto cursor-pointer w-5 h-5"/>    
        `;

        const checkImg = div.querySelector(".checkBtn");
        const taskText = div.querySelector("h6");
        const deleteBtn = div.querySelector(".bin");

        div.addEventListener("click", (e) => {
            if (e.target === deleteBtn) return;
            if (checkImg.src.includes("check.svg")) {
                checkImg.src = "../assets/Icons/check-tick.svg"; 
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "#999"; 
            } else {
                checkImg.src = "../assets/Icons/check.svg";
                taskText.style.textDecoration = "none";
                taskText.style.color = "black";
            }
        });

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentSubject.tasks.splice(index, 1);
            localStorage.setItem("subjects", JSON.stringify(subjects));
            showTask();
        });

        taskContainer.appendChild(div);
    });
}

// Display all subject cards
function displayCards() {
    taskGrid.innerHTML = "";

    subjects.forEach((subject, index) => {
        const div = document.createElement("div");
        div.className = "relative hover:translate-y-4 transition-transform duration-500 ease-in-out px-[35px] py-[40px] shadow-[2px_2px_30px_-10px_rgba(0,0,0,0.2)] cursor-pointer rounded-[12px]";

        div.innerHTML = `
        <div>
            <h4 class="font-semibold text-mobileSL">${subject.title}</h4>
            <div class="flex flex-row text-darkgrey gap-10 text-[12px] font-semibold">
              <h6>TOTAL TASK: ${subject.tasks.length}</h6>
            </div>
        </div>
        <img src="${subject.image}" alt="image" class="mt-2 mb-2 w-full h-[220px] md:h-[180px] lg:h-[150px]" />
        <h6 class="text-darkgrey text-[12px]">${subject.shortDesc}</h6>
        <img src="../assets/Icons/bin.svg" class="deleteSubjectBtn absolute top-6 right-6 text-red-500 font-bold text-sm"></img>
        `;

        // Click card to edit tasks
        div.addEventListener("click", (e) => {
            if (e.target.classList.contains("deleteSubjectBtn")) return; // ignore delete button
            currentSubject = subjects[index];
            part1.classList.add("hidden");
            part2.classList.remove("hidden");
            popupModal.classList.remove("hidden");
            showTask();
        });

        // Delete subject button
        const deleteBtn = div.querySelector(".deleteSubjectBtn");
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent opening modal
            if (confirm(`Are you sure you want to delete "${subject.title}"?`)) {
                subjects.splice(index, 1); // remove from array
                localStorage.setItem("subjects", JSON.stringify(subjects));
                displayCards(); // re-render cards
            }
        });

        taskGrid.appendChild(div);
    });
}


// Initial render
if (subjects.length > 0) displayCards();
