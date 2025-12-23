//==========================Task Management Section==========================//
// =================DATA================= //
let currentSubject = null;
let subjects = [];
// =================CONTAINERS================= //
const taskGrid = document.getElementById("taskGrid");
const taskPlace = document.getElementById("taskPlace");
const taskContainer = document.getElementById("taskContainer");


// =================ELEMENTS & BUTTONS================= //
const popupModal = document.getElementById("popupModal");
const part1 = document.getElementById("part1");
const part2 = document.getElementById("part2");
const createTaskBtn = document.getElementById("createTaskBtn");
const cancelBtn = document.getElementById("cancelBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const doneBtn = document.getElementById("doneBtn");
const addTaskBtn = document.getElementById("addTaskBtn");
// Pop Up Part1
createTaskBtn.addEventListener("click", () => {
    popupModal.classList.remove("hidden");
    part1.classList.remove("hidden");
    part2.classList.add("hidden");
})

// Close Part1 Pop Up (CancelBtn)
cancelBtn.addEventListener("click", () => {
    popupModal.classList.add("hidden");
    part1.classList.add("hidden");
    part2.classList.add("hidden");
})

// Back to Part1 Button
backBtn.addEventListener("click", (e) => {
    e.preventDefault();

    popupModal.classList.remove("hidden");
    part1.classList.remove("hidden");
    part2.classList.add("hidden");
})

// Done Adding Button
doneBtn.addEventListener("click", (e) => {
    popupModal.classList.add("hidden");
    part1.classList.add("hidden");
    part2.classList.add("hidden");

    //Total Clear all inputs when done clicked
    taskContainer.innerHTML = "";
    subTitle.value = "";
    subDesc.value = "";
    subImage.value = "";
    displayCards();
})

// =================PART1 SUBJECTS================= //
const subForm = document.getElementById("subForm");
const subTitle = document.getElementById("subTitle");
const subDesc = document.getElementById("subDesc");
const subImage = document.getElementById("subImage");

subForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Trim values
    const titleValue = subTitle.value.trim();
    const descValue = subDesc.value.trim();
    const imageFile = subImage.files[0];

    // inputs
    if (titleValue === "" || descValue === "" || !imageFile) {
        alert("You must fill in all fields!");
        return;
    }

    // Create currentSubject object
    currentSubject = {
        title: titleValue,
        shortDesc: descValue,
        image: imageFile,
        tasks: []
    };
    
    
    // if (subjects.currentSubject.title.includes(titleValue)) {
    //     alert("The Subject name is already added!");
    //     return;
    // }

    subjects.push(currentSubject);
    console.log(subjects);
    // Log to console
    console.log("Title:", currentSubject.title);
    console.log("Description:", currentSubject.shortDesc);
    console.log("Image:", currentSubject.image);
        
    popupModal.classList.remove("hidden");
    part1.classList.add("hidden");
    part2.classList.remove("hidden");
    
});


// =================PART2 ADD TASKS================= //
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = taskTitle.value.trim();
    console.log(value)
    if (value === "") {
        alert("Must fill the field!");
        return;
    }

    if (currentSubject.tasks.includes(value)) {
        alert("The task is already added!");
        return;
    }

    currentSubject.tasks.push(value);
    taskTitle.value = "";
    showTask();
});

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
        let doneCount = 0;

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

        // Delete task
        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering div click
            currentSubject.tasks.splice(index, 1); // remove from array
            showTask(); //Show after delete
        });
        taskContainer.appendChild(div);
    });
}


// =================CREATE CARD================= //
function displayCards() {
    taskGrid.innerHTML = "";

    subjects.forEach((subject, index) => {
        const div = document.createElement("div");

        div.classList = "hover:translate-y-4 transition-transform duration-500 ease-in-out px-[35px] py-[40px] shadow-[2px_2px_30px_-10px_rgba(0,0,0,0.2)] cursor-pointer rounded-[12px]";

        const imgURL = URL.createObjectURL(subject.image);
        
        div.innerHTML = `
        <div>
            <h4 class="font-semibold text-mobileSL">${subject.title}</h4>
            <div class="flex flex-row text-darkgrey gap-10 text-[12px] font-semibold">
              <h6>TOTAL TASK: ${subject.tasks.length}</h6>
            </div>
          </div>
          <img id="images" src="${imgURL}" alt="image" class="mt-2 mb-2 w-full h-[220px] md:h-[180px] lg:h-[150px]" />
          <h6 class="text-darkgrey text-[12px]">
            ${subject.shortDesc}
          </h6>
        </div>`;
        taskGrid.appendChild(div);

        div.addEventListener("click", (e) => {
        popupModal.classList.remove("hidden");
        part1.classList.add("hidden");
        part2.classList.remove("hidden");
        showTask();
    })
    });

    
}

