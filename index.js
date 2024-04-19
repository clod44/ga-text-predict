


let ga;
let populationSize = 100;
let mutationRate = 0.01;
let parentPopulationSize = 5;
let autoEvolve = true;

$(document).ready(function () {
    $('#results').empty();

    ga = new GA("This is a test sentence that is long and curly like your hairs after being wet", populationSize, mutationRate, parentPopulationSize);
    $('#btn-start-ga').click(function () {
        let desiredText = $('#input-desired-text').val();
        if (desiredText === "") {
            return;
        }
        if (ga.targetSentence !== desiredText) {
            ga = new GA(desiredText, 100, 0.01, 5);
        }
        for (let i = 0; i < 100; i++) {
            ga.evolve();
        }
        displayResult(ga.bestMember);

    })

    setInterval(function () {
        if (autoEvolve) {
            $('#btn-start-ga').click();
        }
    }, 1000)

    function displayResult(member) {
        let finished = member.fitness == 1;
        let html = `
            <p class="m-0 p-0">
                <span class="text-info fw-bold">${time()}</span>
                -
                <span class="text-primary">${member.fitness.toFixed(3)}</span>
                -
                <span class="text-${finished ? "success" : "warning"}">${member.genome}</span>
            </p>
        `;
        $("#results").append(html);
        //check if results have more than 20 inner elements. if yes, delete the first one
        if ($("#results p").length > 20) {
            $("#results p").first().remove();
        }
    }

    function time() {
        let date = new Date();
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;
        let time = "[" + hh + ":" + mm + ":" + ss + "]";
        return time;
    }


    $('#form-update-ga').submit(function (event) {
        event.preventDefault();
        populationSize = $('#input-population-size').val();
        mutationRate = $('#input-mutation-rate').val();
        parentPopulationSize = $('#input-parent-population-size').val();
        autoEvolve = $('#checkbox-auto-evolve').is(':checked');
        let desiredText = $('#input-desired-text').val();
        ga = new GA(desiredText, populationSize, mutationRate, parentPopulationSize);
        $('#btn-start-ga').click();
    })


})

