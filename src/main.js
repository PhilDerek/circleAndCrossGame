$(function () {
    const $description = $(".description");
    const $descriptionBtn = $(".description__container__btn");
    const $welcome = $(".welcome");
    const $afterGame = $(".afterGame");
    const $afterGameBtn = $(".afterGame__container__btn");

    let winnerKnown = false;
    const circleSource = "dest/images/circleSmall.png";
    const crossSource = "dest/images/x-crossSmall.png";

    function nextSection (showElem, time, hideElem) {
        const changeActive = setTimeout(() => {
            showElem.addClass("active");
            hideElem.removeClass("active");
        }, time);
        return changeActive;
    }

    function npcMove (src, npcSign) {
        if (winnerKnown) {
            return;
        }
        const $uncheckedCells = $(".playing__container__table__row__cell").not(".checked");
        const npcChoice = $uncheckedCells.eq(Math.floor(Math.random() * $uncheckedCells.length));
        npcChoice.children(".playing__container__table__row__cell__img").attr("src", src).addClass("show");
        npcChoice.addClass(`checked ${npcSign}`);
        checkComputerWin(npcSign);
    }

    function checkPlayerWin (playerSign) {
        if (($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(3).hasClass(`${playerSign}`) && $tableCells.eq(6).hasClass(`${playerSign}`)) || ($tableCells.eq(1).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(7).hasClass(`${playerSign}`)) || ($tableCells.eq(2).hasClass(`${playerSign}`) && $tableCells.eq(5).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`)) || ($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`)) || ($tableCells.eq(2).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(6).hasClass(`${playerSign}`)) || ($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(1).hasClass(`${playerSign}`) && $tableCells.eq(2).hasClass(`${playerSign}`)) || ($tableCells.eq(3).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(5).hasClass(`${playerSign}`)) || ($tableCells.eq(6).hasClass(`${playerSign}`) && $tableCells.eq(7).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`))) {
            endGame("You");
        }
    }

    function checkComputerWin (npcSign) {
        if (($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(3).hasClass(`${npcSign}`) && $tableCells.eq(6).hasClass(`${npcSign}`)) || ($tableCells.eq(1).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(7).hasClass(`${npcSign}`)) || ($tableCells.eq(2).hasClass(`${npcSign}`) && $tableCells.eq(5).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`)) || ($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`)) || ($tableCells.eq(2).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(6).hasClass(`${npcSign}`)) || ($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(1).hasClass(`${npcSign}`) && $tableCells.eq(2).hasClass(`${npcSign}`)) || ($tableCells.eq(3).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(5).hasClass(`${npcSign}`)) || ($tableCells.eq(6).hasClass(`${npcSign}`) && $tableCells.eq(7).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`))) {
            endGame("PC");
        }
    }

    function endGame (winner) {
        winnerKnown = true;
        const $checkedPools = $(".checked");
        $checkedPools.each(function () {
            if ($(this).hasClass("circle")) {
                $(this).removeClass("checked circle");
            } else {
                $(this).removeClass("checked x-cross");
            }
            $(this).children(".playing__container__table__row__cell__img").attr("src", "").removeClass("show");
            $(".afterGame__container__headline").text(`${winner} won`);
            $afterGame.fadeIn("slow");
        })
    }

    nextSection($welcome, 5000);
    setTimeout( () => {
        $description.show()
    }, 5000)

    const $welcomeBtn = $("#welcomeBtn");
    const $signChoose = $(".signChoose");
    const $playing = $(".playing");

    $descriptionBtn.on("click", () => {
        const descriptionContent = $(".description__container__content");
        descriptionContent.toggleClass("hide");
    })

    $welcomeBtn.on("click", () => {
        nextSection($signChoose, 1, $welcome);
    });

    let playerSign = "";

    const $signs = $(".signChoose__container__boxSigns__btn");
    
    $signs.on("click", function () {
        if ($(this).hasClass("signChoose__container__boxSigns__btn--circle")) {
            playerSign = "circle";
        } else {
            playerSign = "cross";
        }
        nextSection($playing, 1, $signChoose);
        if (playerSign === "cross") {
            npcMove(circleSource, "circle");
        }
    });

    const $tableCells = $(".playing__container__table__row__cell");

    $tableCells.each(function () {
        $(this).on("click", function () {
            if (winnerKnown) {
                winnerKnown = false;
            }
            if ( $(this).children(".playing__container__table__row__cell__img").attr("src") === "") {
                if (playerSign === "circle") {
                    $(this).children(".playing__container__table__row__cell__img").attr("src", circleSource).addClass("show");
                    $(this).addClass("checked circle");
                    checkPlayerWin("circle");
                    npcMove(crossSource, "x-cross");
                } else {
                    $(this).children(".playing__container__table__row__cell__img").attr("src", crossSource).addClass("show");
                    $(this).addClass("checked x-cross");
                    checkPlayerWin("x-cross");
                    npcMove(circleSource, "circle");
                }
            }
            if ($(".playing__container__table__row__cell").not(".checked").length === 0) {
                endGame("Draw, nobody");
            };
        })
    });
    $afterGameBtn.on("click", () => {
        $afterGame.fadeOut("slow");
    })
});