document.addEventListener('DOMContentLoaded', function() {
    // ফুটারে বর্তমান বছর সেট করুন
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const classCardsContainer = document.querySelector('.class-cards-container');
    const classSelectionSection = document.getElementById('class-selection');

    // ক্যাটাগরি নির্বাচনের জন্য নতুন উপাদান
    const categorySelectionSection = document.getElementById('category-selection-section');
    const categorySelectionTitle = document.getElementById('category-selection-title');
    const categoryCardsContainer = document.querySelector('.category-cards-container');
    const backToClassSelectionBtn = document.getElementById('back-to-class-selection-btn');

    // পরীক্ষার তালিকার জন্য বিদ্যমান উপাদান
    const examListSection = document.getElementById('exam-list-section');
    const examButtonsContainer = document.getElementById('exam-buttons-container');
    const examListTitle = document.getElementById('exam-list-title');
    const backToCategoryBtn = document.getElementById('back-to-category-btn');

    let selectedClass = ''; // বর্তমানে নির্বাচিত ক্লাস সংরক্ষণ করার জন্য

    // নতুন সাইডবারের উপাদানগুলো নির্বাচন করা হয়েছে
    const sidebarCheckbox = document.getElementById('check'); // নতুন চেক-বক্স
    const sidebarLinks = document.querySelectorAll('.sidebar_menu .menu a'); // সাইডবারের ভেতরের সব লিঙ্ক

    // লোডিং স্ক্রিন উপাদান নির্বাচন
    const loadingScreen = document.getElementById('loading-screen');

    // আপডেটেড ডেটা স্ট্রাকচার: ক্লাস এবং তারপর ক্যাটাগরি (tests, results, others) দ্বারা নেস্টেড
    const classData = {
        "class7": {
            "tests": [
                { name: "ক্লাস টেস্ট ১", link: "https://forms.gle/kHH5JGwhSdurcj8A8", passcode: "offf" },
                { name: "ক্লাস টেস্ট ২", link: "YOUR_GOOGLE_FORM_LINK_CLASS7_2", passcode: "offf" },
                { name: "ক্লাস টেস্ট (যাচাইমূলক-মে, ২০২৫) (ষান্মাসিক পরীক্ষায় সংযোজিত ২০ নম্বর)", link: "https://forms.gle/XKBAz7JzSZXkcxQH7", passcode: "offf" }
            ],
            "results": [
                { name: "Result Sheet - ক্লাস টেস্ট ১ ", link: "https://docs.google.com/spreadsheets/d/1nmnbhfN3_vtuhLEhZTpI0aij6wyGKkP01U95y3GtBHg/edit?usp=drivesdk", passcode: "offf" },
                { name: "Result Sheet - ক্লাস টেস্ট (যাচাইমূলক-মে, ২০২৫) ", link: "https://docs.google.com/spreadsheets/d/1OjK6aQTjQq3D9mjVnBPe_tXqULlGNDnDSXmYpa5g9E4/edit?usp=sharing", passcode: "offf" }
            ],
            "others": [
                // { name: "অন্যান্য রিসোর্স ৭ম শ্রেণী", link: "https://example.com/class7-others", passcode: "off" }
            ]
        },
        "class8": {
            "tests": [
                { name: "ক্লাস টেস্ট ১", link: "https://docs.google.com/forms/d/e/1FAIpQLSc2wJ8L3PGmcVl0qZAs2cJ09onPNWvo2mGnw2TNVkLs2gBIww/viewform?usp=dialog", passcode: "offf" },
                { name: "ক্লাস টেস্ট ২", link: "YOUR_GOOGLE_FORM_LINK_CLASS8_2", passcode: "offf" },
                { name: "ক্লাস টেস্ট (যাচাইমূলক-মে, ২০২৫) (ষান্মাসিক পরীক্ষায় সংযোজিত ২০ নম্বর)", link: "https://forms.gle/LULczMbeopYyiSCN7", passcode: "offf" }
            ],
            "results": [
                { name: "Result Sheet - ক্লাস টেস্ট ১", link: "https://docs.google.com/spreadsheets/d/1cubHV3fnZvtzDb64m-yExsuYek1KvE4IR_dWiZdbsMU/edit?usp=drivesdk", passcode: "offf" },
                { name: "Result Sheet - ক্লাস টেস্ট (যাচাইমূলক-মে, ২০২৫)", link: "https://docs.google.com/spreadsheets/d/1tZTm88EfM4LCmKpVIavCHm_QqrESVmbRTty_VxqnZuY/edit?usp=sharing", passcode: "offf" }
            ],
            "others": [
                { name: "Sudoku (6x6)", link: "https://1sudoku.com/sudoku-variants/sudoku-kids-6x6", passcode: "off" }
            ]
        },
        "class9": {
            "tests": [
                { name: "ক্লাস টেস্ট ১", link: "YOUR_GOOGLE_FORM_LINK_CLASS9_1", passcode: "PASSCODE9_1" },
                { name: "ক্লাস টেস্ট ২", link: "YOUR_GOOGLE_FORM_LINK_CLASS9_2", passcode: "PASSCODE9_2" }
            ],
            "results": [
                // Example: { name: "Result Sheet - নবম শ্রেণী ১", link: "https://example.com/class9-results1", passcode: "offf" }
            ],
            "others": []
        },
        "class10": {
            "tests": [
                { name: "ক্লাস টেস্ট ১", link: "YOUR_GOOGLE_FORM_LINK_CLASS10_1", passcode: "PASSCODE10_1" },
                { name: "ক্লাস টেস্ট ২", link: "YOUR_GOOGLE_FORM_LINK_CLASS10_2", passcode: "PASSCODE10_2" }

            ],
            "results": [],
            "others": [
                { name: "পাইথন প্রোগ্রামিং এর হাতেখড়ি", link: "python_intro.html", passcode: "off" }, 
                { name: "পাইথন এর প্রাথমিক ধাপসমূহ", link: "python_course_landing.html", passcode: "off" },
                // নতুন HTML কোর্স লিঙ্ক যোগ করা হয়েছে
                { name: "HTML বেসিক কোর্স", link: "html_course_landing.html", passcode: "off" }
            ]
        },
        
        // আপনার প্রয়োজন অনুযায়ী আরও ক্লাস এবং ডেটা যোগ করুন
    };

    // বাংলা ক্লাসের নাম পাওয়ার জন্য সহায়ক ফাংশন
    function getClassNameInBengali(className) {
        switch (className) {
            case 'class7': return 'সপ্তম শ্রেণী';
            case 'class8': return 'অষ্টম শ্রেণী';
            case 'class9': return 'নবম শ্রেণী';
            case 'class10': return 'দশম শ্রেণী';
            default: return 'নির্বাচিত শ্রেণী';
        }
    }

    // বাংলা ক্যাটাগরির নাম পাওয়ার জন্য সহায়ক ফাংশন
    function getCategoryNameInBengali(categoryName) {
        switch (categoryName) {
            case 'tests': return 'পরীক্ষাসমূহ';
            case 'results': return 'ফলাফল';
            case 'others': return 'অন্যান্য';
            default: return 'নির্বাচিত ক্যাটাগরি';
        }
    }

    // ধাপ ১: ক্লাস কার্ড ক্লিক হ্যান্ডলার
    classCardsContainer.addEventListener('click', function(event) {
        const clickedCard = event.target.closest('.class-card');
        if (clickedCard) {
            selectedClass = clickedCard.dataset.class; // নির্বাচিত ক্লাস সংরক্ষণ করুন
            displayCategorySelection(selectedClass);
        }
    });

    // ধাপ ২: ক্যাটাগরি নির্বাচন (Tests, Results, Others) প্রদর্শনের জন্য ফাংশন
    function displayCategorySelection(className) {
        classSelectionSection.classList.add('hidden'); // ক্লাস নির্বাচন লুকান
        categorySelectionSection.classList.remove('hidden'); // ক্যাটাগরি নির্বাচন দেখান
        categorySelectionTitle.textContent = `${getClassNameInBengali(className)} - ক্যাটাগরি নির্বাচন করুন`;
    }

    // ধাপ ৩: ক্যাটাগরি কার্ড ক্লিক হ্যান্ডলার
    categoryCardsContainer.addEventListener('click', function(event) {
        const clickedCategoryCard = event.target.closest('.category-card');
        if (clickedCategoryCard) {
            const selectedCategory = clickedCategoryCard.dataset.category;
            displayExamList(selectedClass, selectedCategory); // ক্লাস এবং ক্যাটাগরি উভয়ই পাস করুন
        }
    });

    // ধাপ ৪: ক্লাস এবং ক্যাটাগরির উপর ভিত্তি করে পরীক্ষার তালিকা প্রদর্শনের জন্য ফাংশন
    function displayExamList(className, categoryName) {
        categorySelectionSection.classList.add('hidden'); // ক্যাটাগরি নির্বাচন লুকান
        examListSection.classList.remove('hidden'); // পরীক্ষার তালিকা দেখান
        examListTitle.textContent = `${getClassNameInBengali(className)} - ${getCategoryNameInBengali(categoryName)}`;
        examButtonsContainer.innerHTML = ''; // পূর্ববর্তী বাটনগুলো পরিষ্কার করুন

        const exams = classData[className]?.[categoryName]; // ঐচ্ছিক চেইনিং ব্যবহার করে নেস্টেড ডেটা নিরাপদে অ্যাক্সেস করুন

        if (exams && exams.length > 0) {
            exams.forEach(exam => {
                const button = document.createElement('button');
                button.classList.add('exam-button');
                button.textContent = exam.name;
                button.addEventListener('click', function() {
                    // পাসকোড লজিক
                    if (exam.passcode && exam.passcode !== "off") { // যদি পাসকোড সেট করা থাকে এবং "off" না হয়
                        // পরিবর্তন: alert() এর বদলে একটি কাস্টম মেসেজ বক্স বা Modal ব্যবহার করতে হবে।
                        // আপাতত prompt() ব্যবহার করা হয়েছে, তবে alert() এর পরিবর্তে অন্য UI বিবেচনা করুন।
                        const enteredPasscode = prompt(`"${exam.name}" এর জন্য পাসকোড দিন:`); 
                        if (enteredPasscode !== null && enteredPasscode === exam.passcode) {
                            window.open(exam.link, '_blank'); // নতুন ট্যাবে লিঙ্ক খুলুন
                        } else if (enteredPasscode !== null) {
                            // পরিবর্তন: alert() এর বদলে একটি কাস্টম মেসেজ বক্স বা Modal ব্যবহার করতে হবে।
                            alert('দুঃখিত, পাসকোডটি সঠিক নয়।'); 
                        }
                    } else {
                        // যদি পাসকোড 'off' বা সেট করা না থাকে, তাহলে সরাসরি লিঙ্ক খুলুন
                        window.open(exam.link, '_blank');
                    }
                });
                examButtonsContainer.appendChild(button);
            });
        } else {
            examButtonsContainer.innerHTML = `<p>এই ক্যাটাগরিতে বর্তমানে কোনো আইটেম উপলব্ধ নেই।</p>`;
        }
    }

    // "ক্লাস নির্বাচন" বাটনে ক্লিক হ্যান্ডলার (ক্যাটাগরি নির্বাচন থেকে)
    backToClassSelectionBtn.addEventListener('click', function() {
        categorySelectionSection.classList.add('hidden');
        classSelectionSection.classList.remove('hidden');
        selectedClass = ''; // প্রাথমিক নির্বাচনে ফিরে যাওয়ার সময় নির্বাচিত ক্লাস পরিষ্কার করুন
    });

    // "ক্যাটাগরি" বাটনে ক্লিক হ্যান্ডলার (পরীক্ষার তালিকা থেকে)
    backToCategoryBtn.addEventListener('click', function() {
        examListSection.classList.add('hidden');
        categorySelectionSection.classList.remove('hidden');
    });

    // নতুন সাইডবারের জন্য JavaScript লজিক: লিঙ্কে ক্লিক করলে চেক-বক্সটি আনচেক হবে (সাইডবার বন্ধ হবে)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (sidebarCheckbox) { // চেক-বক্স বিদ্যমান কিনা তা নিশ্চিত করুন
                sidebarCheckbox.checked = false; // সাইডবার বন্ধ করুন
            }
        });
    });

    // **লোডিং স্ক্রিন লুকানোর লজিক: যখন DOM এবং সমস্ত রিসোর্স লোড হয়ে যাবে, তখন লোডিং স্ক্রিনটি লুকানো হবে।**
    const hideLoadingScreen = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // নিশ্চিত করুন pointer-events চালু হয়েছে
            document.body.style.pointerEvents = 'auto';
        }
    };

    // DOMContentLoaded এর পরে লোডিং স্ক্রিন লুকানোর চেষ্টা করুন
    // এটি CSS এবং HTML লোড হওয়ার পরেই কাজ করবে
    document.addEventListener('DOMContentLoaded', hideLoadingScreen);

    // window.load ইভেন্টের জন্য অপেক্ষা করুন (সব ছবি, স্ক্রিপ্ট লোড হওয়ার পর)
    // এটি নিশ্চিত করবে যে সব সম্পদ লোড হয়েছে
    window.addEventListener('load', hideLoadingScreen);

    // ফলব্যাক হিসেবে একটি setTimeout যোগ করুন যাতে যদি কোনো ইভেন্ট কাজ না করে,
    // তবে একটি নির্দিষ্ট সময় পর লোডিং স্ক্রিনটি লুকানো হয়।
    // এটি একটি চূড়ান্ত সুরক্ষামূলক ব্যবস্থা।
    setTimeout(hideLoadingScreen, 3500); // 3.5 সেকেন্ড পর লুকান (আগের চেয়ে সামান্য বেশি)
});
