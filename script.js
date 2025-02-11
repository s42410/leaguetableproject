document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelector(".categories");
    const leaguesSection = document.getElementById("leagues");
    const leagueOptions = document.getElementById("leagueOptions");
    const tableBody = document.getElementById("tableBody");

    document.querySelectorAll(".sport-category").forEach(button => {
        button.addEventListener("click", function () {
            showLeagues(this.dataset.sport);
        });
    });

    document.getElementById("backToCategories").addEventListener("click", function () {
        leaguesSection.classList.add("hidden");
        categories.classList.remove("hidden");
    });

    document.getElementById("loginButton").addEventListener("click", function () {
        adminLogin();
    });

    function showLeagues(sport) {
        leaguesSection.classList.remove("hidden");
        categories.classList.add("hidden");
        leagueOptions.innerHTML = "";

        fetch(`/get-data?sport=${sport}`)
            .then(response => response.json())
            .then(data => {
                Object.keys(data).forEach(league => {
                    let btn = document.createElement("button");
                    btn.textContent = `🏆 ${league}`;
                    btn.addEventListener("click", () => showTable(sport, league, data[league]));
                    leagueOptions.appendChild(btn);
                });
            });
    }

    function showTable(sport, league, teams) {
        document.getElementById("leagueTable").classList.remove("hidden");
        leaguesSection.classList.add("hidden");

        document.getElementById("tableTitle").textContent = `${league}`;
        tableBody.innerHTML = "";

        teams.forEach(team => {
            let row = `<tr>
                <td>${team.name}</td>
                <td>${team.games}</td>
                <td>${team.wins}</td>
                <td>${team.draws}</td>
                <td>${team.losses}</td>
                <td>${team.points}</td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }
});
