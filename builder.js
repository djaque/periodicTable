function buildElement(element) {
    output = "";

    data = "data-name='" + element.name + "' data-summary='" + element.summary + "'";

    output += "<div class='element " + element.color + "' " + data + " >" + element.number;
    //+ " (" + element.xpos + ":" + element.ypos + ")";
    output += "<p>" + element.symbol + "</p>";
    output += element.atomic_mass;
    output += "</div>";
    return output;
}
$.getJSON("https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json",
    function (json) {
        console.log(json.elements);
        var lastX = 0;
        var lanthanoids = [];
        var actinoids = [];

        for (var i = 0; i < json.elements.length; i++) {
            elem = json.elements[i];
            x = elem.xpos;
            y = elem.ypos;

            if (y > 7) {
                if (y == 9) {
                    lanthanoids.push(elem);
                } else if (y == 10) {
                    actinoids.push(elem);
                }
                continue;
            }

            if (x <= 2) {
                elem.color = 'bg-blue';
            } else if (x > 2 && x <= 12) {
                elem.color = 'bg-pink';
            } else {
                elem.color = 'bg-orange';
            }
            output = "";
            if (lastX > 0) {
                cant = x - lastX - 1;
                for (var j = 0; j < cant; j++) {
                    output += "<div class='empty'></div>";
                }
            }

            lastX = x;
            output += buildElement(elem);

            $("main section").append(output);
        }

        for (let element of lanthanoids) {
            element.color = 'bg-green';
            $("#lanthanoids").append(buildElement(element));
        }
        for (let element of actinoids) {
            element.color = 'bg-green';
            $("#actinoids").append(buildElement(element));
        }

    });
$(document).on("click", "div.element", function () {
    var name = this.getAttribute("data-name");
    var summary = this.getAttribute("data-summary");
    output = "<h1>" + name + "</h1>";
    output += "<p>" + summary + "</p>";
    $("#info .content").html(output);
    $("#info").show();
});
$("#close").click(function () {
    $("#info").hide();
})