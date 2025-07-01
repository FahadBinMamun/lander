document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    const classCardsContainer = document.querySelector('.class-cards-container');
    const classSelectionSection = document.getElementById('class-selection');

    const categorySelectionSection = document.getElementById('category-selection-section');
    const categorySelectionTitle = document.getElementById('category-selection-title');
    const categoryCardsContainer = document.querySelector('.category-cards-container');
    const backToClassSelectionBtn = document.getElementById('back-to-class-selection-btn');

    const examListSection = document.getElementById('exam-list-section');
    const examButtonsContainer = document.getElementById('exam-buttons-container');
    const examListTitle = document.getElementById('exam-list-title');
    const backToCategoryBtn = document.getElementById('back-to-category-btn');

    let selectedClass = '';

    const sidebarCheckbox = document.getElementById('check');
    const sidebarLinks = document.querySelectorAll('.sidebar_menu .menu a');

    const loadingScreen = document.getElementById('loading-screen');

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
            "others": []
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
            "results": [],
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
                { name: "HTML বেসিক কোর্স", link: "html_course_landing.html", passcode: "off" }
            ]
        },
    };

    function getClassNameInBengali(className) {
        switch (className) {
            case 'class7': return 'সপ্তম শ্রেণী';
            case 'class8': return 'অষ্টম শ্রেণী';
            case 'class9': return 'নবম শ্রেণী';
            case 'class10': return 'দশম শ্রেণী';
            default: return 'নির্বাচিত শ্রেণী';
        }
    }

    function getCategoryNameInBengali(categoryName) {
        switch (categoryName) {
            case 'tests': return 'পরীক্ষাসমূহ';
            case 'results': return 'ফলাফল';
            case 'others': return 'অন্যান্য';
            default: return 'নির্বাচিত ক্যাটাগরি';
        }
    }

    if (classCardsContainer) {
        classCardsContainer.addEventListener('click', function(event) {
            const clickedCard = event.target.closest('.class-card');
            if (clickedCard) {
                selectedClass = clickedCard.dataset.class;
                displayCategorySelection(selectedClass);
            }
        });
    }

    function displayCategorySelection(className) {
        if (classSelectionSection) classSelectionSection.classList.add('hidden');
        if (categorySelectionSection) categorySelectionSection.classList.remove('hidden');
        if (categorySelectionTitle) categorySelectionTitle.textContent = `${getClassNameInBengali(className)} - ক্যাটাগরি নির্বাচন করুন`;
    }

    if (categoryCardsContainer) {
        categoryCardsContainer.addEventListener('click', function(event) {
            const clickedCategoryCard = event.target.closest('.category-card');
            if (clickedCategoryCard) {
                const selectedCategory = clickedCategoryCard.dataset.category;
                displayExamList(selectedClass, selectedCategory);
            }
        });
    }

    function displayExamList(className, categoryName) {
        if (categorySelectionSection) categorySelectionSection.classList.add('hidden');
        if (examListSection) examListSection.classList.remove('hidden');
        if (examListTitle) examListTitle.textContent = `${getClassNameInBengali(className)} - ${getCategoryNameInBengali(categoryName)}`;
        if (examButtonsContainer) examButtonsContainer.innerHTML = '';

        const exams = classData[className]?.[categoryName];

        if (exams && exams.length > 0) {
            exams.forEach(exam => {
                const button = document.createElement('button');
                button.classList.add('exam-button');
                button.textContent = exam.name;
                button.addEventListener('click', function() {
                    if (exam.passcode && exam.passcode !== "off") {
                        const enteredPasscode = prompt(`"${exam.name}" এর জন্য পাসকোড দিন:`); 
                        if (enteredPasscode !== null && enteredPasscode === exam.passcode) {
                            window.open(exam.link, '_blank');
                        } else if (enteredPasscode !== null) {
                            alert('দুঃখিত, পাসকোডটি সঠিক নয়।'); 
                        }
                    } else {
                        window.open(exam.link, '_blank');
                    }
                });
                if (examButtonsContainer) examButtonsContainer.appendChild(button);
            });
        } else {
            if (examButtonsContainer) examButtonsContainer.innerHTML = `<p>এই ক্যাটাগরিতে বর্তমানে কোনো আইটেম উপলব্ধ নেই।</p>`;
        }
    }

    if (backToClassSelectionBtn) {
        backToClassSelectionBtn.addEventListener('click', function() {
            if (categorySelectionSection) categorySelectionSection.classList.add('hidden');
            if (classSelectionSection) classSelectionSection.classList.remove('hidden');
            selectedClass = '';
        });
    }

    if (backToCategoryBtn) {
        backToCategoryBtn.addEventListener('click', function() {
            if (examListSection) examListSection.classList.add('hidden');
            if (categorySelectionSection) categorySelectionSection.classList.remove('hidden');
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (sidebarCheckbox) {
                sidebarCheckbox.checked = false;
            }
        });
    });

    const hideLoadingScreen = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
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
    setTimeout(hideLoadingScreen, 3500);
});
