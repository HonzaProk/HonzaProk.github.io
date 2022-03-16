let images = '<div class="icon"><img class="delete mousePoiner" src="Pics/trashcan.svg" alt="Trashcan"><img class="checked mousePoiner" src="Pics/checked.svg" alt="Checked"></div>'

let currentInput;


// Funkce pro přidání položky na seznam
function putItem(item) {
    $('.toDoList').append("<li><span class='text'>" + item + "</span>" + images + "</li>");
};


// Funkce pro získání hodnoty z políčka pro vložený text
function getItem() {
    let curVal = $("#td").val(); // Získá hodnotu
    $("#td").val("");            // Vyčistí políčko
    return curVal.trim();
}


// Kliknutí na tlačítko "Přidej" vloží položku na seznam:
$("#tdBtn").on("click", function() {
    currentInput = getItem();
    putItem(currentInput);
});

// Stisk klávesy "Enter" rovněž vloží položku na seznam:
$('#td').on('keyup', function(element) {
    let keyCode = element.which;
    if (keyCode === 13) {                // 13 je kód pro Enter
        element.preventDefault();        // zabrání defaultnímnu chování klávesy
        currentInput = getItem();
        putItem(currentInput);
    }
})

// Kliknutí na ikonu zaškrtnutí změní status (hotovo/nehotovo)
$(document).on("click", ".checked", function() {
    $(this).toggleClass("blue");
    $(this).parents("li").toggleClass("done");
});


// Kliknutí na ikonu koše odstraní položku:
$(document).on("click", ".delete", function() {
    $(this).parents("li").remove();
})


// Políčko pro vložený text bude zelené, když do něj kliknu
$(document).on("focus", "#td", function() {
    $(this).css("background-color", "#e6ffe6");
})

// Políčko pro vložený text bude bílé, když z něj vyběhnu
$(document).on("blur", "#td", function() {
    $(this).css("background-color", "white");
});


