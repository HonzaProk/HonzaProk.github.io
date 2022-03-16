// Vytváří objekty Data (pro jednotlivé fotky)
function Data (photo, title, description) {
    this.photo = photo;
    this.title = title;
    this.description = description;
};


// Proměnné pro jednotlivé fotky (i s popisky)
let data00 = new Data ('./Gallery/img_01.jpg', 'Alta-too', 'náměstí v Biškeku');
let data01 = new Data ('./Gallery/img_02.jpg', 'Altyn Arašan', 'horské údolí v Ťan-šanu, cca 3 500 m n. m.');
let data02 = new Data ('./Gallery/img_03.jpg', 'nad Altyn Arašanem', 'mlha v horách');
let data03 = new Data ('./Gallery/img_04.jpg', 'jezero Issyk-kul', 'podvečerní procházka');
let data04 = new Data ('./Gallery/img_05.jpg', 'Kadži-Sai', 'městečko v poušti');
let data05 = new Data ('./Gallery/img_06.jpg', 'Kaška Suu', 'hory u Biškeku');


// Pole se seznamem všech fotek
let imagesData = [data00, data01, data02, data03, data04, data05]

// Aktuální fotka
let currentPhoto = 0;

// Počet všech fotek:
let numberOfPhotos = imagesData.length


// Funkce ke zvýraznění aktuálního thumbnailu:
function highlightCurrent() {    
    $('.thumb img').removeClass('highlightMax');
    $('.thumb img').addClass('highlightMin');    
    $(`img[data-index="${currentPhoto}"]`).removeClass('highlightMin');
    $(`img[data-index="${currentPhoto}"]`).addClass('highlightMax');
};

// Funkce pro přidání thubmnailu:
function addThumb(item, index) {
    $('#thumbContainer').append(`<div class="thumb" ><img data-index="${index}"><h2></h2></div>`);
    $('h2:last').text(item.title);
    $('img:last').attr('src', item.photo); // "img:last" = zacil na posledně vytvořený element <img>
    // JQuery si elementy vytváří nejprve interně a až pak je vpisuje do kódu html;
    // proto je nutné použít "img:last" a nikoli id daného elementu (pže ten ještě nebyl vložen do html)
    // Podrobněji viz zde: https://stackoverflow.com/questions/16107267/getting-access-to-a-jquery-element-that-was-just-appended-to-the-dom
};

// Alternativní řešení téže funkce s využitím pomocné proměnné:

// function addThumb(item, index) {
//     let el = item.photo;
//     $('#thumbContainer').append(`<div class="thumb"><img data-index="${index}" src="${el}"></div>`);
// }

// Funkce k načtení fotky:
function loadPhoto(imageIndex) {             
    $('#mainImg').attr('src', imagesData[imageIndex].photo);
    $('#photo-title').text(imagesData[imageIndex].title);
    $('#photo-description').text(imagesData[imageIndex].description);
    highlightCurrent();
};

// Obsluha pravé šipky:
$('.right').on('click', function() {    
    currentPhoto++;    
    // Reset proměnné currentPhoto, aby nepřekročila počet fotek:
    if (currentPhoto > (numberOfPhotos - 1)) {
        currentPhoto = (currentPhoto % numberOfPhotos);
    };    
    loadPhoto(currentPhoto);        
});


// Obsluha levé šipky:
$('.left').on('click', function() {
    currentPhoto--;
    // Reset proměnné currentPhoto, aby nepřekročila počet fotek:
    if (currentPhoto < 0) {
        currentPhoto = (numberOfPhotos - 1);
    };
    loadPhoto(currentPhoto);        
});


// Načte fotky do thubmnailů:
imagesData.forEach( function(item, index) {
    addThumb(item, index);    
});

// Zobrazí fotku na úvod:
loadPhoto(currentPhoto);

// Zvýrazní aktuální thumbnail:
highlightCurrent();

// Při kliknutí na thumbnail načte danou fotku:
$('div.thumb').on('click', function() {    
    let stringIndex = $(this).children('img').attr('data-index'); // Získá index jako řetězec    
    let numberIndex = parseInt(stringIndex);    // Převede index na číslo
    currentPhoto = numberIndex;                 // Uloží index do globální proměnné
    loadPhoto(numberIndex);
});


// Ukáže titulek thumbnailu a lehce celý thumbnail zvýrazní (po najetí myší):
$('div.thumb').on('mouseenter', function() {
    $(this).children('h2').addClass('showSecret');
    $(this).addClass('highlightMiddle');
})

// Schová titulek thumbnailu a celý thumbnail zmatní (po odjetí myší):
$('div.thumb').on('mouseleave', function() {
    $(this).children('h2').removeClass('showSecret');
    $(this).removeClass('highlightMiddle');
})

