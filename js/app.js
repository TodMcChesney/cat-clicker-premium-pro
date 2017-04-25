// Model (all cat data)
var model = {
    cats: [
        {
            name: 'Cutie',
            image: 'img/cat-1.jpg',
            clickCount: 0
        },
        {
            name: 'Sneaky',
            image: 'img/cat-2.jpg',
            clickCount: 0
        },
        {
            name: 'Cuddly',
            image: 'img/cat-3.jpg',
            clickCount: 0
        },
        {
            name: 'Sleepy',
            image: 'img/cat-4.jpg',
            clickCount: 0
        },
        {
            name: 'Grumpy',
            image: 'img/cat-5.jpg',
            clickCount: 0
        }
    ],
    adminViewVisible: false
};

// Octopus (communication hub)
var octopus = {
    init: function() {
        // Initialize the 1st cat as the default currentCat
        model.currentCat = model.cats[0];
        // Initialize both views
        catListView.init();
        selectedCatView.init();
        adminView.init();
    },
    getCats: function() {
        return model.cats;
    },
    setCurrentCat: function(clickedCat) {
        model.currentCat = clickedCat;
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    incrementCounter: function() {
        model.currentCat.clickCount ++;
        selectedCatView.render();
        adminView.render();
    },
    showAdmin: function() {
        model.adminViewVisible = true;
        adminView.render();
    },
    hideAdmin: function() {
        model.adminViewVisible = false;
        adminView.render();
    },
    getAdminViewStatus: function() {
        return model.adminViewVisible;
    }
};

// Views (all visible elements of app)
var catListView = {
    init: function() {
        // Get ul element to add cats to
        this.catListElement = document.getElementById('cat-list');
        // Call catListView render function
        this.render();
    },
    render: function() {
        // Get array of cats to loop through from octopus
        var cats = octopus.getCats();
        var catListItem;
        // Create a DocumentFragment to add each cat li to
        var catListFragment = document.createDocumentFragment();
        // Loop through cats array and add each cat li to the fragment
        model.cats.forEach(function(cat) {
            // Create a li for each cat with it's name as the text
            catListItem = document.createElement('li');
            catListItem.textContent = cat.name;
            // Attach a click event listener to each cat li
            catListItem.addEventListener('click', function() {
                // Send the octopus the cat that was clicked
                octopus.setCurrentCat(cat);
                // Call selectedCatView render function
                selectedCatView.render();
                // Call adminView render function
                adminView.render();
            });
            // Add each cat li to the fragment
            catListFragment.appendChild(catListItem);
        });
        // Now that the fragment is complete append it to the cat-list ul
        this.catListElement.appendChild(catListFragment);
    }
};

var selectedCatView = {
    init: function() {
        // Get DOM elements for the cat view
        this.catNameElement = document.getElementById('cat-name');
        this.catImageElement = document.getElementById('cat-image');
        this.catCounterElement = document.getElementById('cat-counter');
        // Click event listener that increments counter
        this.catImageElement.addEventListener('click', function() {
            octopus.incrementCounter();
        });
        // Call the selectedCatView render function
        this.render();
    },
    render: function() {
        // Get the current cat data from the octopus
        var currentCat = octopus.getCurrentCat();
        // Render the current cat
        this.catNameElement.textContent = currentCat.name;
        this.catImageElement.src = currentCat.image;
        this.catCounterElement.textContent = currentCat.clickCount;
    }
};

var adminView = {
    init: function() {
        // Get DOM elements for the admin view
        var adminButton = document.getElementById('admin-button');
        var cancelButton = document.getElementById('cancel-button');
        this.adminForm = document.getElementById('admin-form');
        this.adminNameElement = document.getElementById('input-name');
        this.adminImageElement = document.getElementById('input-image');
        this.adminCounterElement = document.getElementById('input-counter');
        // Click event listeners for admin buttons
        adminButton.addEventListener('click', function() {
            octopus.showAdmin();
        });
        cancelButton.addEventListener('click', function() {
            octopus.hideAdmin();
        });
        this.render();
    },
    render: function() {
        // Get the status of the admin view
        var adminViewStatus = octopus.getAdminViewStatus();
        // Get the current cat data
        var currentCat = octopus.getCurrentCat();
        // Show admin if status is true
        if (adminViewStatus === false) {
            this.adminForm.style.display = 'none';
        } else {
            this.adminForm.style.display = 'block';
        }
        // Render the data in the admin form
        this.adminNameElement.value = currentCat.name;
        this.adminImageElement.value = currentCat.image;
        this.adminCounterElement.value = currentCat.clickCount;

    }
};

// Initialize the app
octopus.init();
