// Inicializace počítadla:
let counts = 0;

// Funkce, která vytiskne počet kliků:
let printCount = () => {   // Popř.: function printCount() {
    $("#counting").text(counts);
};

// Obsluha tlačítka "increase":
$("#increase").on("click", function() {
    counts++;
    printCount();
});

// Obsluha tlačítka "decrease":
$("#decrease").on("click", () => {
    counts--;
    printCount();
});