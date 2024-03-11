$(document).ready(function () {

    const heroForm = $("#heroForm")
    const heroNumber = $("#heroNumber")
    const heroResult = $("#heroResult")
    const chartContainer = $("#chartContainer")

    heroForm.on("submit", function (event) {
        event.preventDefault()

        heroNumber.removeClass("is-valid is-invalid")

        const heroNumberUser = parseInt(heroNumber.val())

        if (!isNaN(heroNumberUser) && heroNumberUser > 0) {
            heroNumber.addClass("is-valid")
            getHero(heroNumberUser)
        } else {
            heroNumber.addClass("is-invalid")
        }
    })

    const getHero = (heroNumberFn) => {
        $.ajax({
            url: `https://www.superheroapi.com/api.php/4905856019427443/${heroNumberFn}/`,
            method: "GET",
            success(hero) {


                heroResult.html(`
                <div class="card">
                    <img src="${hero.image.url}"
                        alt="" class="card-img-top">
                    <div class="card-body">
                        <h5>name: ${hero.name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Primera aparición: ${hero.biography["first-appearance"]}</li>
                        <li class="list-group-item">Ocupación: ${hero.work.occupation}</li>
                        <li class="list-group-item">Altura: ${hero.appearance.height}</li>
                        <li class="list-group-item">Peso: ${hero.appearance.weight}</li>
                    </ul>
                </div>
                `)


                const options = {
                    animationEnabled: true,
                    title: {
                        text: "Estadisticas del superheroe"
                    },
                    data: [
                        {
                            type: "pie",
                            dataPoints: [
                                { y: hero.powerstats.combat, label: "combat" },
                                { y: hero.powerstats.durability, label: "durability" },
                                { y: hero.powerstats.intelligence, label: "intelligence" },
                                { y: hero.powerstats.power, label: "power" },
                                { y: hero.powerstats.speed, label: "speed" },
                                { y: hero.powerstats.strength, label: "strength" },
                            ]
                        }
                    ]
                }

                chartContainer.CanvasJSChart(options)
            },
            error(e) {
                console.error('error')
                console.error(e)
            }
        })
    }
})
