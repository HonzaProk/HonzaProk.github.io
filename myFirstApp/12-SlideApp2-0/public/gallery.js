/* CLASSES */

// class for making Data
class Photo {
    constructor(url, title, description) {
        this.url = url;
        this.title = title;
        this.description = description;
    }
};


// class for storing images and working with them
class Database {

    constructor() {
        this.allContent = [];
        this.thumbs = [];
        this.mainImgIndex = 3;
        this.thumbsMaxNumber = 5;        
    }

    addImage(photo) {        
        
        if (Array.isArray(photo)) {
            photo.forEach(img => this.allContent.push(img))
        } else {this.allContent.push(photo)};
    }
    
    getImageByIndex(index) {
        return this.allContent[index];
    }

    getMainImage() {
        return this.allContent[this.mainImgIndex]
    }

    updateThumbs() {
        let indexLimit = this.allContent.length-1,
            thumbIndex = this.mainImgIndex - 2;                                
        
        this.thumbs = [];        

        for (let i = 0; i < this.thumbsMaxNumber; i++) {              
            

            if (thumbIndex < 0) {
                thumbIndex = indexLimit+1 + thumbIndex;
            } else if (thumbIndex > indexLimit) {
                thumbIndex = 0;
            }

            this.thumbs.push(this.allContent[thumbIndex]);
            thumbIndex++;
        }       
    }

    getThumbs() {       
        return this.thumbs;
    }

    setMainImageToNext() {

        this.mainImgIndex++;
        if (this.mainImgIndex > this.allContent.length-1) {
            this.mainImgIndex = 0;
        }
        this.updateThumbs();
    }

    setMainImageToPrevious() {

        this.mainImgIndex--;
        if (this.mainImgIndex < 0) {
            this.mainImgIndex = this.allContent.length-1;
        }
        this.updateThumbs();
    }

    updateMainImage(newIndex) {

        this.mainImgIndex = newIndex;        
        this.updateThumbs()
    }

    getIndexOfThumbWithURL(url) {

        let checkedThumbIndex = -1;
        
        this.allContent.forEach ( (img, index) => {            
            if (img.url === url) {
                checkedThumbIndex = index;
            }
        })        
        return checkedThumbIndex;
    }
}


// class for the webpage
class Page {

    constructor() {
        this.mainImgElement = document.querySelector('#mainImgElement');
        this.mainImgContainer = document.querySelector('#mainImgContainer');
        this.mainImgTitle = document.querySelector('#photo-title');
        this.mainImgDescription = document.querySelector('#photo-description');
        this.thumbContainer = document.querySelector('#thumbContainer');
        this.currentThumbs = null;        
    }

    renderMainImage() {
        /* (Re)sets and renders main image */

        let image = database.getMainImage();
        this.mainImgElement.setAttribute('src', image.url);
        this.mainImgTitle.textContent = image.title;
        this.mainImgDescription.textContent = image.description;
    }

    renderThumbs() {
         /* (Re)sets and renders all thumbs */

        let thumbs = database.getThumbs();        
        this.thumbContainer.innerHTML = "";           
        
        thumbs.forEach ( thumb => {            
            let img = document.createElement('img');
            img.setAttribute('src', thumb.url);            
            this.thumbContainer.append(img);    
        })

        this.currentThumbs = document.querySelectorAll('#thumbContainer img');

        
        // This will add eventListener to each thumb every time the thumbs gets updated,
        // so each time I click on a thumb it will be selected as the new main image:
        this.currentThumbs.forEach ( (thumb, index) => 
            thumb.onclick = () => {
            let currentURL = thumb.getAttribute('src'),
                newCurrentIndex = database.getIndexOfThumbWithURL(currentURL);        
            database.updateMainImage(newCurrentIndex);
            page.renderMainImage();
            page.renderThumbs();
});
                
        
    }
}


/* *************************************************************************** */

/* INITILIZE CLASS INSTANCES */

let database = new Database(),
    page = new Page();

database.addImage(
    [new Photo(
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg/1280px-Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg',
        "Mountain",
        "Seems like the snow is deserting to a desert"),
    new Photo(
        'https://images.freeimages.com/images/large-previews/993/day-and-night-1228029.jpg',
        'Day and night',
        'Cool photo by Nevit'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/b0a/building-3-1234556.jpg',
        'Skyline',
        'Look at the city architecture from an ant perspective'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/4a3/kansas-city-mo-1228981.jpg',
        'Kansas City',
        'Downtime view as captured by Joe Rooster'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/698/kansas-hayscape-1411404.jpg',
        'Kansas hayscape',
        'I think both the title and the photo speak for themselves'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/54e/inside-passage-alaska-1392817.jpg',
        'Inside Passage',
        'Yep. That is Alaska!'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/48a/tongass-natural-forest-1576571.jpg',
        'Tongass Natural Forest',
        'Let´s go for some hike and enjoy the woods!'
    ),
    new Photo(
        'https://images.freeimages.com/images/large-previews/cec/nature-1384554.jpg',
        'Autumn is coming',
        'Or was is the winter? Let´s leaf it like that...'
    )]
)

/* ****************************************************************************************************** */

/* CONTROLLING FUNCTIONALITY */

page.renderMainImage();
database.updateThumbs();
page.renderThumbs();

const   leftClicker = document.querySelector('.left'),
        rightClicker = document.querySelector('.right');

rightClicker.onclick = () => {
    database.setMainImageToNext();
    page.renderMainImage();
    page.renderThumbs();
}

leftClicker.onclick = () => {
    database.setMainImageToPrevious();
    page.renderMainImage();
    page.renderThumbs();
}



